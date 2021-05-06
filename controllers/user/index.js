const router = require("express").Router();
const handleError = require('../../utils/handleError')

router.get('/', async (req, res) => {

    try {
        const postsData = await null //TODO: ADD BLOG POST DATA QUERY findAll
        console.log(postsData)
        if(!postsData){
            res.render('home');
            return;
        }
        const posts = postsData.map(e => e.get({plain: true}))
        console.log(posts)
        res.render('home', {posts})

    } catch (err) {
        handleError(req, res, err)
    }
})

router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await null //TODO: ADD BLOG POST DATA QUERY findByPk, include Comments
        console.log(postData);
        if(!postData){
            res.redirect('/404')
            return;
        }
        const post = postData.get({plain: true})
        console.log(post)
        res.render('onepost', post)
    } catch (err) {
        handleError(req, res, err)
    }
})

module.exports = router