//Import required packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Initialize Favorite model by extending off Sequelize's Model Class
class Launch extends Model { };

//Set up fields and rules for Launch model 
Launch.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        success: {
            type: DataTypes.BOOLEAN,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        flight_number: {
            type: DataTypes.INTEGER,
        },
        icon: {
            type: DataTypes.STRING,
        },
        forum: {
            type: DataTypes.STRING,
        },
        webcast: {
            type: DataTypes.STRING,
        },
        wiki: {
            type: DataTypes.STRING,
        },
        rocket_id: {
            type: DataTypes.STRING,
            validate: { is: /^[0-9a-f]{24}$/i },
            allowNull: false,
        },
        rocket_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'launch'
    }
);

//Export Launch model 
module.exports = Launch;