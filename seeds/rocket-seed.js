//Import Rocket model 
const { Rocket } = require('../models');
const fetch = require('node-fetch');
const { parseRocketData } = require('../utils/helpers');

//Insert favorite into the database 
const seedRockets = async () => {
    if (!process.env.ROCKET_LIST) {
        console.log('No rockets found');
        return;
    } 

    const rocketData = [];
    process.env.ROCKET_LIST.forEach(rocketID => {
        const response = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketID}`);
        const rocket = await response.json();
        rocketData.push(parseRocketData(rocket));
    });

    Rocket.bulkCreate(rocketData);
}

//Export seeded rockets
module.exports = seedRockets;