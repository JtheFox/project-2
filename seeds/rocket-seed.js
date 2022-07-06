//Import Rocket model 
const { Rocket } = require('../models');

//Insert favorite into the database 
const seedRockets = (rocketData) => Rocket.bulkCreate(rocketData);

//Export seeded rockets
module.exports = seedRockets;