const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/token.validation');
const isAdmin = require('../middleware/role.validation');
require('dotenv').config();

const eventService = require('../services/event.service');

route.get('/', async (req, res) => {
    try {
        let { events, message, status } = await eventService.getEvents();
        res.status(status).json({
            events,
            message
        })
    } catch (error) {
        res.status(500).json({
            message: `Internal server error ${error}`
        })
    }
});

route.get('/:id', async (req, res) => {
    try {
        let { event, message, status } = await eventService.getEventById(req.params.id);
        res.status(status).json({
            event,
            message
        });
    } catch (error) {
        res.status(500).json({
            message: `Internal server error ${error}`
        });
    }
});

route.post('/', [isAdmin], async (req, res) => {
    try {
        let newEvent = req.body;
        let { event, message, status } = await eventService.createEvent(newEvent);
        res.status(status).json({
            event,
            message
        });
    } catch (error) {
        res.status(500).json({
            message: `Internal server error ${error}`
        });
    }
});

route.put('/:id', isAdmin, async (req, res) => {
    try {
        let updateEvent = req.body;
        let { updatedEvent, message, status } = await eventService.updateEvent(req.params.id, updateEvent);
        res.status(status).json({
            updatedEvent,
            message
        });
    } catch (error) {
        res.status(500).json({
            message: `Internal server error ${error}`
        });
    }
});

route.delete('/:id', isAdmin, async (req, res) => {
    try {
        let { message, status } = await eventService.deleteEvent(req.params.id);
        res.status(status).json({
            message
        });
    } catch (error) {
        res.status(500).json({
            message: `Internal server error ${error}`
        });
    }
});

module.exports = route;