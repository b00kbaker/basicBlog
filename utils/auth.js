const withAuth = (req, res, next) => {
  // was req.session.logged_in
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
};
  
module.exports = withAuth;