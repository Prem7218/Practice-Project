
const Socail = require('../socialModel');
const Comments = require('../commentModel');

Socail.hasMany(Comments, {
    foreignKey: 'socailId',
    as: 'comments'
});

Comments.belongsTo(Socail, {
    foreignKey: 'socailId',
    as: 'post'
});

module.exports = {
    Socail,
    Comments
}