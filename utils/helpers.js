//Import required packages
const fetch = require('axios');
const { Launch } = require('../models');

const parseLaunchData = (launch) => {
    return {
        launch_id: launch.id,
        name: launch.name,
        success: launch.success,
        date: launch.date_utc,
        flight_number: launch.flight_number,
        icon: launch.links.patch.large,
        forum: launch.links.reddit.launch,
        webcast: launch.links.webcast,
        wiki: launch.links.wikipedia,
        rocket_id: launch.rocket
    }
}

//Export model 
module.exports = {
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    format_cost: (cost) => {
        return `$${new Intl.NumberFormat({ currency: 'USD' }).format(cost)}`;
    },
    getNextLaunch: async () => {
        const response = await fetch('https://api.spacexdata.com/v5/launches/next');
        const nextLaunch = response.data;
        return { date: nextLaunch.date_utc, forum: nextLaunch.links.reddit.campaign }
    },
    checkNewLaunchData: async () => {
        console.log('Checking for new launch data from the SpaceX API...');
        const dbLastLaunchData = await Launch.findOne({
            attributes: ['date'],
            order: [['date', 'DESC']]
        });
        const lastLaunchDate = new Date(dbLastLaunchData.get({ plain: true }).date);
        const response = await fetch('https://api.spacexdata.com/v5/launches/past');
        const apiLaunchData = await response.data;

        const newLaunchData = apiLaunchData.filter(launch => new Date(launch.date_utc) > lastLaunchDate).map(launch => parseLaunchData(launch));
        if (newLaunchData.length) {
            await Launch.bulkCreate(newLaunchData);
            console.log('Launches updated with new data!');
        } else console.log('No new launches found');
    },
    parseLaunchData,
    getRocketData: async (rocketID) => {
        const response = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketID}`);
        const rocket = await response.data;
        return {
            id: rocket.id,
            name: rocket.name,
            first_flight: rocket.first_flight,
            image: rocket.flickr_images[0],
            wiki: rocket.wikipedia,
            description: rocket.description.substring(0, 254),
            launch_cost: rocket.cost_per_launch
        }
    }
}