const router = require("express").Router();
const { Favorite } = require("../../models");

// GET all Favorites
router.get("/", async (req, res) => {
    try {
      const favoriteData = await Favorite.findAll();
      res.status(200).json(favoriteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Create a new Favorite
router.post("/", async (req, res) => {
    try {
      const newFavorite = await Favorite.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newFavorite);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// UPDATE a Favorite
router.put('/:id', async (req, res) => {
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
router.get('/:id', async (req, res) => {
    try {
      const favoriteData = await Favorite.findByPk(req.params.id);
      if (!favoriteData) {
        res.status(404).json({ message: 'No Favorite with this id!' });
        return;
      }
      res.status(200).json(favoriteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   Delete a Favorite
router.delete("/:id", async (req, res) => {
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
  
      res.status(200).json(favoriteData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;




