const router = require('express').Router();
const { User } = require('../../models');

// Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: { username: req.body.username, },
        });

        if (!dbUserData) {
            res.status(400).json({ message: 'Invalid username.' });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid password.' });
            return;
        }

        const user = dbUserData.get({ plain: true });
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

// Logout
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) req.session.destroy(() => res.status(204).end());
    else res.status(404).end();
});

module.exports = router;