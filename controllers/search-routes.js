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
        // check if searching by id or name
        if (/[a-z\d]{24}/.test(req.body.query)) {
            const dbLaunchData = await Launch.findByPk(req.body.query);
            if (!dbLaunchData) {
                res.status(404).json({ message: 'No launch found with this id' });
                return;
            }
            const launch = dbLaunchData.get({ plain: true });
            res.render('view-launch', { launch, nextLaunch, loggedIn: req.session.loggedIn });
        } else {
            const dbLaunchData = await Launch.findAll({
                where: {
                    name: {
                        [Op.substring]: req.body.query
                    }
                }
            });
            if (!dbLaunchData) {
                res.status(404).json({ message: 'No results found.' });
                return;
            }
            const launches = dbLaunchData.map(post => post.get({ plain: true }));
            if (dbLaunchData.length === 1) res.render('launch-page', { launch: launches[0], loggedIn: req.session.loggedIn });
            else res.render('homepage', { launches, nextLaunch, loggedIn: req.session.loggedIn })
        }
        const search = await Launch.findAll(req.body.query);
        if (!search) {
            res.status(404).json({ message: 'No search found with this query!' });
            return;
        }
        res.status(200).json(search);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Export router
module.exports = router; 