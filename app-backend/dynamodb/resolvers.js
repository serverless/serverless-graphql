// add to handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

require('babel-polyfill');

/* eslint comma-dangle: ["error", "always"] */

// add to handler.js
const promisify = foo =>
  new Promise((resolve, reject) => {
    foo((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

const twitterEndpoint = {
  getRawTweets(args) {
    promisify(callback =>
      dynamoDb.get(
        {
          TableName: process.env.DYNAMODB_TABLE,
          Key: { firstName },
        },
        callback
      )
    )
      .then(result => {
        if (!result.Item) {
          return firstName;
        }
        return result.Item.nickname;
      })
      .then(name => `Hello, ${name}.`);
  },
};

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getTwitterFeed: (root, args) => twitterEndpoint.getRawTweets(args),
  },
};
