// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing movies into DynamoDB. Please wait.');

const allUsers = JSON.parse(fs.readFileSync('users.json', 'utf8'));

allUsers.forEach(function(user) {
  const params = {
    TableName: 'users',
    Item: {
      name: user.name,
      screen_name: user.screen_name,
      location: user.location,
      description: user.description,
      followers_count: user.followers_count,
      friends_count: user.friends_count,
      favourites_count: user.favourites_count,
      posts: user.posts,
    },
  };

  docClient.put(params, function(err, data) {
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
