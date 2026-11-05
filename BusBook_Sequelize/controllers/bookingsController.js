
const bookingService = require('../services/bookingsService');
const { sendErrorResp } = require('../utils/response');

const allBookings = (req, res) => {
    return bookingService.showAllBookings(res);
}

const addBooking = (req, res) => {
    const { userId, busId, seatNumber } = req.body;

    if(
        !Number.isInteger(userId) || userId <= 0 ||
        !Number.isInteger(busId)  || busId <= 0 ||
        !Number.isInteger(seatNumber) || seatNumber <= 0
    ) {
        return sendErrorResp(
            res,
            {
                statusCode: 400,
                message: 'Please fill details correctly'
            },
            false 
        );
    }

    return bookingService.addBooking({ userId, busId, seatNumber }, res);
}

const bookSeats = (req, res) => {
    const { seats } = req.body;

    return bookingService.bookingSeats({ seats }, res);
}

module.exports = {
    allBookings,
    addBooking,
    bookSeats
}