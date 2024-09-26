const rentModel = require('../models/rent.model');
const userModel = require('../models/user.model');
const bikeModel = require('../models/bike.model');
const createLocation = require('../utils/createLocation');
const discount = require('../utils/discount');

class RentService {
    static async rentBike(data) {
        try {
            if(data) {
                let user = userModel.findOne({_id: data.user});
                let bike = bikeModel.findOne({_id: data.bike});
                data.routeStart = createLocation(data.routeStart);
                data.routeEnd = createLocation(data.routeEnd);
                let rentBike = new rentModel({
                    price: bike.rentalPrice,
                    routeStart: data.routeStart,
                    routeEnd: data.routeEnd,
                    total: discount(user, bike.rentalPrice),
                    user: user._id,
                    bike: bike._id
                });
                bike.state = "no disponible";
                rentBike.save();
                bike.save();
                return {
                    rentBike,
                    bike,
                    user,
                    message: "Se alquilo correctamente la bicicleta",
                    status: 201
                }
            } else {
                return {
                    message: "No se ingreso datos revisa de nuevo",
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

    static async rentEnd(idRent) {
        try {
            let rent = rentModel.findOne({_id: idRent});
            let bike = bikeModel.findOne({_id: rent.bike});
            if(bike && rent) {
                bike.state = "disponible"
                bike.location = rent.routeEnd
                bike.save();
                return {
                    bike,
                    rent,
                    message: "Bicicleta devuelta al centro",
                    status: 201
                }
            } else {
                return {
                    message: "Hubo problema al devolver la bicicleta vuelve a intentar",
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
}

module.exports = RentService;