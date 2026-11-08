
const { sendSuccessResp, sendErrorResp } = require('../utils/response');
const db = require('../utils/DBConnection');

const getBusesMoreThanSeats = ({ seats }, res) => {
    
    try {
        const query = `
            SELECT * FROM Buses
            WHERE availableSeats >= ${seats}
        `;
         
        db.execute(query, (error, result) => {
            if(error) {
                console.error(error.message);
                return sendErrorResp(res, 500, 'Internal server error!');
            }

            if(result.length === 0) {
                return sendErrorResp(res, 404, 'Buses not found!')
            }

            return sendSuccessResp(res, 200, 'Here all buses', result);
        });

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

const postBuses = ({ busNumber, totalSeats, availableSeats }, res) => {

    try {
        const query = `
            INSERT INTO Buses (busNumber, totalSeats, availableSeats)
            VALUES (?, ?, ?)
        `;

        db.execute(query, [busNumber, totalSeats, availableSeats], (error, result) => {
            if(error) {
                console.error(error.message);
                return sendErrorResp(res, 500, 'Internal server error!');
            }

            return sendSuccessResp(res, 201, 'New bus added successfully!', result);
        });

    } catch(error) {
        return sendErrorResp(res, 500, 'Internal Server Error!');
    }
}

module.exports = {
    getBusesMoreThanSeats,
    postBuses
}