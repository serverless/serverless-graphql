const connection = require('./knexfile');

const knex = require('knex')(
  process.env.NODE_ENV === 'production'
    ? connection.production
    : connection.development
);

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getUserInfo: (root, args) =>
      knex('Users')
        .where('handle', args.handle)
        .then(users => {
          const user = users[0];
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        }),
  },
  User: {
    topTweet: obj =>
      knex('Tweets')
        .where('user_id', obj.user_id)
        .orderBy('retweet_count', 'desc')
        .limit(1)
        .then(tweet => {
          if (!tweet) {
            throw new Error('User not found');
          }
          return tweet[0];
        }),
    tweets: obj =>
      knex
        .select('*')
        .from('Tweets')
        .leftJoin('Users', 'Tweets.user_id', 'Users.user_id')
        .where('handle', obj.handle)
        .then(posts => {
          if (!posts) {
            throw new Error('User not found');
          }
          return { items: posts };
        }),
  },
};
