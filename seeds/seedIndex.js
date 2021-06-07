const sequelize = require("../config/index");
const { User, Post, Comment } = require("../db/models");

const userData = require("./userSeed.json");
const postData = require("./postsSeed.json");
const commentData = require("./commentSeed.json");

const seedDb = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData);

  const comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDb();