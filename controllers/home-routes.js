//Import required packages and models
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { getRocketData, getNextLaunch } = require('../utils/helpers');
const { Launch, User, Comment } = require('../models');

//GET method to get all launches
router.get('/', async (req, res) => {
  const limit = 10;
  try {
    const page = parseInt(req.query.page) || 1;
    const nextLaunch = await getNextLaunch();
    //Find all launch data
    const dbLaunchData = await Launch.findAll({
      attributes: ['id', 'icon', 'name', 'rocket_name', 'date', 'webcast'],
      order: [['date', 'DESC']],
      limit,
      offset: limit * (page - 1)
    });
    //Serialize data
    const launches = dbLaunchData.map(post => post.get({ plain: true }));
    //Render the home page
    res.render('homepage', {
      launches,
      nextLaunch,
      loggedIn: req.session.loggedIn,
      nextPage: page + 1,
      prevPage: page - 1
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET method to show a specific launch when clicked
router.get('/launch/:id', withAuth, async (req, res) => {
  try {
    const nextLaunch = await getNextLaunch();
    //Find the launch by id
    const dbLaunchData = await Launch.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ],
    });
    //If no launch exist, display error
    if (!dbLaunchData) {
      res.status(404).json({ message: 'No launch found with this id' });
      return;
    }
    //Seralize the data
    const launch = dbLaunchData.get({ plain: true });
    const rocket = await getRocketData(launch.rocket_id);
    //Render the launch page
    res.render('view-launch', { launch, rocket, nextLaunch, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET method to saved the user choice of launches
router.get('/saved', withAuth, async (req, res) => {
  try {
    const nextLaunch = await getNextLaunch();
    const dbUserData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Launch,
          attributes: ['id', 'icon', 'name', 'rocket_name', 'date', 'webcast'],
        }
      ]
    });
    if(!dbUserData.length) {
      res.render('saved', { noResults: true, nextLaunch, loggedIn: req.session.loggedIn });
      return;
    }
    const launches = dbUserData.get({ plain: true }).launches.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();
    res.render('saved', { launches, nextLaunch, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET method to logged in the user
router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', { layout: 'blank' });
});

//GET method to signup the user
router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup', { layout: 'blank' });
});

//Export router
module.exports = router;