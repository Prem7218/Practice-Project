
const Appointment = require('../modules/appointmentModule');
const { sendErrorResp, sendSuccessResp } = require('../utils/response');

const addNewAppointment = async ({ name, email, number }, res) => {
    
    try {

        const appointment = await Appointment.create(
            { name, email, number }
        );

        if(!appointment) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'no user appointed'
            },
            false);
        }

        return sendSuccessResp(
            res,
            201,
            `new appointment created: ${name}`, 
            { name, email, number }
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

const getAllApointment = async (res) => {
    
    try {
        const appointments = await Appointment.findAll();

        if(!appointments) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'no user appointed'
            },
            false);
        }

        return sendSuccessResp(
            res, 
            200, 
            'Appointment are all here!', 
            appointments
        );

    } catch (err) {
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

const getAppointmentById = async ({ appointmentId }, res) => {

    try {
        console.log(appointmentId);
        const appointment = await Appointment.findByPk(appointmentId);

        if(!appointment) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'no user appointed'
            },
            false);
        }

        return sendSuccessResp(
            res, 
            200, 
            'Appointment are all here!', 
            appointment
        );

    } catch (err) {
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

const updateAppointmentById = async ({ name, email, number, appointmentId }, res) => {

    try {

        const appointment = await Appointment.update(
            {name, email, number},
            {
                where: {
                    id: appointmentId
                }
            }
        )

        if(!appointment) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'no user appointed'
            },
            false);
        }

        return sendSuccessResp(
            res, 
            200, 
            'Appointment Update Successfully', 
            { appointmentId, name, email, number }
        );

    } catch (err) {
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

const deleteAppointmentById = async ({ appointmentId }, res) => {

    try {
        const appointment = await Appointment.destroy({
            where: {
                id: appointmentId
            }
        });

        if(!appointment) {
            return sendErrorResp(res, {
                statusCode: 404,
                message: 'no user appointed'
            },
            false);
        }

        return sendSuccessResp(
            res, 
            200, 
            'Appointment deleted successfully' 
        );

    } catch (err) {
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
    addNewAppointment,
    getAllApointment,
    getAppointmentById,
    deleteAppointmentById,
    updateAppointmentById
}