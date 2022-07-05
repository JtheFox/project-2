//Import required packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Initialize Favorite model by extending off Sequelize's Model Class
class Launch extends Model {};

//Export Launch model 
module.exports = Launch;