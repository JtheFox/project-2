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

// // POST query launch
//   router.post('/query/', function (req, res) {
//     try {
//       const launchData = await Launch.findByPk(req.params.id);
//       if (!launchData) {
//         res.status(404).json({ message: 'No Launch with this id!' });
//         return;
//       }
//       res.status(200).json(launchData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;
