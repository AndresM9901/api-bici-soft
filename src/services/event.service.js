const eventModel = require('../models/event.model');
const createLocation = require('../utils/createLocation');

class EventService {
    static async getEvents() {
        try {
            let events = await eventModel.find({});
            if(events.length > 0) {
                return {
                    events,
                    status: 200
                }
            } else {
                return {
                    message: "No hay eventos registrados",
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

    static async getEventById(idEvent) {
        try {
            let event = await eventModel.findOne({_id: idEvent});
            if(event !== undefined) {
                return {
                    event,
                    status: 200
                }
            } else {
                return {
                    message: "No hay eventos registrados",
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

    static async createEvent(newEvent) {
        try {
            newEvent.routeStart = createLocation(newEvent.routeStart);
            newEvent.routeEnd = createLocation(newEvent.routeEnd);
            let event = await eventModel.create(newEvent);
            if(event) {
                return {
                    event,
                    message: "Evento creado correctamente",
                    status: 201
                }
            } else {
                return {
                    message: "El evento no se pudo crear revisa los datos",
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

    static async updateEvent(idEvent, updateEvent) {
        try {
            updateEvent.routeStart = createLocation(newEvent.routeStart);
            updateEvent.routeEnd = createLocation(newEvent.routeEnd);
            let event = await EventService.getEventById(idEvent);
            if(event) {
                let updatedEvent = await eventModel.findOneAndUpdate({ _id: event._id }, updateEvent);
                return {
                    updatedEvent,
                    message: "El evento ha sido actualizado correctamente",
                    status: 201
                }
            } else {
                return {
                    message: "El evento no se pudo actualizar revisa los datos",
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

    static async deleteEvent(idEvent) {
        try {
            let event = await EventService.getEventById(idEvent);
            if(event) {
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

module.exports = EventService;