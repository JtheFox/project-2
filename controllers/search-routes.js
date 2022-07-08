const router = require('express').Router();
const { getNextLaunch } = require('../utils/helpers');
const { Launch } = require('../models');

//GET method to display the search page
router.get('/', async (req, res) => {
    const nextLaunch = await getNextLaunch();
    res.render('search', { nextLaunch, loggedIn: req.session.loggedIn });
});

//POST method to be able to search the launches
router.post('/', async (req, res) => {
    console.log('Searching for', req.body.query)
    try {
        const nextLaunch = await getNextLaunch();
        
        res.status(200).json(search);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Export router
module.exports = router; 