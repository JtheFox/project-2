//Import required packages and models
const router = require('express').Router();
const { Launch } = require('../../models');

router.get('/launches', async (req, res) => {
    const dbLaunchData = await Launch.findAll({});
    res.json(dbLaunchData);
});

module.exports = router;