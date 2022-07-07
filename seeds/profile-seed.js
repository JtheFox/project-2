//Import Profile model 
const { Profile } = require('../models');

//Create a list of sample profile 
const profileData = [
    {
        'display_name': 'lincolnWales',
        'about': 'I like to learn about space',
        'user_id': 2
    },
    {
        'display_name': 'johnHeight',
        'about': null,
        'user_id': 3
    },
    {
        'display_name': 'mattSawyer',
        'about': 'Space launch is what make me who I am today',
        'user_id': 1
    },
    {
        'display_name': 'maryTate',
        'about': null,
        'user_id': 4
    },
    {
        'display_name': 'susanLee',
        'about': null,
        'user_id': 6
    },
    {
        'display_name': 'allisonRhode',
        'about': 'I love everything and anything about space related things',
        'user_id': 5
    }
];

//Inser user into the database 
const seedProfiles = () => Profile.bulkCreate(profileData);

//Export seeded profile 
module.exports = seedProfiles;