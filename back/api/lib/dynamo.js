import Promise from 'bluebird';
import AWS from 'aws-sdk';
import uuid from 'uuid';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const dynamoConfig = {
  sessionToken:    process.env.AWS_SESSION_TOKEN,
  region:          process.env.AWS_REGION
};

const docClient = new AWS.DynamoDB.DocumentClient(dynamoConfig);
const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const usersTable = projectName + '-users-' + stage;

const db = (method, params) => {
  return Promise.fromCallback(cb => docClient[method](params, cb));
}

export function createUser(user) {
  user.id = uuid.v1();

  // generated salted hash with bcryptjs with 10 work factor
  user.password_hash = bcryptjs.hashSync(user.password, 10);

  delete user.password; // don't save plain password!

  return db('put', {
    TableName: usersTable,
    Item: user
  }).then(() => user);
}

export function loginUser({username, password}) {
  return db('get', {
      TableName: usersTable,
      Key: {username},
      AttributesToGet: [
        'id',
        'name',
        'username',
        'email',
        'password_hash'
      ]
    })
    .then(({Item}) => {
      let match = bcryptjs.compareSync(password, Item.password_hash);
      if (!match) return Promise.reject('invalid password');

      delete Item.password_hash;

      Item.jwt = jwt.sign(Item, process.env.AUTH_TOKEN_SECRET);
      Item.username = "superman"

      return Item;
    });
}

export function updateUser(obj) {
  // make sure user is logged in
  let user = jwt.verify(obj.jwt, process.env.AUTH_TOKEN_SECRET);

  // update data
  user.email = obj.email || user.email;
  user.name = obj.name || user.name;
  user.password_hash = bcryptjs.hashSync(obj.password, 10);

  return db('put', {
    TableName: usersTable,
    Item: user
  }).then(() => user);
}

export function getUsers() {
  return db('scan', {
    TableName: usersTable,
    AttributesToGet: [
      'id',
      'username',
      'name',
      'email'
    ]
  }).then(({Items}) => Items);
}

export function getUser(username) {
  return db('get', {
    TableName: usersTable,
    Key: {username},
    AttributesToGet: [
      'id',
      'username',
      'name',
      'email'
    ]
  }).then(({Item}) => Item);
}

export function deleteUser(obj) {
  let {username} = jwt.verify(obj.jwt, process.env.AUTH_TOKEN_SECRET);

  return db('delete', {
    TableName: usersTable,
    Key: {username}
  });
}
