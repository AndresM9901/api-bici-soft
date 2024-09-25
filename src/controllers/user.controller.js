const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const validationEmial = require('../middleware/email.validation');
const verifyToken = require('../middleware/token.validation');
const isAdmin = require('../middleware/role.validation');
require('dotenv').config();

const userService = require('../services/user.service');

route.use("/signup", (req, res, next) => {
    const isValidEmail = validationEmial(req.body.email);
    if(isValidEmail) {
        next();
    } else {
        return res.status(404).json({
            message: "El correo no es valido"
        });
    }
})

route.post('/signup',
    async (req, res, next) => {
    try {
        const userDTO = req.body;

        const { user, message, status } = await userService.signup(userDTO);

        res.status(status).json({
            user,
            message
        });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.post('/login', async (req, res) => {
    try {
        const identityDocument = req.body.identityDocument;
        const password = req.body.password;
        
        if (!identityDocument || !password) {
            res.status(400).json({ message: "El documento y la contraseña son requeridos" });
        }
        const userDTO = {
            identityDocument,
            password
        };
        const { user } = await userService.login(userDTO);
        // console.log(typeof user.identityDocument);
        if (user.identityDocument === identityDocument) {
            const token = jwt.sign({ identityDocument }, process.env.SECRETKEY, { expiresIn: "1h" });
            res.status(200).json({
                token,
                user
            });
        } else {
            res.status(401).json({ message: "Authentication failed" });
        }
    } catch (error) {
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.get('/', [verifyToken, isAdmin], async (req, res) => {
    const { users, message, status } = await userService.getUsers();
    res.status(status).json({
        users,
        message
    });
});

route.delete('/:document', [verifyToken, isAdmin], async (req, res) => {
    try {
        let { user } = await userService.getUser(req.params.document);
        if(user) {
            console.log(user.identityDocument);
            let { response, status, message } = await userService.deleteUser(user.identityDocument);
            console.log(`${status}, ${message}`);
            res.cookie("token", "none", {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true
            });
            res.status(status).json({
                message: message
            });
        } else {
            res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` })
    }
});

module.exports = route;