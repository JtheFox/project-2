//Import models
const User = require('./User');
const Launch = require('./Launch');
const Rocket = require("./Rocket");

//Relationships between the model 
User.hasMany(Launch, {
    foreignKey: "launch_id"
});

Launch.hasOne(Rocket, {
    foreignKey: "rocket_id"
});

Rocket.belongsTo(Launch, {
    foreignKey: "launch_id"
});

//Export Models 
module.exports = { User, Launch, Rocket }