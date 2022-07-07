//Import Favorite model 
const { Favorite } = require('../models');

//Create a list of favorite models
const favoritesData = [
    {
        'launch_id': '5eb87cd9ffd86e000604b32a',
    },
    {
        'launch_id': '5eb87cdcffd86e000604b32',
    },
    {
        'launch_id': '5eb87ce0ffd86e000604b332',
    },
    {
        'launch_id': '5eb87ce1ffd86e000604b334',
    },
    {
        'launch_id': '5eb87ce2ffd86e000604b335',
    },
    {
        'launch_id': '5eb87ce7ffd86e000604b33b',
    },
];

//Insert favorite into the database 
const seedFavorites = () => Favorite.bulkCreate(favoritesData);

//Export seeded favorites
module.exports = seedFavorites;