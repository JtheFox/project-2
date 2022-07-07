const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Launch, Rocket, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbLaunchData = await Launch.findAll({
      attributes: [
        'id',
        'name',
        'date',
        'icon',
        'webcast'
      ]
    });
    const launches = dbLaunchData.map(post => post.get({ plain: true }));
    res.render('homepage', {
      launches,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/launch/:id', async (req, res) => {
  try {
    const dbLaunchData = await Launch.findByPk(req.params.id, {
      include: [{ model: Rocket }]
    });
    if (!dbLaunchData) {
      res.status(404).json({ message: 'No launch found with this id' });
      return;
    }
    const launch = dbLaunchData.get({ plain: true });
    res.render('launch-page', { launch, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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

router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;