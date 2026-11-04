
const appointmentService = require('../services/appointmentService');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadAppointmentPage = (req, res) => {
    return res.sendFile(path.join(__dirname, "..", 'views', 'appointment.html'));
}

const allAppointment = (req, res) => {
    return appointmentService.getAllApointment(res);
}

const deleteAppointment = (req, res) => {
    return appointmentService.deleteAppointmentById({ appointmentId: Number(req.params.id) }, res);
}

const updateAppointment = (req, res) => {
    const id = Number(req.params.id);
    const { name, email, number } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof number !== 'string' || number.length < 10 || !number.trim() ||
        !Number.isInteger(id) || id <= 0
    ) {
        return sendErrorResp(res, {
            statusCode: 400,
            message: 'Please fill name, email, number correctly'
        },
        false
        );
    }

    return appointmentService.updateAppointmentById(
        {
            name: name.trim(),
            email: email.trim(),
            number: number.trim(),
            appointmentId: id
        },
        res
    ); 
}

const postAppointment = (req, res) => {
    const { name, email, number } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof number !== 'string' || number.length < 10 || !number.trim()
    ) {
        return sendErrorResp(res, {
            statusCode: 400,
            message: 'Please fill name, email, number correctly'
        },
        false
        );
    }

    return appointmentService.addNewAppointment(
        {
            name: name.trim(),
            email: email.trim(),
            number: number.trim()
        },
        res
    );
}

const appointmentById = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(
            res,
            {
                statusCode: 500,
                message: 'Wrong id Internal Server Error!'
            },
            false
        );
    }

    return appointmentService.getAppointmentById(
        { 
            appointmentId: id
        },
        res
    );
}

module.exports = {
    loadAppointmentPage,
    allAppointment,
    postAppointment,
    appointmentById,
    deleteAppointment,
    updateAppointment
}