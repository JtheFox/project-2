const { Launch, Rocket } = require('../models');

// Search launch by name or id
router.post('/', function (req, res) {
    try {
        // check if searching by id or name
        if (/[a-z\d]{24}/.test(req.body.query)) {
            const dbLaunchData = await Launch.findByPk(req.body.query, {
                include: [{ model: Rocket }]
            });
            if (!dbLaunchData) {
                res.status(404).json({ message: 'No launch found with this id' });
                return;
            }
            const launch = dbLaunchData.get({ plain: true });
            res.render('view-launch', { launch, loggedIn: req.session.loggedIn });
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
            if (dbLaunchData.length === 1) res.render('view-launch', { launch: launches[0], loggedIn: req.session.loggedIn });
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