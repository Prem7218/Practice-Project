
const bookingsService = require('../services/sequelizeBookingsService');
const { sendErrorResp } = require('../utils/response');

const findBookingByUserId = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(res, 400, 'Invalid user id');
    }

    return bookingsService.findBookingByUserId({ UserId: id }, res);
}

const findBookingByBusId = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(res, 400, 'Invalid bus id');
    }

    return bookingsService.findBookingByBusId({ BusId: id }, res);
}

const postBooking = (req, res) => {
    const { UserId, BusId, seatNumber } = req.body;

    if(!Number.isInteger(UserId) || UserId <= 0) {
        return sendErrorResp(res, 400, 'Invalid user id');
    }

    if(!Number.isInteger(BusId) || BusId <= 0) {
        return sendErrorResp(res, 400, 'Invalid bus id');
    }

    if(typeof seatNumber !== 'string' || !seatNumber.trim()) {
        return sendErrorResp(res, 400, 'Invalid seatNumber is must be 12 letter only');
    }

    return bookingsService.postBooking({ UserId, BusId, seatNumber }, res);
}

module.exports = {
    findBookingByUserId,
    findBookingByBusId,
    postBooking
}