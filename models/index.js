const User = require('./User');
const Post = require('./Post')
const Comment = require('./Comment')

User.hasMany(Post, {
    foreignKey: 'author_id'
})

User.hasMany(Comment, {
    foreignKey: 'author_id'
})

Post.belongsTo(User, {
    foreignKey: 'author_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
})

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
})

Comment.belongsTo(User, {
    foreignKey: 'author_id'
})

module.exports = { User };
