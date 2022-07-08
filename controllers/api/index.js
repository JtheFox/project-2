//Import required packages and models
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const testRoutes = require('./test-routes');
const commentRoutes = require('./comment-routes');

//Routes for url 
router.use('/users', userRoutes);
router.use('/', testRoutes);
router.use('/comments', commentRoutes);

//Export router
module.exports = router;