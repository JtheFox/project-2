const router = require('express').Router();
const sequelize = require('../config/connection');
const { Launch, Favorite, Profile, User } = require('../models');

router.get('/', (req, res) => {
  Launch.findAll({
    attributes: [
      'id',
      'name',
      'date',
      'icon',
      'webcast'
    ]
  })
  .then(dbLaunchData => {
    const posts = dbLaunchData.map(post => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.get('/launch/:id', (req, res) => {
  Launch.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
          'id',
          'name',
          'success',
          'date',
          'flight_number',
          'icon',
          'forum',
          'webcast',
          'wiki'
    ]
  })
    .then(dbLaunchData => {
      if (!dbLaunchData) {
        res.status(404).json({ message: 'No launch found with this id' });
        return;
      }
      const post = dbLaunchData.get({ plain: true });
      res.render('single-post', {
          post,
          loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
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