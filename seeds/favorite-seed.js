//Import Favorite model 
const { Favorite } = require('../models');

//Create a list of favorite models
const favoritesData = [
    {
        "launch_id": 1,
    },
    {
        "launch_id": 2,
    },
    {
        "launch_id": 3,
    },
    {
        "launch_id": 4,
    },
    {
        "launch_id": 5,
    },
    {
        "launch_id": 6,
    },
];

//Insert favorite into the database 
const seedFavorites = () => Favorite.bulkCreate(favoritesData);

//Export seeded favorites
module.exports = seedFavorites;