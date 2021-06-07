const router = require("express").Router();
const userRoutes = require("./userRoutes");
const commentsRoutes = require("./commentsRoutes");
const blogPostRoutes = require("./blogPostRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentsRoutes);
router.use("/posts", blogPostRoutes);

module.exports = router;