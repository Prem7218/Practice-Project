
const { sendSuccessResp, sendErrorResp } = require('../utils/response');
const Buses = require('../modules/busesModule');

const getAllBuses = async (res) => {
    
    try {
        const buses = await Buses.findAll();

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

const updateBus = async ({ busId, name, totalSeats }, res) => {

    try {

        const [bus] = await Buses.update(
            { busId, name, totalSeats }, 
            {
                where: {
                    busId: busId
                }
            }
        );

        if(bus === 0) {
            return sendErrorResp(res, { 
                statusCode: 404, 
                message: 'Student not found' 
            }, false);
        }

        return sendSuccessResp(
            res, 
            200, 
            'Bus has been updated', 
            { busId, name, totalSeats }
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

const postBuses = async ({ name, totalSeats }, res) => {

    try {

        await Buses.create({
            name,
            totalSeats
        });

        return sendSuccessResp(
            res,
            201,
            `new user created: ${name}`, 
            { name, totalSeats }
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
    postBuses
}