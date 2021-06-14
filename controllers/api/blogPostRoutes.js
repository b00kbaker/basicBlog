const router = require("express").Router();
const { Post, Comment, User } = require("../../db/models");
const withAuth = require("../../utils/auth");

// POST (create) a new blogPost
router.post('/', withAuth, (req, res) => {
   Post.create({
     title: req.body.title,
     content: req.body.content,
     user_id: req.session.user_id
   })
   .then(blogData => res.json(blogData))
    .catch (err => {
      res.status(500).json(err);
    });
});

// GET (read) all blogPosts
router.get('/', (req, res) => {
    Post.findAll({
      attributes:[ "id", "title", "content", "date_created", "user_id"],
      order: [["date_created", "DESC"]],
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
    .then (blogData => res.json(blogData))
    .catch (err => {
      res.status(500).json(err);
    });
});

// GET (read) a blogPost by id
router.get('/:id', (req, res) => {
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
 .then (blogData => {
   if(!blogData) {
     res.status(404).json({ message: "No post with this id exists" })
     return;
   }
   res.json(blogData);
   }) 
   .catch (err => {
      res.status(500).json(err);
    });
});

// PUT (update/edit) a single blogPost defined by id
router.put('/:id', withAuth,(req, res) => {
   Post.update({
     title: req.body.title,
     content: req.body.content
   },
   { where: { id: req.params.id }
   })
   .then(blogData => {
     if(!blogData){
       res.status(404).json({ message: "No post with this id exists" });
       return
      }
      res.json(blogData);
   })
     .catch (err => {
      res.status(500).json(err);
    });
});

// DELETE a single blogPost defined by id
router.delete('/:id', withAuth, (req, res) => {
     Post.destroy({
        where: { id: req.params.id}
      })
      .then(blogData => {
        if(!blogData){
          res.status(404).json({ message: "No post with this id exists" });
          return;
        }
        res.json(blogData);
      })
      .catch (err => {
      res.status(500).json(err);
    });
});

module.exports = router;
  