
const busesService = require('../services/sequelizeBusesService');
const { sendErrorResp } = require('../utils/response');

const busesMoreThanSeats = (req, res) => {
    const seats = Number(req.params.seats);

    if(!Number.isInteger(seats) || seats <= 0) {
        return sendErrorResp(res, 400, 'Invalid seat number');
    }

    return busesService.getBusesMoreThanSeats({ seats }, res);
}

const postBuses = (req, res) => {
    const { busNumber, totalSeats, availableSeats } = req.body;

    if(typeof busNumber !== 'string' || !busNumber.trim()) {
        return sendErrorResp(res, 400, 'Invalid bus number');
    }

    if(!Number.isInteger(totalSeats) || totalSeats <= 0) {
        return sendErrorResp(res, 400, 'Invalid total seats');
    }

    if(!Number.isInteger(availableSeats) || availableSeats <= 0) {
        return sendErrorResp(res, 400, 'Invalid available seats');
    }

    return busesService.postBuses({ 
            busNumber: busNumber.trim(),
            totalSeats,
            availableSeats 
        },
        res
    )
}

module.exports = {
    busesMoreThanSeats,
    postBuses
}