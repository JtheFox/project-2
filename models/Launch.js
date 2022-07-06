//Import required packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Initialize Favorite model by extending off Sequelize's Model Class
class Launch extends Model {};

//Set up fields and rules for Launch model 
Launch.init ( 
    {
        //Id field for Launch model
        id: {
            type: DataTypes.VARCHAR,
            allowNull: false,
            primaryKey: true
        },

        //name field for Launch model 
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        },

        //success field for Launch model 
        success: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },

        //date field for Launch model 
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },

        //flight_number for Launch model 
        flight_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        //icon for Launch model
        icon: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //forum for Launch model 
        forum: {
            type: DataTypes.STRING, 
            allowNull: true
        },

        //webcast for Launch model 
        webcast:  {
            type: DataTypes.STRING, 
            allowNull: true
        },

        //wiki for Launch model 
        wiki: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        //Rules for Launch model 
        sequelize,  
        freezeTableName: true, 
        underscored: true, 
        modelName: "Favorite"
    }
);

//Export Launch model 
module.exports = Launch;