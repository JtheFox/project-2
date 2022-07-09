//Import required packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Initialize Saved model (table) by extending off Sequelize's Model Class
class Saved extends Model {};

//Set up fields and rules for Saved model 
Saved.init (
    {
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        },
        launch_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "launch",
                key: "id"
            }
        }
    },
    {
        //Create rules for Saved Model
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "saved"
    }
);

//Export Saved model
module.exports = Saved;