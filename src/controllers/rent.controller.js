const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const validationEmial = require('../middleware/email.validation');
const verifyToken = require('../middleware/token.validation');
const isAdmin = require('../middleware/role.validation');
require('dotenv').config();

const rentService = require('../services/rent.service');

route.post('/', verifyToken, async (req, res) => {
    try {
        let data = req.body;
        if(data) {
            const { rentBike, bike, user, message, status } = await rentService.rentBike(data);
            res.status(status).json({
                rentBike,
                bike,
                user,
                message
            });
        }
    } catch (error) {
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.post('/rentEnd', verifyToken, async (req, res) => {
    try {
        let id = req.body.idRent;
        if(data) {
            const { bike, rent, message, status } = await rentService.rentEnd(id);

            res.status(status).json({
                bike,
                rent,
                message
            });
        }
    } catch (error) {
        return res.status(500).json({ message: `Internal server error ${error}` });
    }
})

module.exports = route;