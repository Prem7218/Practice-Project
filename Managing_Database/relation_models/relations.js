
const Users = require('../models/usersModel');
const Buses = require('../models/busesModel');
const Bookings = require('../models/bookingsModel');
const Payments = require('../models/paymentsModel');

Users.hasMany(Bookings, {
    foreignKey: 'UserId',
    as: 'bookings'
});

Bookings.belongsTo(Users, {
    foreignKey: 'UserId',
    as: 'user'
});

Buses.hasMany(Bookings, {
    foreignKey: 'BusId',
    as: 'bookings'
});

Bookings.belongsTo(Buses, {
    foreignKey: 'BusId',
    as: 'bus'
});

Payments.hasOne(Bookings, {
    foreignKey: 'BookingId',
    as: 'booking'
});

Bookings.belongsTo(Payments, {
    foreignKey: 'BookingId',
    as: 'payment'
});

module.exports = {
    Users,
    Buses,
    Bookings,
    Payments
};
