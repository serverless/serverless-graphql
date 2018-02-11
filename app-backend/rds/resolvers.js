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
        })
        .then(user =>
          knex('Tweets')
            .where('handle', user.handle)
            .then(posts => {
              // eslint-disable-next-line no-param-reassign
              user.tweets = { items: posts };
              return user;
            })
        ),
  },
  User: {
    topTweet: obj =>
      knex('Tweets')
        .where('handle', obj.handle)
        .orderBy('retweet_count', 'desc')
        .limit(1)
        .then(tweet => {
          if (!tweet) {
            throw new Error('User not found');
          }
          return tweet[0];
        }),
  },
};
