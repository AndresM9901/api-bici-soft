const mongoose = require('mongoose');
const conexion = require('../config/connection');
const locationSchema = require('./location.model');

const availableBikeSchema = new conexion.Schema({
    idBike: mongoose.SchemaTypes.ObjectId
})

const trainingCenterSchema = new conexion.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    location: {
        type: locationSchema,
        required: true
    },
    availableBike: [availableBikeSchema]
},
{
    versionKey: false
});

const trainingCenter = conexion.model('trainingCenters', trainingCenterSchema);

module.exports = trainingCenter;