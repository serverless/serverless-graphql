// This is needed in order to get the pg module bundled with webpack
// eslint-disable-next-line
const pg = require('pg');
// eslint-disable-next-line
const mysql = require('mysql');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.db',
    },
  },
  production: {
    client: process.env.DATABASE_TYPE === 'pg' ? 'pg' : 'mysql',
    connection: process.env.DATABASE_URL,
  },
};
