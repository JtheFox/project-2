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

        //title fielf for Launch model 
        title: {
            type: DataTypes.STRING, 
            allowNull: false
        },
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