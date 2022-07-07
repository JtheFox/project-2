//Import required packages and models
const router = require('express').Router();
const { Launch, Rocket } = require('../../models');

router.get('/exp', async (req, res) => {
    const dbRocketData = await Launch.findAll({ 
        include: [{ model: Rocket,
            attributes: ['name']
        } ]
    });
    res.json(dbRocketData);
});

router.get('/rockets', async (req, res) => {
    const dbRocketData = await Rocket.findAll({});
    res.json(dbRocketData);
});

router.get('/launches', async (req, res) => {
    const dbLaunchData = await Launch.findAll({});
    res.json(dbLaunchData);
});

module.exports = router;