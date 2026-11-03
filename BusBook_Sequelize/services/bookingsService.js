
const Buses = require('../modules/busesModule');
const Bookings = require('../modules/bookingsModule');
const Payments = require('../modules/payments');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');
const { literal, col, fn, Op } = require('sequelize');

// One Bus can have multiple Bookings
Buses.hasMany(Bookings, {
    foreignKey: 'busId'
});

// One Booking belongs to one Bus
Bookings.belongsTo(Buses, {
    foreignKey: 'busId'
});

const showAllBookings = async (res) => {
    
    try {
        const bookings = await Bookings.findAll({
            include: [{
                model: Payments
            }]
        });

        return sendSuccessResp(
            res, 
            200, 
            'Bookings are all here!', 
            bookings
        );

    } catch(err) {
        console.error(err.message);
        return sendErrorResp(
            res, 
            { 
                statusCode: 500, 
                message: 'Internal server error!' 
            },
            false
        );
    }
}

const bookingSeats = async ({ seats }, res) => {

    try {
        const booking = await Buses.findAll({
            attributes: [
                'busId',
                'name',
                'totalSeats',

                [
                    fn('COUNT', col('Bookings.bookingId')),
                    'bookedSeats'
                ],

                [
                    literal(
                        '`Buses`.`totalSeats` - COUNT(`Bookings`.`bookingId`)'
                    ),
                    'availableSeats'
                ]
            ],

            include: [
                {
                    model: Bookings,
                    attributes: [],
                    required: false
                }
            ],

            group: [
                'Buses.busId',
                'Buses.name',
                'Buses.totalSeats'
            ],

            having: literal(
                `availableSeats > ${Number(seats)}`
            ),

            raw: true
        });

        return sendSuccessResp(
            res,
            200,
            'Available buses retrieved successfully',
            booking
        );

    } catch(error) {
        console.error(error);

        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Internal server error!'
            },
            false
        );
    }
};

const addBooking = async ({ userId, busId, seatNumber }, res) => {

    try {

        await Buses.create({
            userId, busId, seatNumber
        });

        return sendSuccessResp(
            res,
            201,
            `new booking created: ${seatNumber}`, 
            { userId, busId, seatNumber }
        );

    } catch(err) {
        console.error(err.message);
        return sendErrorResp(
            res, 
            { 
                statusCode: 500, 
                message: 'Internal server error!' 
            },
            false
        );
    }
}

module.exports = {
    showAllBookings,
    addBooking,
    bookingSeats
}