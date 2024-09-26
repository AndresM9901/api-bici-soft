const trainingCenterModel = require('../models/training-center.model');
const bikeModel = require('../models/bike.model');
const createLocation = require('../utils/createLocation');

class TrainingCenterService {
    static async getTrainingCenters() {
        try {
            let trainingCenters = await trainingCenterModel.find({});
            if(trainingCenters.length > 0) {
                return {
                    data: trainingCenters,
                    status: 200
                }
            } else {
                return {
                    message: "No hay centros de formación registrados ",
                    status: 204
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async getTrainingCenterById(idCenter) {
        try {
            let trainingCenter = await trainingCenterModel.findOne({_id: idCenter});
            if(trainingCenter !== undefined) {
                return {
                    data: trainingCenter,
                    status: 200
                }
            } else {
                return {
                    message: "No se encontro el centro de formación",
                    status: 204
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async createCenter(newCenter) {
        try {
            newCenter.location = createLocation(newCenter.location);
            let center = await trainingCenterModel.create(newCenter);
            if(center) {
                return {
                    center,
                    message: "Centro de formación creado correctamente",
                    status: 201
                }
            } else {
                return {
                    message: "El centro de formación no se pudo crear revisa los datos",
                    status: 400
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async addBike(idCenter, idBike) {
        try {
            let bike = await bikeModel.findOne({_id: idBike});
            const bikes = [];
            let data = await trainingCenterModel.findOne({_id: idCenter});
            console.log(data, bike);
            if(bike && data) {
                bikes.push(bike._id);
                data.availableBike.push(bike);
                data.save();
    
                return {
                    message: 'Añadido correctamente',
                    status: 201
                }
            } else {
                return {
                    message: "La bicicleta o el centro de formación no esta registrado",
                    status: 400
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async updateCenter(idCenter, updateCenter) {
        try {
            updateCenter.location = createLocation(newCenter.location);
            let center = await TrainingCenterService.getTrainingCenterById(idCenter);
            if(center) {
                let updatedCenter = await trainingCenterModel.findOneAndUpdate({_id: idCenter}, updateCenter);
                return {
                    updatedCenter,
                    message: "Centro de formación se ha actualizado correctamente",
                    status: 201
                }
            } else {
                return {
                    message: "El centro de formación no se pudo actualizar revisa los datos",
                    status: 400
                }
            }
        } catch (error) {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }

    static async deleteCenter(idCenter) {
        try {
            let center = await TrainingCenterService.getEventById(idEvent);
            if(center) {
                await bikeModel.findOneAndDelete({_id: bike._id });
                return {
                    message: "Evento eliminado correctamente",
                    status: 200
                }
            } else {
                return {
                    message: "Evento no encontrado",
                    status: 404
                }
            }
        } catch {
            return {
                message: `Internal server error ${error}`,
                status: 500
            }
        }
    }
}

module.exports = TrainingCenterService