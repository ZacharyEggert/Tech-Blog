const router = require('express').Router();
const handleError = require('../../../utils/handleError');
const { Post, User, Comment } = require('../../../models');

router.post('/comment', async (req, res) => {
    try {
        const { content, post_id } = req.body;
        const user_id = req.session.user.id;

        const comment = await Comment.create({ post_id, content, user_id });
        res.status(200).json(comment.get({ plain: true }));
    } catch (err) {
        handleError(req, res, err);
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.session.user.id;

        const post = await Post.create({ title, content, user_id });
        res.status(200).json(post.get({ plain: true }));
    } catch (err) {
        handleError(req, res, err);
    }
});

router.put('/', async (req, res) => {
    try {
        const { title, content, id } = req.body;
        const user_id = req.session.user.id;

        const post = await Post.update(
            { title, content },
            { where: { id, user_id } }
        );
        if(!post){
            res.status(403).json({message: 'User Error'})
            return
        }
        res.status(200).json({message: 'Updated'});
    } catch (err) {
        handleError(req, res, err);
    }
});

router.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        const user_id = req.session.user.id;

        const post = await Post.destroy({where: {id, user_id}});
        res.status(200).json({message: 'Deleted'})
    } catch (err) {
        handleError(req, res, err);
    }
});

module.exports = router;
