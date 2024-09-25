const userService = require('../services/user.service');

async function isAdmin (req, res, next) {
    try {
        const id = req.headers.identitydocument;
        const { user } = await userService.getUser(id);
        if(user === undefined || user === null) throw new Error();
        if (user.role === "Administrador") {
            next();
            return;
        }
    
        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` })
    }
}

module.exports = isAdmin