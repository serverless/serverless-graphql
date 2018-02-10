const udata = require('./Users.json');
const tdata = require('./Tweets.json');

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../dev.db',
  },
});

const users = udata.map(a => {
  return a;
});

const tweets = tdata.map(a => {
  return a;
});

const insertData = function() {
  return knex('Users')
    .del()
    .then(() => knex('Tweets').del())
    .then(() => knex('Users').insert(users))
    .then(() => knex('Tweets').insert(tweets));
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
