const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');
const withAuth = require('../utils/auth')

router.get('/', withAuth, async (req, res) => {
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
  const commentAuthor = await User.findAll({where: {: req.params.id}})
    const postDisplay2 = postDisplay.get({plain: true})
    const commentAuthor2 = commentAuthor.get({plain: true})
    const post = postDisplay2 + commentAuthor2
    console.log(post)
    res.render('post', { 
      post, 
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
