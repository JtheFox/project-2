//Import Rocket model 
const { Rocket } = require('../models');

//Create a list of favorite models
const rocketData = [
    {
        "name": "SM-65E",
        "first-flight": 02-10-1998,
        "image": "https://media.istockphoto.com/photos/space-shuttle-rocket-launch-in-the-sky-and-clouds-to-outer-space-sky-picture-id1344443930?b=1&k=20&m=1344443930&s=170667a&w=0&h=OFxY7InQfBGsBLkPuUBZECWkS3H9kc3rY1O2FaahXvo=",
        "wiki": "https://en.wikipedia.org/wiki/Rocket",
        "description": "",
        "launch_cost": 10000
    },
    {
        "name": "Thor-Delta",
        "first-flight": 02-10-1998,
        "image": "https://media.istockphoto.com/photos/space-shuttle-rocket-launch-in-the-sky-and-clouds-to-outer-space-sky-picture-id1344443930?b=1&k=20&m=1344443930&s=170667a&w=0&h=OFxY7InQfBGsBLkPuUBZECWkS3H9kc3rY1O2FaahXvo=",
        "wiki": "https://en.wikipedia.org/wiki/Rocket",
        "description": "",
        "launch_cost": 20000
    },
    {
        "name": "Thor-Ablestar",
        "first-flight": 02-10-1998,
        "image": "https://media.istockphoto.com/photos/space-shuttle-rocket-launch-in-the-sky-and-clouds-to-outer-space-sky-picture-id1344443930?b=1&k=20&m=1344443930&s=170667a&w=0&h=OFxY7InQfBGsBLkPuUBZECWkS3H9kc3rY1O2FaahXvo=",
        "wiki": "https://en.wikipedia.org/wiki/Rocket",
        "description": "",
        "launch_cost": 30000
    },
    {
        "name": "Scout",
        "first-flight": 02-10-1998,
        "image": "https://media.istockphoto.com/photos/space-shuttle-rocket-launch-in-the-sky-and-clouds-to-outer-space-sky-picture-id1344443930?b=1&k=20&m=1344443930&s=170667a&w=0&h=OFxY7InQfBGsBLkPuUBZECWkS3H9kc3rY1O2FaahXvo=",
        "wiki": "https://en.wikipedia.org/wiki/Rocket",
        "description": "",
        "launch_cost": 40000
    }
];

//Insert favorite into the database 
const seedRocket = () => Rocket.bulkCreate(rocketData);

//Export seeded favorites
module.exports = seedRocket;