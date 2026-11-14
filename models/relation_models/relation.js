
const AuthCheck = require('../authModel');
const Expense = require('../expenseModel');

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

module.exports = {
    AuthCheck,
    Expense
}