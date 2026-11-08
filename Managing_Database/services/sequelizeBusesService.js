
const { sendSuccessResp, sendErrorResp } = require('../utils/response');
const { Buses } = require('../relation_models/relations');
const { Op } = require('sequelize');

const getBusesMoreThanSeats = async ({ seats }, res) => {
    
    try {
        const buses = await Buses.findAll({
            where: {
                availableSeats: {
                    [Op.gte]: seats
                } 
            }
        });

        if(buses.length === 0) {
            return sendErrorResp(res, 404, 'Buses not found!')
        }

        return sendSuccessResp(res, 200, 'Here all buses', buses);

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const postBuses = async ({ busNumber, totalSeats, availableSeats }, res) => {

    try {
        const bus = await Buses.create({
            busNumber, totalSeats, availableSeats
        });

        return sendSuccessResp(res, 201, 'New bus added successfully!', bus);

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

module.exports = {
    getBusesMoreThanSeats,
    postBuses
}