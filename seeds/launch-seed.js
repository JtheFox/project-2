//Import Launch model 
const { Launch } = require('../models');
const fetch = require('node-fetch');
const { parseLaunchData } = require('../utils/helpers')

//Create a list of launch models
const response = await fetch('https://api.spacexdata.com/v5/launches/past');
const launchDataRaw = await response.json();
const launchData = launchDataRaw.map(launch => parseLaunchData(launch));

//Insert launch into the database 
const seedLaunches = () => Launch.bulkCreate(launchData);

//Export seeded launches
module.exports = seedLaunches;