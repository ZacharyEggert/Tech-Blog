const router = require("express").Router();
const apiRoute = require('./api')
const userRoute = require('./user')

router.use('/api', apiRoute);
router.use('/', userRoute)

module.exports = router