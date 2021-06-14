const User = require("./user");
const Post = require("./blogPost");
const Comment = require("./comments");

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Post, {
  foreignKey: 'userId'
});

module.exports = {
  User,
  Comment,
  Post
};
