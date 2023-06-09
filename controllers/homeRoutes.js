const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try {
    // Get all posts
    const postDisplay = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'id']
        }
      ]
    })

    const posts = postDisplay.map((post) => 
      post.get({plain: true})
    )

    // Pass serialized data into Handlebars.js template
    res.render('homepage', { 
      posts,
      loggedIn:req.session.loggedIn
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get all posts
    const postDisplay = await Post.findAll({
      where: {author_id: req.session.user},
      include: [
        {
          model: User,
          attributes: ['username', 'id']
        }
      ]
    })

    const posts = postDisplay.map((post) => 
      post.get({plain: true})
    )

    // Pass serialized data into Handlebars.js template
    res.render('dashboard', { 
      posts,
      loggedIn:req.session.loggedIn,
      dash:true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/dashboard/new_post', withAuth, async (req, res) => {
  try {
    const postDisplay = await Post.findAll({
      where: {author_id: req.session.user},
      include: [
        {
          model: User,
          attributes: ['username', 'id']
        }
      ]
    })

    const posts = postDisplay.map((post) => 
      post.get({plain: true})
    )

    res.render('dashboard', { 
      posts,
      loggedIn:req.session.loggedIn,
      dash: true,
      newPost: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postDisplay = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'id'],
        },{
          model: Comment,
          attributes: ['content', 'post_date', 'author_id']
        },
     ]
})
    const postDisplay2 = postDisplay.get({plain: true})
    var post
    if (postDisplay2.comments.length != 0) {
      const commentAuthor = await User.findAll({where: {id: postDisplay2.comments[0].author_id}})
      const commentAuthor2 = commentAuthor.map((user) => 
      user.get({plain: true})
    )
      post = {post: postDisplay2, author: commentAuthor2}
      res.render('post', { 
        newComment: true,
        post, 
        loggedIn: req.session.loggedIn
      })
    } else {
      post = postDisplay2
      res.render('post', {
        newComment: true, 
        post, 
        loggedIn: req.session.loggedIn
      })
    }
    req.session.save(() => {
      req.session.post_id = req.params.id,
      res
        .status(200)
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.delete('/dashboard/:id', async (req, res) => {
  try{ 
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    })
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
