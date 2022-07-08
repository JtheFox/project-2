//Import models
const User = require('./User');
const Launch = require('./Launch');
const Comment = require('./Comment');

//Relationships between the model 
User.hasMany(Launch, {
    foreignKey: 'user_id',
    as: 'saved'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


//Export Models 
module.exports = { User, Launch, Comment }