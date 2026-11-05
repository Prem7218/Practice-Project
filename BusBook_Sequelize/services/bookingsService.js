
const { Payments, Users, Buses, Bookings } = require('../relation_modle/relation');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');
const { literal, col, fn, Op } = require('sequelize');

const showAllBookings = async (res) => {
    
    try {
        const bookings = await Bookings.findAll({
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Buses,
                    as: 'bus'
                },
                {
                    model: Payments,
                    as: 'payment'
                }
            ]
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
        const requestedSeats = Number(seats);

        if(
            !Number.isInteger(requestedSeats) ||
            requestedSeats <= 0
        ) {
            return sendErrorResp(res, {
                statusCode: 400,
                message: 'Invalid seat count!'
            });
        }

        const buses = await Buses.findAll({
            attributes: [
                'busId',
                'name',
                'totalSeats',

                [
                    fn('COUNT', col('bookings.bookingId')),
                    'bookedSeats'
                ],

                [
                    literal(
                        '`Buses`.`totalSeats` - COUNT(`bookings`.`bookingId`)'
                    ),
                    'availableSeats'
                ]
            ],

            include: [
                {
                    model: Bookings,
                    as: 'bookings',
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
                `availableSeats >= ${1}`
            ),

            raw: true
        });

        return sendSuccessResp(
            res,
            200,
            'Available buses retrieved successfully',
            buses
        );

    } catch (error) {
        console.error('Available Bus Error:', error);

        return sendErrorResp(res, {
            statusCode: 500,
            message: 'Internal server error!'
        });
    }
};

const addBooking = async ({ userId, busId, seatNumber }, res) => {

    try {
        const user = await Users.findByPk(userId);

        if(!user) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'User not found!'
            });
        }

        const bus = await Buses.findByPk(busId);

        if(!bus) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'Bus not found!'
            });
        }

        const existingBooking = await Bookings.findOne({
            where: {
                busId,
                seatNumber
            }
        });

        // Check whether seat already booked
        if (existingBooking) {
            return sendErrorResp(res, {
                statusCode: 409,
                message: 'This seat is already booked!'
            });
        }

        const booking = await Bookings.create({
            userId, 
            busId, 
            seatNumber
        });

        return sendSuccessResp(
            res,
            201,
            `Booking created successfully!`, 
            booking
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