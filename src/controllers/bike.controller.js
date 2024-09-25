const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/token.validation');
require('dotenv').config();

const bikeService = require('../services/bike.service');

route.get('/', verifyToken, async (req, res) => {
    try {
        const { bikes, status } = await bikeService.getBikes();
    
        res.status(status).json({
            bikes
        });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.get('/:id', verifyToken, async (req, res) => {
    try {
        const { bike, status } = await bikeService.getBikeById(req.params.id);
        if(bike === undefined) {
            res.status(status).json({ message: "Bicicleta no encontrada"});
        } else {
            res.status(status).json({
                bike
            });
        }
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.post('/', verifyToken, async (req, res) => {
    try {
        const newBike = req.body;
        const { bike, message, status } = await bikeService.createBike(newBike);
    
        res.status(status).json({
            bike,
            message
        });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.put('/:id', verifyToken, async (req, res) => {
    try {
        let updateBike = req.body;
        let { message, status } = await bikeService.updateBike(req.params.id, updateBike);
    
        res.status(status).json({
            message
        });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.delete('/:id', verifyToken, async (req, res) => {
    try {
        let { message, status } = await bikeService.deleteBike(req.params.id);
    
        res.status(status).json({
            message
        });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
});

module.exports = route