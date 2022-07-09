const router = require('express').Router();
const { User, Comment, Launch } = require('../../models');

//GET method to get user 
router.get('/', async (req, res) => {
    try {
        //Find all user  
        // TODO: Include Launch model in user query to check if launches are saving to the user
        const dbUserData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                }
            ]
        });
        //Return user in a json data or if none exist, display error
        if (dbUserData) res.status(200).json({ dbUserData });
        else res.status(404).json({ message: 'No user found with this id' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// TODO: create POST route to add launch to a user's saved launches
// router.post('/saved', async (req, res) => {
//     try {
//         //create a new save
//         const createSave = await Launch.findOne({
//             where: { id: req.body.id, },
//         });
//         //Save session the user created
//         req.session.save(() => {
//             req.session.launch.id = createSave;
//             req.session.loggedIn = true;
//             res.json(createSave);
//         });
//     } catch (err) {
//         //Return error if any
//         console.log(err)
//         res.json(err);
//     }
// });

//POST method to create a new user 
router.post("/", async (req, res) => {
    try {
        //Create a new user 
        const createUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        //Save session the user created 
        req.session.save(() => {
            req.session.user_id = createUser.id;
            req.session.loggedIn = true;
            res.json(createUser);
        });
    } catch (err) {
        //Return error if any
        console.log(err)
        res.json(err);
    }
});

//POST method to login the user
router.post('/login', async (req, res) => {
    try {
        //Find user when logging in
        const dbUserData = await User.findOne({
            where: { username: req.body.username, },
        });
        //If not valid, display error
        if (!dbUserData) {
            res.status(400).json({ message: 'Invalid username.' });
            return;
        }
        //Check password to see if it matches
        const validPassword = dbUserData.checkPassword(req.body.password);
        //If not valid, display error
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid password.' });
            return;
        }
        //Seralize data
        const user = dbUserData.get({ plain: true });
        //Save the session 
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = user.id;
            console.log('User Logged In', req.session.cookie);
            res.status(200).json({ message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//POST method to logout a user
router.post('/logout', async (req, res) => {
    req.session.loggedIn ? req.session.destroy(() => res.status(204).end()) : res.status(404).end();
});

//Export router
module.exports = router;