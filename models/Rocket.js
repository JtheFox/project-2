//Import required packages
const { Model, DataTypes, DatabaseError } = require('sequelize');
const sequelize = require('../config/connection');

//Initialize Favorite model by extending off Sequelize's Model Class
class Rocket extends Model {};

//Set up fields and rules for Profile model 
Rocket.init (
    {
        //ID field for Profile model
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            autoIncrement: true, 
            primaryKey: true
        },

        //launch_cost for Rocket model
        name: {
            type: DataTypes.STRING, 
            alllowNull: false
        },

        //launch_cost for Rocket model
        first_flight: {
            type: DataTypes.DATE,
            allowNull: false
        },

        //launch_cost for Rocket model
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //launch_cost for Rocket model
        wiki: {
            type: DataTypes.STRING, 
            allowNull: false
        },

        //launch_cost for Rocket model
        description: {
            type: DataTypes.STRING, 
            allowNull: false
        },

        //launch_cost for Rocket model
        launch_cost: {
            type: DataTypes.DECIMAL, 
            allowNull: false
        }
    },
    {
        //Rules for Profile model 
        sequelize, 
        timestamps: false, 
        freezeTableName: true, 
        underscored: true, 
        modelName: "Favorite"
    }
);

//Export Profile model
module.exports = Rocket;