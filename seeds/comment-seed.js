//Import Comment Model 
const { Comment } = require('../models');

//Create a list of comment 
const commentData = [
    {
        'comment_text': 'That was really cool to see!',
        'user_id': 1,
        'launch_id': 171
    },
    {
        'comment_text': 'Awesome!',
        'user_id': 2,
        'launch_id': 170
    },
    {
        'comment_text': 'Can\'t wait to see what\'s next!',
        'user_id': 3,
        'launch_id': 169
    }
];

//Insert users into the database
const seedComments = () => Comment.bulkCreate(commentData);

//Export the seeded comments
module.exports = seedComments;