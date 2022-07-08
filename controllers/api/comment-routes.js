//Import required packages and files 
const router = require("express").Router();
const { User, Launch, Comment } = require("../../models");
const withAuth = require("../../utils/auth");


// get comments
router.get('/', async (req, res) => {
    try {
        const findComment = await Comment.findAll();
        res.json(findComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// post new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const createComment = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            launch_id: req.body.launch_id
        })
        res.json(createComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Export router
module.exports = router;