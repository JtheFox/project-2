//Import Favorite model 
const { Favorite } = require('../models');

//Create a list of favorite models
const favoritesData = [
    {
        "user_id": 1,
    },
];

//Insert favorite into the database 
const seedFavorites = () => Favorite.bulkCreate(favoritesData);

//Export seeded favorites
module.exports = seedFavorites;