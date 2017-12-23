exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(table) {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.string('name').notNull();
      table.string('screen_name').notNull();
      table.string('location').notNull();
      table.string('description').notNull();
      table.integer('followers_count').notNull();
      table.integer('friends_count').notNull();
      table.integer('favourites_count').notNull();
    })
    .then(() => {
      return knex.schema.createTable('posts', function(table) {
        table
          .increments('id')
          .unsigned()
          .primary();
        table.string('tweet').notNull();
        table.integer('userId').notNull();
      });
    });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('posts'),
  ]);
};
