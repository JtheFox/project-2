const router = require('express').Router();
const { Launch } = require('../models');

//GET method to display the search page
router.get('/', async (req, res) => {
    res.render('search');
});

//POST method to be able to search the launches
router.post('/', async (req, res) => {
    try {
        // check if searching by id or name
        if (/[a-z\d]{24}/.test(req.body.query)) {
            const dbLaunchData = await Launch.findByPk(req.body.query);
            if (!dbLaunchData) {
                res.status(404).json({ message: 'No launch found with this id' });
                return;
            }
            const launch = dbLaunchData.get({ plain: true });
            res.render('launch-page', { launch, loggedIn: req.session.loggedIn });
        } else {
            const dbLaunchData = await Launch.findAll({
                where: {
                    name: {
                        [Op.substring]: req.body.query
                    }
                }
            });
            if (!dbLaunchData) {
                res.status(404).json({ message: 'No launch found matching this name!' });
                return;
            }
            const launches = dbLaunchData.map(post => post.get({ plain: true }));
            if (dbLaunchData.length === 1) res.render('launch-page', { launch: launches[0], loggedIn: req.session.loggedIn });
            else res.render('homepage', { launches, loggedIn: req.session.loggedIn })
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