const data = require('./users.json');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../dev.db',
  },
});

const posts = [];

data.forEach((a, index) => {
  a.posts.forEach(element => {
    element.userId = index + 1;
    posts.push(element);
  });
});

const users = data.map(a => {
  delete a.posts;
  return a;
});

const insertData = function() {
  return knex('users')
    .del()
    .then(() => knex('posts').del())
    .then(() => knex('users').insert(users))
    .then(() => knex('posts').insert(posts));
};

insertData()
  .then(function() {
    console.log('Data Insertion Complete');
  })
  .then(function() {
    process.exit(0);
  })
  .catch(function(error) {
    console.log(error);
  });
