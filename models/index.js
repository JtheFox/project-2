//Import models
const User = require('./User');
const Launch = require('./Launch');

//Relationships between the model 
User.hasMany(Launch, {
    foreignKey: 'user_id',
    as: 'saved'
});

//Export Models 
module.exports = { User, Launch }