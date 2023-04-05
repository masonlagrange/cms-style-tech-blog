const router = require('express').Router();

const userRoutes = require('./user-routes');
const PostCommentRoutes = require('./postComment')

router.use('/users', userRoutes);
router.use('/new-entry', PostCommentRoutes)

module.exports = router;
