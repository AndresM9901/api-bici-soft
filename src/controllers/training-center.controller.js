const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const validationEmial = require('../middleware/email.validation');
const verifyToken = require('../middleware/token.validation');
const isAdmin = require('../middleware/role.validation');
require('dotenv').config();

const trainingCenterService = require('../services/training-center.service');

route.get('/', verifyToken, async (req, res) => {
    try {
        const { data, status, message } = await trainingCenterService.getTrainingCenters();
    
        res.status(status).json({
            data,
            message
        });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.get('/:id', verifyToken, async (req, res) => {
    try {
        let { data, message, status } = await trainingCenterService.getTrainingCenterById(req.params.id);
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
})

route.post('/', [verifyToken, isAdmin], async (req, res) => {
    try {
        const newCenter = req.body;
        const { center, message, status } = await trainingCenterService.createCenter(newCenter);

        res.status(status).json({
            center,
            message
        });
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
});

route.post('/addBike', [verifyToken, isAdmin], async (req, res) => {
    try {
        console.log(req.body);
        const { idCenter, idBike } = req.body;
        console.log(`${idCenter}, ${idBike}`);
        let { message, status } = await trainingCenterService.addBike(idCenter, idBike);

        res.status(status).json({
            message
        })
    } catch (error) {
        res.status(500).json({ message: `Internal server error ${error}` });
    }
})

module.exports = route