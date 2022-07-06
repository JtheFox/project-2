//Import required packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Initialize Favorite model by extending off Sequelize's Model Class
class Profile extends Model {};

//Set up fields and rules for Profile model 
Profile.init (
    {
        //ID field for Profile model
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            autoIncrement: true, 
            primaryKey: true
        },

        //username field for Profile model 
        display_name: {
            type: DataTypes.STRING
        },

        //about field for Profile model
        about: {
            type: DataTypes.STRING,
            defaultValue: "Write a description about yourself",
            allowNull: true
        },

        //favorite_id field for Profile model
        favorite_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "favorite",
                key: "id"
            }
        },

        //User id field for Profile model
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        //Rules for Profile model 
        sequelize, 
        timestamps: false, 
        freezeTableName: true, 
        underscored: true, 
        modelName: "favorite"
    }
);

//Export Profile model
module.exports = Profile;