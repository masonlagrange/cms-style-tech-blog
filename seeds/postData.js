const Post = require('../models/Post');

const postData = [
  {
    title: 'Why MCV is so important',
    content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    post_date: '2023-04-02',
    author_id: 1
  },
  {
    title: 'Authentication vs. Authorization',
    content: 'There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
    post_date: '2023-03-30',
    author_id: 1
  },
  {
    title: 'Object-Relational Mapping',
    content: "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
    post_date: '2023-04-03',
    author_id: 2
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
