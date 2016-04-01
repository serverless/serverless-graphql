import Promise from 'bluebird';
import uuid from 'uuid';
import bcryptjs from 'bcryptjs';
import db from '../../../dynamodb';
import authenticate from './auth';

const stage = process.env.SERVERLESS_STAGE;
const projectName = process.env.SERVERLESS_PROJECT;
const usersTable = projectName + '-users-' + stage;

export function create(user) {
  user.id = uuid.v1();
  user.permissions = ['UPDATE_USER', 'DELETE_USER'];

  // generated salted hash with bcryptjs with 10 work factor
  user.password_hash = bcryptjs.hashSync(user.password, 10);

  delete user.password; // don't save plain password!

  return db('put', {
    TableName: usersTable,
    Item: user
  }).then(() => user);
}

export function login({username, password}) {
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
      if (!Item) return Promise.reject('User not found');

      let match = bcryptjs.compareSync(password, Item.password_hash);
      if (!match) return Promise.reject('invalid password');

      delete Item.password_hash;

      Item.token = authenticate(Item);

      return Item;
    });
}

export function get(username) {
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

export function getAll() {
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

export function update(user, obj) {

  // update data
  user.email = obj.email || user.email;
  user.name = obj.name || user.name;
  user.password_hash = bcryptjs.hashSync(obj.password, 10);

  return db('put', {
    TableName: usersTable,
    Item: user
  }).then(() => user);
}

export function remove(user) {

  return db('delete', {
    TableName: usersTable,
    Key: user.username
  });
}
