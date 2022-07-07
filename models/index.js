//Import models
const User = require('./User');
const Launch = require('./Launch');
const Rocket = require('./Rocket');

//Relationships between the model 
User.hasMany(Launch, {
    foreignKey: 'user_id',
    as: 'saved'
});

Rocket.hasMany(Launch, {
    foreignKey: 'launch_id'
})

Launch.belongsTo(Rocket, {
    foreignKey: 'launch_id'
});

//Export Models 
module.exports = { User, Launch, Rocket }