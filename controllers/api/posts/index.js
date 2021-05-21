const router = require('express').Router();
const handleError = require('../../utils/handleError');
const { Post, User, Comment } = require('../../../models');

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.session.user.id;

        const post = await Post.create({ title, content, user_id });
        res.status(200).json(post.get({ plain: true }));
    } catch (err) {
        handleError(err);
    }
});

module.exports = router;
