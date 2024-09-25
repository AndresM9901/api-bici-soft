const conexion = require('../config/connection');
const mongoose = require('mongoose');
const locationSchema = require('../models/location.model');

const participantSchema = new conexion.Schema({
    idUser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    }
});

const eventSchema = new conexion.Schema({
    name: {
        type: String,
        required: [true, "El evento debe llevar un nombre"]
    },
    dateStart: {
        type: Date,
        required: [true, "Debe registrar la fecha de inicio del evento"]
    },
    dateEnd: {
        type: Date,
        required: [true, "Debe registrar la fecha en que termina el evento"]
    },
    description: {
        type: String,
        required: [true, "Debe ingresar alguna descripcion sobre el evento"]
    },
    routeStart: {
        type: locationSchema,
        required: true
    },
    routeEnd: {
        type: locationSchema,
        required: true
    },
    participant: [participantSchema]
},
{
    versionKey: false
});

const event = conexion.model('events', eventSchema);

module.exports = event;