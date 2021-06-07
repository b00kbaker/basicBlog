const router = require("express").Router();
const { Post, Comment, User } = require("../../db/models");

// POST (create) a new blogPost
router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
});

// GET (read) all blogPosts
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [{ model: User }, { model: Comment }],
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// GET (read) a blogPost by id
router.get('/:id', async (req, res) => {
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

// PUT (update/edit) a single blogPost defined by id
router.put('/:id', async (req, res) => {
    try {
      const postData = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(err);
    }
});

// DELETE a single blogPost defined by id
router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
  