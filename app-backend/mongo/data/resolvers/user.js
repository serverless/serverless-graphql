import * as dbUsers from '../mongo/user';

export const userResolver = {
    Query: {
        users: () => dbUsers.getUsers(),
        getUsersForHomepage: () => dbUsers.getUsersForHomePage(),
        getUserById: (_, args) => dbUsers.getUserById(args._id),
        getUserAvailabilityById: (_, args) => dbUsers.getUserAvailabilityById(args._id),
        getUserByUsername: (_, args) => dbUsers.getUserByUsername(args.username)
    },
    Mutation: {
        getUserByEmail: (_, args) => dbUsers.getUserByEmail(args)
    },
};
