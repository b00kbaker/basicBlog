const router = require("express").Router();

const { Comment } = require("../../db/models");

// POST (create) a new comment
router.post('/', async (req, res) => {
    try {
      const commentData = Comment.create({
        ...req.body,
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(err);
    }
});
  
module.exports = router;