//Import Favorite model 
const { Launch } = require('../models');

//Create a list of favorite models
const launchData = [
    {
        "name": "Space Shuttle Program",
        "success": true,
        "date": "",
        "flight-number": 2,
        "icon": "https://media.istockphoto.com/photos/space-shuttle-rocket-launch-in-the-sky-and-clouds-to-outer-space-sky-picture-id1344443930?b=1&k=20&m=1344443930&s=170667a&w=0&h=OFxY7InQfBGsBLkPuUBZECWkS3H9kc3rY1O2FaahXvo=",
        "forum": "https://en.wikipedia.org/wiki/Space_launch",
        "webcast": "https://www.youtube.com/watch?v=zsJpUCWfyPE",
        "wiki": "https://en.wikipedia.org/wiki/Rocket"
    },
    {
        "name": "Apollo Soyuz Test",
        "success": true,
        "date": "",
        "flight-number": 2,
        "icon": "https://media.istockphoto.com/photos/space-shuttle-rocket-launch-in-the-sky-and-clouds-to-outer-space-sky-picture-id1344443930?b=1&k=20&m=1344443930&s=170667a&w=0&h=OFxY7InQfBGsBLkPuUBZECWkS3H9kc3rY1O2FaahXvo=",
        "forum": "https://en.wikipedia.org/wiki/Space_launch",
        "webcast": "https://www.youtube.com/watch?v=zsJpUCWfyPE",
        "wiki": "https://en.wikipedia.org/wiki/Rocket"
    },
    {
        "name": "International Space Station",
        "success": true,
        "date": "",
        "flight-number": 2,
        "icon": "https://media.istockphoto.com/photos/space-shuttle-rocket-launch-in-the-sky-and-clouds-to-outer-space-sky-picture-id1344443930?b=1&k=20&m=1344443930&s=170667a&w=0&h=OFxY7InQfBGsBLkPuUBZECWkS3H9kc3rY1O2FaahXvo=",
        "forum": "https://en.wikipedia.org/wiki/Space_launch",
        "webcast": "https://www.youtube.com/watch?v=zsJpUCWfyPE",
        "wiki": "https://en.wikipedia.org/wiki/Rocket"
    },
    {
        "name": "Space Launch Station",
        "success": true,
        "date": "",
        "flight-number": 2,
        "icon": "https://media.istockphoto.com/photos/space-shuttle-rocket-launch-in-the-sky-and-clouds-to-outer-space-sky-picture-id1344443930?b=1&k=20&m=1344443930&s=170667a&w=0&h=OFxY7InQfBGsBLkPuUBZECWkS3H9kc3rY1O2FaahXvo=",
        "forum": "https://en.wikipedia.org/wiki/Space_launch",
        "webcast": "https://www.youtube.com/watch?v=zsJpUCWfyPE",
        "wiki": "https://en.wikipedia.org/wiki/Rocket"
    }
];

//Insert favorite into the database 
const seedLaunches = () => Launch.bulkCreate(launchData);

//Export seeded favorites
module.exports = seedLaunches;