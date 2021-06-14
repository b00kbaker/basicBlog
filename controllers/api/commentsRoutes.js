const router = require("express").Router();
const { Comment } = require("../../db/models");
const withAuth = require("../../utils/auth");


// GET (read) all comments
router.get('/', (req, res) => {
  Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST (create) a new comment
router.post('/', withAuth, (req, res) => {
  if (req.session){
  Comment.create({
     message: req.body.message,
     user_id: req.session.user_id,
  })
  .then(commentData => res.json(commentData))
   .catch (err => {
      res.status(400).json(err);
    });
  }
});

// DELETE comment (only the ones created by the validated user)
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
      where: {id: req.params.id}
    })
      .then(commentData => {
        if (!commentData) {
          res.status(404).json({ message: "No comment with this id exists" });
          return;
        }
        res.json(commentData);
      })
      .catch(err => {
        res.status(500).json(err);
      });
});
  
module.exports = router;