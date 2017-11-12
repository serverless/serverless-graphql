// add to handler.js
const AWS = require('aws-sdk');
const dynamodb = require('serverless-dynamodb-client');

require('babel-polyfill');

/* eslint comma-dangle: ["error", "always"] */

const rawClient = dynamodb.raw; // returns an instance of new AWS.DynamoDB()

const docClient = dynamodb.doc; // return an instance of new AWS.DynamoDB.DocumentClient()

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
      rawClient.get(
        {
          TableName: 'users',
          Key: '@sidg_sid',
        },
        callback
      )
    ).then(result => {
      console.log(result);
    });
  },
};

// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getTwitterFeed: (root, args) => twitterEndpoint.getRawTweets(args),
  },
};
