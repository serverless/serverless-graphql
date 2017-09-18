const contributors = [
    {
        name: 'Nik Graf',
        location: 'San Francisco'
    },
    {
        name: 'Siddharth Gupta',
        location: 'San Francisco'
    }
];

export const resolvers = {
    Query: {
        getContributorFeed: () => {
            return contributors;
        },
    },
};