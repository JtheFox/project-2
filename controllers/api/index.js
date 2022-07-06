//Import required packages and models
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const favoriteRoutes = require('./favorite-routes');
const profileRoutes = require('./profile-routes');
const launchRoutes = require('./launch-routes');

//Routes for url 
router.use('/users', userRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/profile', profileRoutes);
router.use('/launch', launchRoutes);

module.exports = router;