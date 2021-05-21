const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const handleError = require('../../utils/handleError');
const withAuth = require('../../utils/withAuth');

router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    foreignKey: 'post_id',
                    include: [{ model: User, foreignKey: 'user_id' }],
                },
                {
                    model: User,
                    foreignKey: 'user_id',
                },
            ],
        });
        const posts = postsData.map((e) => e.get({ plain: true }));

        console.log(posts);

        res.render('home', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        handleError(req, res, err);
    }
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login', { loggedIn: req.session.loggedIn });
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { name: req.session.name },
        });

        const user_id = req.session.user.id ?? userData.id;

        const postsData = await Post.findAll({
            where: { user_id },
        });

        const posts = postsData.map((e) => e.get({ plain: true }));

        res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        handleError(req, res, err);
    }
});

router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const postData = await Post.findByPk(id, {
            include: [
                { model: User, foreignKey: 'user_id' },
                {
                    model: Comment,
                    foreignKey: post_id,
                    include: [{ model: User, foreignKey: 'user_id' }],
                },
            ],
        });

        const post = postData.get({ plain: true });

        console.log(post);

        res.render('onepost', {
            post,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        handleError(req, res, err);
    }
});

module.exports = router;
