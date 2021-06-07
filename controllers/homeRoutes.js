const router = require('express').Router();
const { Post, User, Comment } = require("../db/models");
const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
    try {
      // GET every post and join with user
      const blogData = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['user_name'],
          },
          { model: Comment },
        ],
      });
      
      const posts = blogData.map((post) => post.get({ plain: true }));
      console.log(posts);  
      res.render('homepage', {
        logged_in: req.session.logged_in,
        posts,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
// Dashboard routes
 
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
      const person = userData.get({ plain: true });
      // pass serialized data and session flag into template
      res.render('dashboard', {
        ...person,
        logged_in: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
// Login routes
  
router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
      res.redirect('dashboard');
      return;
    }
    res.render('login');
});
  
// Register routes
  
router.get('/register', async (req, res) => {
    if (req.session.logged_in) {
      res.redirect('dashboard');
      return;
    }
    res.render('register');
});
  
//  Single Comment route
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
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment }],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('post', {
        ...post,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
// Edit a single blogPost route
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