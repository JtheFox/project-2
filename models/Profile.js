//Import required packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Initialize Favorite model by extending off Sequelize's Model Class
class Profile extends Model {};

//Export Profile model
module.exports = Profile;