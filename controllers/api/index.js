const router = require('express').Router();
const handleError = require('../../utils/handleError');
const { Post, User, Comment } = require('../../models');
const postRoutes = require('./posts');

router.use('/posts', postRoutes);

router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ where: { name } });
        if (!user) {
            console.log(user);
            res.status(404).json({
                message: 'No user found with username password combination',
            });
            return;
        }
        const valid = user.checkPassword(password);
        if (!valid) {
            console.log(valid);
            res.status(404).json({
                message: 'No user found with username password combination',
            });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user = user.get({plain: true});
            req.session.name = name;

            res.status(200).json({ message: 'Login successful' });
        });
    } catch (err) {
        handleError(req, res, err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { name, password, email } = req.body;

        let existingUser = User.findOne({ where: { name } });
        if (existingUser) {
            res.status(409).json({
                message: 'Username already taken',
                attr: 'username',
            });
            return;
        }

        existingUser = User.findOne({ where: { email } });
        if (existingUser) {
            res.status(409).json({
                message: 'Email already in use',
                attr: 'email',
            });
            return;
        }

        const user = User.create({ name, email, password });

        console.log(user);
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user = user;
            req.session.name = name;

            res.status(200).json({ message: 'Signup successful' });
        });
    } catch (err) {
        handleError(req, res, err);
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            handleError(req, res, err);
            return;
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

router.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            handleError(req, res, err);
            return;
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

module.exports = router;
