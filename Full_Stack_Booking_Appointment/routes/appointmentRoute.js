
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.loadAppointmentPage);
router.get('/all', appointmentController.allAppointment);
router.get('/:id', appointmentController.appointmentById);
router.delete('/:id', appointmentController.deleteAppointment);
router.put('/:id', appointmentController.updateAppointment);
router.post('/', appointmentController.postAppointment);

module.exports = router;