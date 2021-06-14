const router = require("express").Router();
const { User, Post, Comment } = require("../../db/models");
// const withAuth = require("../../utils/auth");

// GET find a single user? search bar function?
router.get('/', (req, res) => {
  User.findAll({
      attributes: { exclude: ['password'] }
  })
    .then(userData => res.json(userData))
    .catch(err => {
      res.status(500).json(err);
    });
});

// POST a user to create new entry in DB
router.post('/', (req, res) => {
   User.create({
     user_name: req.body.user_name,
     password: req.body.password
   })
   .then((userData) => {
     req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.user_name = userData.user_name;
        req.session.logged_in = true;
        
        res.json(userData);
      });
   })
   .catch((err) => {
     res.status(500).json(err);
   });  
  
});


// POST login route and process user
router.post('/login', (req, res) => {
    User.findOne({
        where: { user_name: req.body.user_name }
      }).then(userData => {
      if (!userData) {
        res.status(400).json({ message: "Incorrect user name or password, please try again" });
        return;
      }
      const correctPassword = userData.checkPassword(req.body.password);
      if (!correctPassword) {
        res.status(400).json({ message: "Incorrect user name or password, please try again" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.user_name = userData.user_name;
        req.session.logged_in = true;
  
        res.json({ user: userData, message: "You are now logged in!" });
      });
    }); 
});

// POST logout route and end session
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
});

module.exports = router;