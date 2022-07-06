//Import required packages and models
const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const favoriteRoutes = require('./favorite-route');
const profileRoutes = require('./profile-route');
const launchRoutes = require('./launch-route');

//Routes for url 
router.use('/users', userRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/profile', profileRoutes);
router.use('/launch', launchRoutes);

module.exports = router;