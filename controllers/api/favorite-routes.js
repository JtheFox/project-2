const router = require('express').Router();
const { Favorite } = require('../../models');
const withAuth = require("../utils/auth");

// GET all Favorites
router.get("/", withAuth, async (req, res) => {
    try {
      const favoriteData = await Favorite.findAll();
      res.status(200).json(favoriteData, { loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Create a new Favorite
router.post("/", withAuth, async (req, res) => {
    try {
      const newFavorite = await Favorite.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newFavorite, { loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(400).json(err);
    }
  });

// UPDATE a Favorite
router.put('/:id', withAuth, async (req, res) => {
    try {
      const favoriteData = await Favorite.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!favoriteData[0]) {
        res.status(404).json({ message: 'No Favorite with this id!' });
        return;
      }
      res.status(200).json(favoriteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET one Favorite
router.get('/:id', withAuth, async (req, res) => {
    try {
      const favoriteData = await Favorite.findByPk(req.params.id);
      if (!favoriteData) {
        res.status(404).json({ message: 'No Favorite with this id!' });
        return;
      }
      res.status(200).json(favoriteData, { loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   Delete a Favorite
router.delete("/:id", withAuth, async (req, res) => {
    try {
      const favoriteData = await Favorite.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!favoriteData) {
        res.status(404).json({ message: "No Favorite found with this id!" });
        return;
      }
  
      res.status(200).json(favoriteData, { loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;