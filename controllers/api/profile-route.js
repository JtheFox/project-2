const router = require('express').Router();
const { Profile, User } = require('../../models');

//GET method to get all profile
router.get("/", async (req, res) => {

    try {

        //Find the profile 
        const displayProfile = await Profile.findAll();

        //Return in json file
        res.json(displayProfile);

    } catch (err) {

        //Return error if any
        res.json(err);
    }
});

//GET method to get a profile 
router.get("/:id", async (req, res) => {

    try {

        const findProfile = await Profile.findOne({

            //Find the id correspond to the login
            where: { id: req.params.id },

            //Attribute to include
            attributes: ["id", "display_name", "about", "favorite_id", "user_id"],

            //Model to include
            include: [
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        });

        //Return profile in json
        res.json(findProfile);

    } catch (err) {

        //Return error if any
        res.json(err);
    };
});

//Create a new Profile
router.post("/", async (req, res) => {

    try {

        //Create a profile
        const createProfile = await Profile.create({
            display_name: req.body.display_name,
            about: req.body.about,
            favorite_id: req.body.favorite_id,
            user_id: req.session.user_id
        });

        //Return profile in json  
        res.json(createProfile);

    } catch (err) {

        //Return error if any
        res.json(err);
    }
});

//Update A Profile
router.put("/:id", withAuth, async (req, res) => {

    try {

         //Update a profile
         const createProfile = await Profile.update(
            {
                display_name: req.body.display_name,
                about: req.body.about,
                favorite_id: req.body.favorite_id,
                user_id: req.session.user_id
            },
            {
                where: { id: req.params.id }
            }
        );

        //Return data in json file
        res.json(createProfile);

    } catch (err) {

        //Return error if any
        res.json(err);
    }
});

//Export router
module.exports = router;
