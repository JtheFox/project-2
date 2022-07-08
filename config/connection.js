//Import required packages
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// .env file
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

//Export sequelize
module.exports = sequelize;