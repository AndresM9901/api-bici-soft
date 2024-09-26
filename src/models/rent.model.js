const mongoose = require('mongoose');
const conexion = require('../config/connection');
const locationSchema = require('./location.model');

const rentSchema = new conexion.Schema({
    dateDone: {
        type: Date,
        default: Date()
    },
    price: {
        type: Number,
        required: [true, "La tarifa no debe estar vacia"]
    },
    routeStart: {
        type: locationSchema,
        required: [true, "La ruta de inicio no debe estar vacia"]
    },
    routeEnd: {
        type: locationSchema,
        required: [true, "La ruta de destino no debe estar vacia"]
    },
    total: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user",
        required: [true, "Debe estar un usuario registrado"]
    },
    bike: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "bike",
        required: [true, "Debe estar registrada la bicicleta"]
    }
},
{
    versionKey: false
});

const rent = conexion.model('rents', rentSchema);

module.exports = rent;