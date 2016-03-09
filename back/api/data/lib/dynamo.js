import Promise from 'bluebird';
import AWS from 'aws-sdk';
const dynamoConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.AWS_REGION
};
const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);
const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT_NAME;
const usersTable = projectName + '-users-' + stage;

export function createUser(user) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: usersTable,
      Item: user
    };

    docClient.put(params, function(err, data) {
      if (err) return reject(err);
      return resolve(user);
    });

  });
}

export function updateUser(user) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: usersTable,
      Item: user
    };

    // TODO: validate and fix if not correct
    docClient.put(params, function(err, data) {
      if (err) return reject(err);
      return resolve(user);
    });

  });
}

export function getUsers() {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: usersTable,
      AttributesToGet: [
        'id',
        'name',
        'email'
      ]
    };

    docClient.scan(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Items"]);
    });

  });
}

export function getUser(id) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: usersTable,
      Key: {
        id: id
      },
      AttributesToGet: [
        'id',
        'name'
      ]
    };

    docClient.get(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });

  });
}

