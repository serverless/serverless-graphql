const udata = require('./Users.json');
const tdata = require('./Tweets.json');
const connection = require('../knexfile');

const knex = require('knex')(connection.production);
const chunkSize = 5000;
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
    .then(() =>
      knex
        .batchInsert('Users', users, chunkSize)
        .returning('user_id')
        .catch(function(error) {
          console.log(error);
        })
    )
    .then(() =>
      knex
        .batchInsert('Tweets', tweets, chunkSize)
        .returning('tweet_id')
        .catch(function(error) {
          console.log(error);
        })
    );
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
