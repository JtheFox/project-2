//Import Comment Model 
const { Comment } = require('../models');

//Create a list of comment 
const commentData = [
    {
        'comment_text': 'that was a good launch',
        'user_id': 1,
        'launch_id': '62a9f0c920413d2695d88712'
    },
    {
        'comment_text': 'that was a great launch',
        'user_id': 2,
        'launch_id': '6243aea5af52800c6e91925c'
    },
    {
        'comment_text': 'that was a ok launch',
        'user_id': 3,
        'launch_id': '62a9f08b20413d2695d88711'
    },
    {
        'comment_text': 'that was a bad launch',
        'user_id': 4,
        'launch_id': '5fe3af43b3467846b324215e'
    }
];

//Insert users into the database
const seedComments = () => Comment.bulkCreate(commentData);

//Export the seeded comments
module.exports = seedComments;