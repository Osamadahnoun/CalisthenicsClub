const User = require('./User');
const Post = require("./Post");
const Log = require("./Log");


User.hasMany(Post, {
    foreignKey: 'user_id'
  });
  
Post.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Log, {
    foreignKey: 'user_id'
  });
  
Log.belongsTo(User, {
  foreignKey: 'user_id',
});


module.exports = { User, Post, Log };
