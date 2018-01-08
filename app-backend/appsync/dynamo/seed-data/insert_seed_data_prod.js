// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing movies into DynamoDB. Please wait.');

const allUsers = JSON.parse(fs.readFileSync('users.json', 'utf8'));

allUsers.forEach(function(user) {
  const Userparams = {
    TableName: 'Users',
    Item: {
      name: user.name,
      handle: user.handle,
      location: user.location,
      description: user.description,
      followers_count: user.followers_count,
      friends_count: user.friends_count,
      favourites_count: user.favourites_count,
      list_tweets: user.tweetId,
    },
  };

  docClient.put(Userparams, function(err, data) {
    if (err) {
      console.error(
        'Unable to add user',
        user.name,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('PutItem succeeded:', user.name);
    }
  });

  user.tweets.forEach(function(tweet) {
    const Tweetparams = {
      TableName: 'Tweets',
      Item: {
        id: tweet.id,
        tweet: tweet.tweet,
        retweeted: tweet.retweeted,
        retweet_count: tweet.retweet_count,
        favorited: tweet.favorited,
      },
    };

    docClient.put(Tweetparams, function(err, data) {
      if (err) {
        console.error(
          'Unable to add user',
          user.name,
          '. Error JSON:',
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log('PutItem succeeded:', tweet.id);
      }
    });
  });
});
