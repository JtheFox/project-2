//Import required seed model and packages
const seedUsers = require('./user-seed');
const seedFavorites = require('./favorite-seed');
const seedProfiles = require('./profile-seed');
const seedLaunches = require('./launch-seed');
const seedRockets = require('./rocket-seed');
const sequelize = require('../config/connection');
const fetch = require('node-fetch');
const { parseLaunchData, parseRocketData } = require('../utils/helpers');


//Seed all the model to the database
const seedAll = async () => {
  //Create the table, dropping it first if it already existed
  await sequelize.sync({ force: true });

  //Seed the User model
  await seedUsers();
  console.log("\n---------- Users Seeded ----------\n");

  //Seed the Favorite model
  // await seedFavorites();
  // console.log("\n---------- Favorites Seeded ----------\n");

  //Seed the Profile model
  // await seedProfiles();
  // console.log("\n---------- Profile Seeded ----------\n");

  //Seed the Launch model
  const launchesResponse = await fetch('https://api.spacexdata.com/v5/launches/past');
  const launchDataRaw = await launchesResponse.json();
  const launchData = launchDataRaw.map(launch => parseLaunchData(launch));

  //Seed the Rocket model
  const rocketList = [];
  launchDataRaw.forEach(launch => { if (rocketList.indexOf(launch.rocket) === -1) rocketList.push(launch.rocket) });
  const rocketData = [];
  rocketList.forEach(async (rocketID) => {
    const rocketsResponse = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketID}`);
    const rocket = await rocketsResponse.json();
    rocketData.push(parseRocketData(rocket));
  });
  await seedRockets(rocketData);
  console.log("\n---------- Launch Rocket ----------\n");

  //End process when all model is seeded
  process.exit();
};

//Call the function
seedAll();
