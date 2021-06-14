const router = require('express').Router();
const { Post, Comment, User } = require("../db/models");
const withAuth = require("../utils/auth");

// Dashboard "home" route- view user's posts
router.get('/', withAuth, (req, res) => {
   // GET every post from logged in user
   Post.findAll({
     where: { user_id: req.session.user_id },
     attributes:[ "id", "title", "content", "date_created"],
     include: [
       {
         model: User,
         attributes: ['user_name'],
       },
       { model: Comment,
         attributes: ["id", "name", "message", "date_created", "user_id"],
        }
      ]
   })
   .then(blogData => {
   const posts = blogData.map(post => post.get({ plain: true }));
   console.log(posts);  
   res.render('dashboard', {
     posts,logged_in: true });
   })
  .catch (err => {
   res.status(500).json(err);
   });
});

// Edit a single blogPost route as the verified content creator
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: [ "id", "title", "content", "date_created"],
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
   .then(postData => {
     if (!postData){
       res.status(404).json({ message: "No post with this id exists" });
       return;
     }
   const post = postData.get({ plain: true });
   res.render('edit', {
    post, logged_in: true });
   })
   .catch (err => {
    res.status(500).json(err);
  });
});

// Create a new blogPost
router.get('/new/', withAuth, (req, res) => {
  Post.findAll({
    where: { user_id: req.session.user_id },
    attributes:[ "id", "title", "content", "date_created"],
    include: [
      {
        model: User,
        attributes: ['user_name'],
      },
      { model: Comment,
        attributes: ["id", "name", "message", "date_created", "user_id"],
       }
     ]
  })
  .then(postData =>{
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('create', {posts, logged_in: true });
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

module.exports = router;
