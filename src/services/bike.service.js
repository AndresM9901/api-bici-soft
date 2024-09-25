const bikeModel = require('../models/bike.model');
const createLocation = require('../utils/createLocation');

class bikeService {
    static async getBikes() {
        try {
            let bikes = await bikeModel.find({});
            if(bikes.length > 0) {
                return {
                    bikes: bikes,
                    status: 200
                }
            } else {
                return {
                    message: "No hay bicicletas registradas",
                    status: 200
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async getBikeById(idByke) {
        try {
            let bike = await bikeModel.findOne({_id: idByke});
            if(bike) {
                return {
                    bike,
                    status: 200
                }
            } else {
                return {
                    status: 404
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async createBike(newBike) {
        try {
            const createBike = createLocation(newBike);
            let bike = await bikeModel.create(createBike);
            if(bike) {
                return {
                    bike,
                    message: "Bicicleta registrada correctamente",
                    status: 200
                }
            } else {
                return {
                    message: "La bicicleta no se pudo registrar correctamente revisa los datos",
                    status: 404
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
        
    }

    static async updateBike(idBike, updateBike) {
        try {
            const updateBikeData = createLocation(updateBike);
            let { bike } = await bikeService.getBikeById(idBike);
            if (bike) {
                await bikeModel.findOneAndUpdate({_id: bike._id }, updateBikeData);
                return {
                    message: "Bicicleta actualizada correctamente",
                    status: 200
                }
            } else {
                return {
                    message: "Bicicleta no encontrada",
                    status: 404
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async deleteBike(idBike) {
        try {
            let { bike } = await bikeService.getBikeById(idBike);
            if (bike) {
                await bikeModel.findOneAndDelete({_id: bike._id });
                return {
                    message: "Bicicleta eliminada correctamente",
                    status: 200
                }
            } else {
                return {
                    message: "Bicicleta no encontrada",
                    status: 404
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async getBikesByTrainingCenter(trainingCenter) {

    }
}

module.exports = bikeService