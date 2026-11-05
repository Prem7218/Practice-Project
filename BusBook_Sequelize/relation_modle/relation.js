
const Users = require('../modules/usersModule');
const Payments = require('../modules/payments');
const Buses = require('../modules/busesModule');
const Bookings = require('../modules/bookingsModule');

// User - Booking (1:M)
Users.hasMany(Bookings, {
    foreignKey: 'userId',
    as: 'bookings'
});

Bookings.belongsTo(Users, {
    foreignKey: 'userId',
    as: 'user'
});

// Bus - Booking (1:M)
Buses.hasMany(Bookings, {
    foreignKey: 'busId',
    as: 'bookings'
});

Bookings.belongsTo(Buses, {
    foreignKey: 'busId',
    as: 'bus'
});

// Booking - Payment (1:1)
Bookings.hasOne(Payments, {
    foreignKey: 'bookingId',
    as: 'payment'
});

Payments.belongsTo(Bookings, {
    foreignKey: 'bookingId',
    as: 'booking'
});

module.exports = {
    Users,
    Payments,
    Buses,
    Bookings
};
