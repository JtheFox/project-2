//Import required seed model and packages
// const seedUsers = require('./user-seed');
const seedLaunches = require('./launch-seed');
const seedComments = require("./comment-seed");
const seedUsers = require("./user-seed");

const sequelize = require('../config/connection');
const fetch = require('axios');
const { parseLaunchData } = require('../utils/helpers');
const rockets = new Map();

const mapLaunchData = (launch) => {
  const launchData = parseLaunchData(launch);
  launchData.rocket_name = rockets.get(launch.rocket);
  return launchData;
}

//Seed all the model to the database
const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });

    const launchesResponse = await fetch('https://api.spacexdata.com/v5/launches/past');
    const launchDataRaw = await launchesResponse.data;

    const rocketList = [];
    launchDataRaw.forEach(launch => {
      if (rocketList.indexOf(launch.rocket) === -1) rocketList.push(launch.rocket);
    });

    for (const rocketID of rocketList) {
      const rocketsResponse = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketID}`);
      const rocket = await rocketsResponse.data;
      rockets.set(rocketID, rocket.name);
    }

    const launchData = launchDataRaw.map(launch => mapLaunchData(launch));

    await seedLaunches(launchData);
    console.log("\n---------- LAUNCHES SEEDED ----------\n");

    await seedUsers();
    console.log("\n---------- USERS SEEDED ----------\n");
    
    await seedComments();
    console.log("\n---------- COMMENTS SEEDED ----------\n");

    process.exit();
  } catch (err) {
    console.log('Error encountered while seeding');
    console.log(err);
    process.exit();
  }
};

//Call the function
seedAll();
