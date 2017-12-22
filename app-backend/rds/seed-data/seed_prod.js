const json = require('./users.json');
const pg = require('pg');

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

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
});

knex('users')
  .del()
  .then(() => knex('posts').del())
  .then(() => knex('users').insert(users))
  .then(() => knex('posts').insert(posts));
