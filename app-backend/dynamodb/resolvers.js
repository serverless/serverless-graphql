// add to handler.js
import dynamodb from 'serverless-dynamodb-client';

let docClient;

if (process.env.NODE_ENV === 'production') {
  const AWSXRay = require('aws-xray-sdk'); // eslint-disable-line global-require
  const AWS = AWSXRay.captureAWS(require('aws-sdk')); // eslint-disable-line global-require
  docClient = new AWS.DynamoDB.DocumentClient();
} else {
  docClient = dynamodb.doc;
}

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

const data = {
  getPaginatedTweets(handle, args) {
    return promisify(callback => {
      const params = {
        TableName: 'Tweets',
        KeyConditionExpression: 'handle = :v1',
        ExpressionAttributeValues: {
          ':v1': handle,
        },
        IndexName: 'tweet-index',
        Limit: args.limit,
        ScanIndexForward: false,
      };

      if (args.nextToken) {
        params.ExclusiveStartKey = {
          tweet_id: args.nextToken.tweet_id,
          created_at: args.nextToken.created_at,
          handle: handle,
        };
      }

      docClient.query(params, callback);
    }).then(result => {
      const tweets = [];
      let listOfTweets;

      console.log(result);

      if (result.Items.length >= 1) {
        listOfTweets = {
          items: [],
        };
      }

      for (let i = 0; i < result.Items.length; i += 1) {
        tweets.push({
          tweet_id: result.Items[i].tweet_id,
          created_at: result.Items[i].created_at,
          handle: result.Items[i].handle,
          tweet: result.Items[i].tweet,
          retweet_count: result.Items[i].retweet_count,
          retweeted: result.Items[i].retweeted,
          favorited: result.Items[i].favorited,
        });
      }

      listOfTweets.items = tweets;

      if (result.LastEvaluatedKey) {
        listOfTweets.nextToken = {
          tweet_id: result.LastEvaluatedKey.tweet_id,
          created_at: result.LastEvaluatedKey.created_at,
          handle: result.LastEvaluatedKey.handle,
        };
      }

      return listOfTweets;
    });
  },
  getUserInfo(args) {
    return promisify(callback =>
      docClient.query(
        {
          TableName: 'Users',
          KeyConditionExpression: 'handle = :v1',
          ExpressionAttributeValues: {
            ':v1': args.handle,
          },
        },
        callback
      )
    ).then(result => {
      let listOfTweets;

      if (result.Items.length >= 1) {
        listOfTweets = {
          name: result.Items[0].name,
          handle: result.Items[0].handle,
          location: result.Items[0].location,
          description: result.Items[0].description,
          followers_count: result.Items[0].followers_count,
          friends_count: result.Items[0].friends_count,
          favourites_count: result.Items[0].favourites_count,
          following: result.Items[0].following,
        };
      }

      return listOfTweets;
    });
  },
};
// eslint-disable-next-line import/prefer-default-export
export const resolvers = {
  Query: {
    getUserInfo: (root, args) => data.getUserInfo(args),
  },
  User: {
    tweets: (obj, args) => data.getPaginatedTweets(obj.handle, args),
  },
};
