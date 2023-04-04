const Comment = require('../models/Comment');

const commentData = [
  {
    content: 'I just learned about this in my class!',
    post_date: '2023-04-03',
    post_id: 1,
    author_id: 2
  }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
