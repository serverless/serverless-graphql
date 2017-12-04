const json = require('../seed-data/users.json');

const posts = [];
json.forEach((a, index) => {
  a.posts.forEach(element => {
    element.userId = index + 1;
    posts.push(element);
  });
});
const users = json.map(a => {
  delete a.posts;
  return a;
});

exports.seed = function seed(knex) {
  return knex('users')
    .del()
    .then(() => knex('posts').del())
    .then(() => knex('users').insert(users))
    .then(() => knex('posts').insert(posts));
};
