//Import user model 
const { User } = require('../models');

//Create a list of user 
const userData = [
    {
        'username': 'mattSawyer', 
        'password': 'mattSawyer123',
        'launch_id': '5eb87cdfffd86e000604b331'
    },
    {
        'username': 'lincolnWales',
        'password': 'lincolnWales123',
        'launch_id': '5eb87cdeffd86e000604b330'
    },
    {
        'username': 'johnHeight',
        'password': 'johnHeight123',
        'launch_id': '5eb87ce0ffd86e000604b332'
    },
    {
        'username': 'maryTate', 
        'password': 'maryTate123',
        'launch_id': '5eb87ce5ffd86e000604b339'
    },
    {
        'username': 'allisonRhode',
        'password': 'allisonRhode123',
        'launch_id': '5eb87ce1ffd86e000604b333'
    },
    {
        'username': 'susanLee',
        'password': 'susanLee123',
        'launch_id': '5eb87ce3ffd86e000604b336'
    }
];

//Insert users into the database 
const seedUsers = () => User.bulkCreate(userData);

//Export seeded users
module.exports = seedUsers;