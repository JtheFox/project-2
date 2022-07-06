//Import models
const User = require('./User');
const Favorite = require('./Favorite');
const Profile = require('./Profile');
const Launch = require('./Launch');
const Rocket = require("./Rocket");

//Relationships between the model 
User.hasOne(Profile, {
    foreignKey: "profile_id"
});

User.hasOne(Favorite, {
    foreignKey: "favorite_id"
});

Profile.belongsTo(User, {
    foreignKey: "user_id"
});

Favorite.belongsTo(User, {
    foreignKey: "user_id"
});

Favorite.hasMany(Launch, {
    foreignKey: "launch_id"
});

Launch.hasOne(Rocket, {
    foreignKey: "rocket_id"
});

Rocket.belongsTo(Launch, {
    foreignKey: "launch_id"
});

//Export Models 
module.exports = { User, Favorite, Profile, Launch, Rocket }