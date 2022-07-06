//Import Launch model 
const { Launch } = require('../models');
const fetch = require('node-fetch');
const { parseLaunchData } = require('../utils/helpers')

//Create a list of launch models
const response = await fetch('https://api.spacexdata.com/v5/launches/past');
const launchDataRaw = await response.json();
const launchData = launchDataRaw.map(launch => parseLaunchData(launch));

//Create list of rocket ids
const rockets = [];
launchDataRaw.forEach(launch => { if (rockets.indexOf(launch.rocket) === -1) rockets.push(launch.rocket) });
process.env.ROCKET_LIST = rockets;

//Insert launch into the database 
const seedLaunches = () => Launch.bulkCreate(launchData);

//Export seeded launches
module.exports = seedLaunches;