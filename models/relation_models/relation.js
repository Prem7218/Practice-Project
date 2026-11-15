
const AuthCheck = require('../authModel');
const Expense = require('../expenseModel');
const Payment = require('../paymentModel');

AuthCheck.hasMany(Expense, {
    foreignKey: 'userId',
    sourceKey: 'userId',
    as: 'expenses',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Expense.belongsTo(AuthCheck, {
    foreignKey: 'userId',
    targetKey: 'userId',
    as: 'user'
});

AuthCheck.hasMany(Payment, {
    foreignKey: 'userId',
    as: 'payments',
    onDelete: 'CASCADE'
});

Payment.belongsTo(AuthCheck, {
    foreignKey: 'userId',
    as: 'user'
});

module.exports = {
    AuthCheck,
    Expense,
    Payment
}