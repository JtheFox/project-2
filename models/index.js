//Import models
const User = require('./User');
const Launch = require('./Launch');
const Rocket = require('./Rocket');

//Relationships between the model 
User.hasMany(Launch);

Launch.hasOne(Rocket);

Rocket.belongsToMany(Launch, {
    foreignKey: 'rocket_id',
    through: 'launchRocket'
});

//Export Models 
module.exports = { User, Launch, Rocket }