module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.db',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
  },
};
