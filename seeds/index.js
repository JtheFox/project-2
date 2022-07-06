//Import required seed model and packages
const seedUsers = require('./userSeed');
const seedFavorites = require('./favorite-seed');
const seedProfiles = require('./profile-seed');
const seedLaunches = require('./launch-seed');
const seedRocket = require('./rocket-seed');
const sequelize = require('../config/connection');

//Seed all the model to the database
const seedAll = async () => {
  //Create the table, dropping it first if it already existed
  await sequelize.sync({ force: true });

  //Seed the User model
  await seedUsers();
  console.log("\n---------- Users Seeded ----------\n");

  //Seed the Favorite model
  await seedFavorites();
  console.log("\n---------- Favorites Seeded ----------\n");

  //Seed the Profile model
  await seedProfiles();
  console.log("\n---------- Profile Seeded ----------\n");

  //Seed the Profile model
  await seedLaunches();
  console.log("\n---------- Launch Seeded ----------\n");

  //Seed the Profile model
  await seedRocket();
  console.log("\n---------- Launch Rocket ----------\n");

  //End process when all model is seeded
  process.exit();
};

//Call the function
seedAll();
