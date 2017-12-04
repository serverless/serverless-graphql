const connection = require('./knexfile');

const knex = require('knex')(connection.development);

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getTwitterFeed: (root, args) =>
      knex('users')
        .where('screen_name', args.handle)
        .then(users => {
          const user = users[0];
          if (!user) {
            throw new Error('User not found');
          }
          return user;
        })
        .then(user =>
          knex('posts')
            .where('userId', user.id)
            .then(posts => {
              // eslint-disable-next-line no-param-reassign
              user.posts = posts;
              return user;
            })
        ),
  },
};
