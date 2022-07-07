const router = require('express').Router();
const { Launch, Rocket } = require('../models');

router.get('/', (req, res) => {
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

router.get('/launch/:id', (req, res) => {
  try {
    const dbLaunchData = await Launch.findByPk(req.params.id, {
      include: [{ model: Rocket }]
    });
    if (!dbLaunchData) {
      res.status(404).json({ message: 'No launch found with this id' });
      return;
    }
    const launch = dbLaunchData.get({ plain: true });
    res.render('view-launch', {
      launch,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;