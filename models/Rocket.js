//Import required packages
const { Model, DataTypes, DatabaseError } = require('sequelize');
const sequelize = require('../config/connection');

//Initialize Favorite model by extending off Sequelize's Model Class
class Rocket extends Model {};

//Set up fields and rules for Profile model 
Rocket.init (
    {
        id: {
            type: DataTypes.CHAR(24),
            allowNull: false, 
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING, 
            alllowNull: false
        },
        first_flight: {
            type: DataTypes.DATE,
        },
        image: {
            type: DataTypes.STRING,
        },
        wiki: {
            type: DataTypes.STRING, 
        },
        description: {
            type: DataTypes.STRING, 
        },
        launch_cost: {
            type: DataTypes.INTEGER, 
        },
    },
    {
        sequelize, 
        timestamps: false, 
        freezeTableName: true, 
        underscored: true, 
        modelName: "rocket"
    }
);

//Export Profile model
module.exports = Rocket;