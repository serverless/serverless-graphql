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

export const resolvers = {
  Query: {
    getContributorFeed: () => contributors,
  },
};
