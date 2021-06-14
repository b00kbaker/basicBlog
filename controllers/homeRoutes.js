const router = require('express').Router();const connect= require("../config/index");
const { Post, User, Comment } = require("../db/models");
const withAuth = require("../utils/auth");


// Homepage route (view all posts, READ only)
router.get('/', (req, res) => {
     {
      // GET every post and join with user
      Post.findAll({
        attributes:[ "id", "title", "content", "date_created", "user_id"],
        include: [
          {
            model: User,
            attributes: ['user_name'],
          },
          { model: Comment,
            attributes: ["id", "name", "message", "date_created", "user_id"],
           },
        ],
      })
      .then(blogData => {
      const posts = blogData.map(post => post.get({ plain: true }));
      console.log(posts);  
      res.render('homepage', {
        logged_in: req.session.logged_in,
        posts,
      });
      })
     .catch (err => {
      res.status(500).json(err);
      });
    };
});

  
// Login route 
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});
  
// Register route 
router.get('/register', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('register');
});
  
//  Single Comment route? Here or API folder?
router.get('/comment/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment }],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('comment', {
        ...post,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
// Single blogPost route
router.get('/post/:id', (req, res) => {
     Post.findOne({
     where: { id: req.params.id },
     attributes: [ "id", "title", "content", "date_created", "user_id"],
     include: [
      {
        model: User,
        attributes: ['user_name'],
      },
      { model: Comment,
        attributes: ["id", "name", "message", "date_created", "user_id"],
       },
    ],
  })
  .then (postData => {
    if(!postData) {
      res.status(404).json({ message: "No post with this id exists" })
      return;
    }
    const post = postData.get({ plain: true });
     res.render('view-single', {
      logged_in: req.session.logged_in,
      post
      });
    })
     .catch (err => {
      res.status(500).json(err);
    });
});
  
// Edit a single blogPost route? Here or in API folder?
router.get('/edit/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment }],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('edit', {
        ...post,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
module.exports = router;