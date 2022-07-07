//Import required packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Initialize Favorite model by extending off Sequelize's Model Class
class Favorite extends Model { };

//Set up fields and rules for Favorite model 
Favorite.init(
    {
        //ID field for favorite model
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },

        //launch_id field for favorite model
        // launch_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: "launch",
        //         key: "id"
        //     }
        // }
    },
    {
        //Rules for Favorite model 
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "favorite"
    }
);

//Export Favorite module
module.exports = Favorite;