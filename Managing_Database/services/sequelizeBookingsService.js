
const { literal, Op } = require('sequelize');
const { Bookings, Users, Buses } = require('../relation_models/relations');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const findBookingByUserId =async ({ UserId }, res) => {

    try {
        const bookings = await Bookings.findAll({
            where: {
                UserId
            },
            attributes: [
                ['BookingId', 'id'],
                'seatNumber'
            ],
            include: [
                {
                    model: Buses,
                    as: 'bus',
                    attributes: ['busNumber']
                }
            ]
        });

        if(bookings.length === 0) {
            return sendErrorResp(
                res,
                404,
                'No bookings found for this user!'
            );
        }

        return sendSuccessResp(
            res,
            200,
            'User bookings fetched successfully!',
            bookings
        );

    } catch (error) {
        console.error(error);

        return sendErrorResp(
            res,
            500,
            'Internal Server Error!'
        );
    }
}

const findBookingByBusId =async ({ BusId }, res) => {

    try {
        const bookings = await Bookings.findAll({
            where: {
                BusId
            }, 
            attributes: [
                ['BookingId', 'id'],
                'seatNumber'
            ],
            include: [
                {
                    model: Users,
                    as: 'user',
                    attributes: ['name', 'email']
                }
            ]
        });

        if(bookings.length === 0) {
            return sendErrorResp(
                res,
                404,
                'No bookings found for this user!'
            );
        }

        return sendSuccessResp(
            res,
            200,
            'User bookings fetched successfully!',
            bookings
        );

    } catch (error) {
        console.error(error);

        return sendErrorResp(
            res,
            500,
            'Internal Server Error!'
        );
    }
}

const postBooking =async ({ UserId, BusId, seatNumber }, res) => {

    try {
        const booking = await Bookings.sequelize.transaction(
            async (transaction) => {

                const user = await Users.findByPk(UserId, {
                    transaction
                });

                if(!user) {
                    const error = new Error('No user found!');
                    error.statusCode = 404;
                    throw error;
                }

                const bus = await Buses.findByPk(BusId, {
                    transaction
                });

                if(!bus) {
                    const error = new Error('No bus found!');
                    error.statusCode = 404;
                    throw error;
                }

                const [updatedRows] = await Buses.update(
                    {
                        availableSeats: literal('availableSeats - 1')
                    },
                    {
                        where: {
                            BusId,
                            availableSeats: {
                                [Op.gt]: 0
                            }
                        },
                        transaction
                    }
                );

                if(updatedRows === 0) {
                    const error = new Error('No seats available!');
                    error.statusCode = 409;
                    throw error;
                }

                const newBooking = await Bookings.create({
                    UserId, 
                    BusId, 
                    seatNumber
                }, {
                    transaction
                });
                
                return newBooking;
            }
        );

        return sendSuccessResp(
            res,
            201,
            'New booking created successfully!',
            booking
        );

    } catch (error) {
        console.error(error);

        if(error.name === 'SequelizeUniqueConstraintError') {
            return sendErrorResp(
                res,
                409,
                'This seat is already booked!'
            );
        }

        return sendErrorResp(
            res,
            500,
            'Internal Server Error!'
        );
    }
};

module.exports = {
    findBookingByUserId, 
    findBookingByBusId,
    postBooking
}