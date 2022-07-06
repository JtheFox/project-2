const router = require('express').Router();
const { Launch } = require('../../models');

// GET all Launches
router.get("/", async (req, res) => {
  try {
    const launchData = await Launch.findAll();
    res.status(200).json(launchData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new launch
router.post("/", async (req, res) => {
  try {
    const newLaunch = await Launch.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newLaunch);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a launch
router.put('/:id', async (req, res) => {
    try {
      const launchData = await Launch.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (!launchData[0]) {
        res.status(404).json({ message: 'No Launch with this id!' });
        return;
      }
      res.status(200).json(launchData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 // GET one launch
 router.get('/:id', async (req, res) => {
    try {
      const launchData = await Launch.findByPk(req.params.id);
      if (!launchData) {
        res.status(404).json({ message: 'No Launch with this id!' });
        return;
      }
      res.status(200).json(launchData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   Delete a Launch
router.delete("/:id", async (req, res) => {
  try {
    const launchData = await Launch.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!launchData) {
      res.status(404).json({ message: "No Launch found with this id!" });
      return;
    }

    res.status(200).json(launchData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
