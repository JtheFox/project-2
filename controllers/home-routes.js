//Import required packages and models
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Launch, Rocket, User } = require('../models');

//GET method to get all launches
router.get('/', async (req, res) => {
  try {

    //Find all launch data
    const dbLaunchData = await Launch.findAll({
      attributes: [
        'id',
        'name',
        'date',
        'icon',
        'webcast'
      ]
    });

    //Seralize data
    const launches = dbLaunchData.map(post => post.get({ plain: true }));

    //Render the home page
    res.render('homepage', {
      launches,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET method to show a specific launch when clicked
router.get('/launch/:id', async (req, res) => {
  try {

    //Find the launch by id
    const dbLaunchData = await Launch.findByPk(req.params.id, {
      include: [{ model: Rocket }]
    });

    //If no launch exist, display error
    if (!dbLaunchData) {
      res.status(404).json({ message: 'No launch found with this id' });
      return;
    }

    //Seralize the data
    const launch = dbLaunchData.get({ plain: true });

    //Render the launch page
    res.render('launch-page', { launch, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET method to saved the user choice of launches
router.get('/saved', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id);
    const user = dbUserData.get({ plan: true });
    console.log(user)
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
  res.render('login');
});

//GET method to signup the user
router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

//Export router
module.exports = router;