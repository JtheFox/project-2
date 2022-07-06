//Import Launch model 
const { Launch } = require('../models');

//Insert launch into the database 
const seedLaunches = (launchData) => Launch.bulkCreate(launchData);

//Export seeded launches
module.exports = seedLaunches;