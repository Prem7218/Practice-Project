
const busService = require('../service/busesService');
const { sendErrorResp } = require('../utils/response');

const getAvilableBuses = (req, res) => {
    const seats = Number(req.params.seats);
    
    if(!Number.isInteger(seats) || seats < 0) {
        return sendErrorResp(res, { statusCode: 400, message: 'Fill details correctly' });
    }

    return busService.getBusBySeatNumber({ seats }, res);
};

const postBuses = (req, res) => {
    const { busName, totalSeats } = req.body;

    if(
        typeof busName !== 'string' ||
        !busName.trim() ||
        !Number.isInteger(totalSeats) ||
        totalSeats <= 0
    ) {
        return sendErrorResp(res, { 
            statusCode: 400, 
            message: 'Provide a valid busName and totalSeats' 
        });
    }

    return busService.postNewBuses(
        { 
            busName: busName.trim(),
            totalSeats
        }, 
        res
    );
};

module.exports = {
    getAvilableBuses,
    postBuses
}