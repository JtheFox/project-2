//Import required packages and models
const router = require('express').Router();
const withAuth = require('../utils/auth');
const { getRocketData, getNextLaunch } = require('../utils/helpers');
const { Launch, User, Comment } = require('../models');
const { Op } = require('sequelize');

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
    const user = await User.findByPk(req.session.user_id);
    const isSaved = await user.hasLaunch(dbLaunchData) ? true : false;
    //Seralize the data
    const launch = dbLaunchData.get({ plain: true });
    const rocket = await getRocketData(launch.rocket_id);
    //Render the launch page
    res.render('view-launch', { isSaved, launch, rocket, nextLaunch, loggedIn: req.session.loggedIn });
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
    if (!dbUserData) {
      res.redirect('/login');
      return;
    }
    const launches = dbUserData.get({ plain: true }).launches.sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();
    const noResults = launches?.length ? false : true;
    res.render('saved', { noResults, launches, nextLaunch, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET method to search by name 
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const nextLaunch = await getNextLaunch();
    // render default search page if no query provided
    if (!Object.entries(req.query).length) {
      res.render('search', { nextLaunch, loggedIn: req.session.loggedIn });
      return;
    }
    // redirect on empty query string
    if (!name?.length) {
      res.redirect('/search');
      return;
    }
    // search db 
    const dbSearchData = await Launch.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.substring]: name } },
          { rocket_name: { [Op.substring]: name } }
        ]
      },
      attributes: ['id', 'icon', 'name', 'rocket_name', 'date', 'webcast'],
      order: [['date', 'DESC']]
    });
    if (!dbSearchData.length) {
      res.render('search', { noResults: true, nextLaunch, loggedIn: req.session.loggedIn });
      return
    }
    const launches = dbSearchData.map(search => search.get({ plain: true }));
    res.render('search', { launches, nextLaunch, loggedIn: req.session.loggedIn });
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