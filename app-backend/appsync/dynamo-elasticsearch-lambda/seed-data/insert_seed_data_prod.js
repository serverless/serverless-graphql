//Insert tweets in ES (cd seed-data)
//curl -s -H "Content-Type: application/json" -XPOST https://xxx.xxx.amazonaws.com/_bulk --data-binary "@Tweets.json"; echo

// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.update({ region: 'us-east-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing data into DynamoDB. Please wait.');

const allUsers = JSON.parse(fs.readFileSync('ESUsers.json', 'utf8'));

allUsers.forEach(function(user) {
  const Userparams = {
    TableName: 'ESUsers',
    Item: {
      name: user.name,
      handle: user.handle,
      location: user.location,
      description: user.description,
      followers_count: user.followers_count,
      friends_count: user.friends_count,
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
