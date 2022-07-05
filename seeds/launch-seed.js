//Import Favorite model 
const { Launch } = require("../models");

//Create a list of favorite models
const launchData = [];

//Insert favorite into the database 
const seedLaunches = () => Favorite.bulkCreate(launchData);

//Export seeded favorites
module.exports = seedLaunches;