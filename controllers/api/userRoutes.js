const router = require("express").Router();

const { User } = require("../../db/models");

// POST a user to check if logged in and create a session token
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
});

// POST login route and process user
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: { user_name: req.body.user_name },
      });
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect user name or password, please try again' });
        return;
      }
  
      const correctPassword = await userData.checkPassword(req.body.password);
      if (!correctPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect user name or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
    } catch (err) {
      res.status(400).json(err);
    }
});

// POST logout route and end session
router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
      await req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      console.log('user');
      res.status(404).end();
    }
});

module.exports = router;