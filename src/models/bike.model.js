const conexion = require('../config/connection');
const locationSchema = require('./location.model');

const bikeSchema = new conexion.Schema({
    brand: {
        type: String,
        required: [true, "La marca no debe estar vacia"]
    },
    color: {
        type: String,
        required: [true, "El color no debe estar vacio"]
    },
    location: {
        type: locationSchema,
        required: true
    },
    state: {
        type: String,
        enum: ["disponible", "no disponible"],
        default: "disponible"
    },
    rentalPrice: {
        type: Number,
        required: [true, "Debe llevar el precio del alquiler"],
        min: [0, "El precio no puede ser menor a 0"]
    }
},
{
    versionKey: false
});

const bike = conexion.model('bikes', bikeSchema);

module.exports = bike;