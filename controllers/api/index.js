//Import required packages and models
const router = require('express').Router();
const userRoutes = require('./user-routes.js');

//Routes for url 
router.use('/users', userRoutes);

module.exports = router;