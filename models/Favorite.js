//Import required packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Initialize Favorite model by extending off Sequelize's Model Class
class Favorite extends Model {};

//Export Favorite module
module.exports = Favorite;