//Import models
const User = require('/User');
const Favorite = require('./Favorite');
const Profile = require('./Profile');
const Launch = require('./Launch');

//Relationships between the model 
Profile.belongsTo(User, {
    foreignKey: "user_id"
});

User.belongsTo(Profile, {
    foreignKey: "user_id"
});

User.hasMany(Favorite, {
    foreignKey: "launch_id"
});

Favorite.hasMany(Launch, {
    foreignKey: "launch_id"
});

//Export Models 
module.exports = { User, Favorite, Profile, Launch }