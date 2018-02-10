// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing data into DynamoDB. Please wait.');

const allUsers = JSON.parse(fs.readFileSync('Users.json', 'utf8'));
const allTweets = JSON.parse(fs.readFileSync('Tweets.json', 'utf8'));

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
      following: user.following,
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
});

allTweets.forEach(function(tweet) {
  const Tweetparams = {
    TableName: 'Tweets',
    Item: {
      handle: tweet.handle,
      tweet_id: tweet.tweet_id,
      tweet: tweet.tweet,
      retweeted: tweet.retweeted,
      retweet_count: tweet.retweet_count,
      favorited: tweet.favorited,
      created_at: tweet.created_at,
    },
  };

  docClient.put(Tweetparams, function(err, data) {
    if (err) {
      console.error(
        'Unable to add tweet',
        tweet.tweet_id,
        '. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('PutItem succeeded:', tweet.tweet_id);
    }
  });
});
