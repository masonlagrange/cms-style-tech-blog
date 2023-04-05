const router = require('express').Router();
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');
const dayjs = require('dayjs')

router.post('/new_post', async (req, res) => {
    try { 
        const postData = await Post.create({
        title: req.body.post_title,
        content: req.body.content,
        post_date: dayjs().format('YYYY-MM-DD'),
        author_id: req.session.user,
      });
      // if the post is successfully created, the new response will be returned as json
      res.status(200).json(postData)
    } catch (err) {
      res.status(400).json(err);
    }
    });
  
router.post('/new_comment', async (req, res) => {
    try { 
        console.log(req.session.post_id)
        const commentData = await Comment.create({
        content: req.body.content,
        post_date: dayjs().format('YYYY-MM-DD'),
        post_id: req.session.post_id,
        author_id: req.session.user,
      });
      
      // if the comment is successfully created, the new response will be returned as json
      res.status(200).json(commentData)
    } catch (err) {
      res.status(400).json(err);
    }   
});

module.exports = router