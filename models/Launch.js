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
            type: DataTypes.CHAR(24),
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
        },

        //date field for Launch model 
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },

        //flight_number for Launch model 
        flight_number: {
            type: DataTypes.INTEGER,
        },

        //icon for Launch model
        icon: {
            type: DataTypes.STRING,
        },

        //forum for Launch model 
        forum: {
            type: DataTypes.STRING, 
        },

        //webcast for Launch model 
        webcast:  {
            type: DataTypes.STRING, 
        },

        //wiki for Launch model 
        wiki: {
            type: DataTypes.STRING,
        },

        rocket_id: {
            type: DataTypes.CHAR(24),
            allowNull: false,
            references: {
                model: 'rocket',
                key: 'id'
            }
        },
    },
    {
        //Rules for Launch model 
        sequelize,  
        freezeTableName: true, 
        underscored: true, 
        modelName: "launch"
    }
);

//Export Launch model 
module.exports = Launch;