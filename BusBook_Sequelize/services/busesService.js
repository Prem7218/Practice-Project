
const { sendSuccessResp, sendErrorResp } = require('../utils/response');
const { Buses, Bookings, Users } = require('../relation_modle/relation');

const getAllBuses = async (res) => {
    
    try {
        const buses = await Buses.findAll({
            include: [{
                model: Bookings,
                as: 'bookings'
            }]
        });

        return sendSuccessResp(
            res, 
            200, 
            'Users are all here!', 
            buses
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

const checkBookingForSingleBus = async ({ busId }, res) => {

    try {
        const bus = await Buses.findByPk(busId, {
            include: [{
                model: Bookings,
                as: 'bookings',
                include: [
                    {
                        model: Users,
                        as: 'user',
                        attributes: ['name', 'email']
                    }
                ]
            }]
        });

        if(!bus) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Bus not found' 
            }, false);
        }

        return sendSuccessResp(
            res,
            200,
            'Bus with Bookings',
            bus
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

const updateBus = async ({ busId, name, totalSeats, availableSeats }, res) => {

    try {

        const [bus] = await Buses.update(
            { name, totalSeats, availableSeats }, 
            {
                where: { busId }
            }
        );

        if(bus === 0) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Bus not found' 
            }, false);
        }

        return sendSuccessResp(
            res, 
            200, 
            'Bus has been updated', 
            { busId, name, totalSeats, availableSeats }
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

const postBuses = async ({ name, totalSeats, availableSeats }, res) => {

    try {

        await Buses.create({
            name,
            totalSeats,
            availableSeats
        });

        return sendSuccessResp(
            res,
            201,
            `new user created: ${name}`, 
            { name, totalSeats, availableSeats }
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
    getAllBuses,
    updateBus,
    postBuses,
    checkBookingForSingleBus
}