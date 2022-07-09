//Import models
const User = require('./User');
const Launch = require('./Launch');
const Comment = require('./Comment');
const Saved = require('./Saved');

//Relationships between the model 
User.belongsToMany(Launch, {
    through: Saved,
    as: 'savedLaunch',
});

Launch.belongsToMany(User, {
    through: Saved,
    as: 'savedLaunch',
});

Launch.hasMany(Comment, {
    foreignKey: 'launch_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(Launch, {
    foreignKey: 'launch_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

//Export Models 
module.exports = { User, Launch, Comment, Saved }