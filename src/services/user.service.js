const userModel = require('../models/user.model');

class UserService {
    static async signup(user) {
        const userRecord = await userModel.create(user);

        if(userRecord) {
            return {
                userRecord,
                message: "El usuario se ha creado correctamente",
                status: 201
            };
        } else {
            return {
                message: "El usuario no se pudo crear revise sus datos",
                status: 404
            }
        }
    }

    static async login(user) {
        let userResponse = await userModel.findOne({ identityDocument: user.identityDocument });
        if(userResponse && user.password === userResponse.password) {
            return {
                user: userResponse
            }
        } else {
            return {
                message: "Los datos no coinciden vuelve a intentar",
                status: 404
            }
        }
    }

    static async getUser(identityDocument) {
        let userResponse = await userModel.findOne({ identityDocument: identityDocument });
        if(userResponse) {
            return {
                user: userResponse,
                status: 200
            }
        } else {
            return {
                status: 404
            }
        }
    }

    static async getUsers() {
        const usersResponse = await userModel.find({});
        if(usersResponse.length > 0) {
            return {
                users: usersResponse,
                status: 200
            }
        } else {
            return {
                message: "No hay usuarios registrados",
                status: 200
            }
        }
    }

    static async deleteUser(identityDocument) {
        try {
            const response = await userModel.findOneAndDelete({ identityDocument: identityDocument });

            return {
                response,
                status: 200,
                message: "Usuario eliminado correctamente"
            }
        } catch (error) {
            return {
                status: 500,
                message: `Internal server error ${error}`
            }
        }
    }
}

module.exports = UserService;