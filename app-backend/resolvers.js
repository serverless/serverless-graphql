import jwt from 'jsonwebtoken';

const contributors = [
  {
    name: 'Austen',
    location: 'San Francisco',
  },
  {
    name: 'Philipp Muens',
    location: 'San Francisco',
  },
  {
    name: 'Nik Graf',
    location: 'San Francisco',
  },
  {
    name: 'Siddharth Gupta',
    location: 'San Francisco',
  },
];

const users = [
  {
    id: 0,
    name: 'Nik Graf',
  },
];

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    user: (_, __, context) => {
      if (context.userId !== undefined) {
        return users[context.userId];
      }
      return null;
    },
    getContributorFeed: () => contributors,
  },
  Mutation: {
    authenticate: () => {
      const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET);
      return { token };
    },
  },
};
