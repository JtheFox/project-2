//Import Comment Model 
const { Comment } = require('../models');

//Create a list of comment 
const commentData = [
    {
        'comment_text': 'that was a good launch',
        'user_id': 1,
        'launch_id': 170
    },
    {
        'comment_text': 'that was a great launch',
        'user_id': 2,
        'launch_id': 169
    },
    {
        'comment_text': 'that was a ok launch',
        'user_id': 3,
        'launch_id': 168
    },
    {
        'comment_text': 'that was a bad launch',
        'user_id': 4,
        'launch_id': 167
    }
];

//Insert users into the database
const seedComments = () => Comment.bulkCreate(commentData);

//Export the seeded comments
module.exports = seedComments;