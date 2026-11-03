
const db = require('../utils/DBConnection');
const { sendSuccessResp, sendErrorResp } = require('../utils/response');

const getBusBySeatNumber = ({ seats }, res) => {
    const getBus = `
        SELECT 
            b.BusId,
            b.busName,
            b.totalSeats,
            COUNT(bk.BookingId) AS bookedSeats,
            (b.totalSeats - COUNT(bk.BookingId)) AS availableSeats
        FROM Buses b
        LEFT JOIN Bookings bk
            ON b.BusId = bk.BusId
        GROUP BY
            b.BusId,
            b.busName,
            b.totalSeats
        HAVING availableSeats > ?
    `;

    db.execute(getBus, [seats], (error, result) => {
        if (error) {
            console.error(error.message);

            return sendErrorResp(res, {
                statusCode: 500,
                message: 'Unable to retrieve available buses'
            });
        }

        return sendSuccessResp(
            res,
            200,
            'Available buses retrieved successfully',
            result
        );
    });
};

const postNewBuses = ({ busName, totalSeats }, res) => {
    const postQuery = `
        INSERT INTO Buses (busName, totalSeats)
        VALUES (?, ?)
    `;

    db.execute(postQuery, [busName, totalSeats], (error, result) => {
        if (error) {
            console.error(error.message);

            return sendErrorResp(res, {
                statusCode: 500,
                message: 'Unable to retrieve available buses'
            });
        }

        return sendSuccessResp(
            res, 
            201, 
            `Bus '${busName}' created successfully`,
            {
                busId: result.insertId,
                busName,
                totalSeats
            }
        );
    });
};

module.exports = {
    getBusBySeatNumber,
    postNewBuses
}
