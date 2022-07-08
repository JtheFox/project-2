//Import required packages and models
const router = require('express').Router();
const { Launch, User, Comment } = require('../../models');

//GET method to get launch
router.get('/launches', async (req, res) => {
    const dbLaunchData = await Launch.findAll({
        attributes: ['id', 'icon', 'name', 'rocket_name', 'date', 'webcast'],
        include: [
          {
            model: Comment,
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ],
        order: [['date', 'DESC']]
      });
    res.json(dbLaunchData);
});

//Export router
module.exports = router;