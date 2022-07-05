//Import user model 
const { User } = require("../models");

//Create a list of user 
const userData = [
    {
        "username": "mattSawyer", 
        "password": "mattSawyer123"
    },
    {
        "username": "lincolnWales",
        "password": "lincolnWales123"
    },
    {
        "username": "johnHeight",
        "password": "johnHeight123"
    },
    {
        "username": "maryTate", 
        "password": "maryTate123"
    },
    {
        "username": "allisonRhode",
        "password": "allisonRhode123"
    },
    {
        "username": "susanLee",
        "password": "susanLee123"
    }
];

//Insert users into the database 
const seedUsers = () => User.bulkCreate(userData);

//Export seeded users
module.exports = seedUsers;