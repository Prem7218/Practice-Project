
const busesService = require('../services/busesService');
const { sendErrorResp } = require('../utils/response');

const allBuses = (req, res) => {
    return busesService.getAllBuses(res);
} 

const updateBus = (req, res) => {
    const id = Number(req.params.id);
    const { name, totalSeats } = req.body;

    if(
        typeof name !== 'string' || !name.trim() || 
        !Number.isInteger(totalSeats) || totalSeats <= 0
    ) {
        return sendErrorResp(
            res, 
            { 
                statusCode: 400,
                message: 'Please name & email correctly' 
            },
            false
        )
    }

    return busesService.updateBus(
        { 
            busId: id, 
            name: name.trim(), 
            totalSeats 
        }, res
    );
}

const postBus = (req, res) => {
    const { name, totalSeats } = req.body;

    return busesService.postBuses(
        {  
            name: name.trim(), 
            totalSeats 
        }, res
    );
}

module.exports = {
    allBuses,
    updateBus,
    postBus
}