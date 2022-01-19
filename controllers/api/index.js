const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const logRoutes = require('./log-routes');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/logs', logRoutes);


module.exports = router;