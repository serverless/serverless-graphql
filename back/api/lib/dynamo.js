import Promise from 'bluebird';
import AWS from 'aws-sdk';
import uuid from 'uuid';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const dynamoConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.AWS_REGION
};

const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);
const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const usersTable = projectName + '-users-' + stage;

export function createUser(user) {
  return new Promise(function(resolve, reject) {

    user.id = uuid.v1();

    // save password hash
    user.hash = crypto
      .createHmac("md5", process.env.AUTH_TOKEN_SECRET)
      .update(user.password)
      .digest('hex');

    delete user.password; // don't save plain password!

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

export function loginUser(user) {
  return new Promise(function(resolve, reject) {

    var params = {
      TableName: usersTable,
      Key: {
        id: id
      },
      AttributesToGet: [
        'id',
        'name',
        'email',
        'hash'
      ]
    };

    docClient.get(params, function(err, data) {
      if (err) return reject(err);

      var hash = crypto
        .createHmac("md5", process.env.AUTH_TOKEN_SECRET)
        .update(user.password)
        .digest('hex');

      if (hash != data.Item.hash) reject('invalid password');

      var obj = {
        user: data.Item,
        token: jwt.sign(data.Item, process.env.AUTH_TOKEN_SECRET)
      };

      return resolve(obj);
    });
  });
}

export function updateUser(user) {
  return new Promise(function(resolve, reject) {

    user.hash = crypto
      .createHmac("md5", process.env.AUTH_TOKEN_SECRET)
      .update(user.password)
      .digest('hex');

    delete user.password;

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
        'name',
        'email'
      ]
    };

    docClient.get(params, function(err, data) {
      if (err) return reject(err);
      return resolve(data["Item"]);
    });

  });
}

export function deleteUser(id) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: usersTable,
      Key: {
        id: id
      }
    };

    docClient.delete(params, function(err, data) {
      if (err) return reject(err);
      return resolve();
    });

  });
}
