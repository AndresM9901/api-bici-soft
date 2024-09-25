const conexion = require('../config/connection');
const bcrypt = require('bcryptjs');

const userSchema = new conexion.Schema({
    identityDocument: {
        type: String,
        required: [true, "El usuario debe tener numero de documento"],
        unique: [true, "El documento debe ser unico"],
    },
    password: {
        type: String,
        required: [true, "El usuario debe tener una contraseña"],
        minLength: [5, "Debe contener minimo 5 caracteres"],
    },
    name: {
        type: String,
        required: [true, "El usuario debe registrar su nombre"]
    },
    email: {
        type: String,
        required: [true, "El usuario debe registrar su correo"],
        unique: [true, "El correo debe ser unico"]
    },
    stratum: {
        type: String,
        enum: ["1", "2", "3", "4", "5", "6"],
        required: [true, "El usuario debe registrar su estrato social"]
    },
    role: {
        type: String,
        enum: ["Usuario", "Administrador"],
        default: "Usuario"
    }
},
{
    versionKey: false
});

const user = conexion.model('users', userSchema);

module.exports = user