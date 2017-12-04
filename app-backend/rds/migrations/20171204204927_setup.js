exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(t) {
      t
        .increments('id')
        .unsigned()
        .primary();
      t.string('name').notNull();
      t.string('screen_name').notNull();
      t.string('location').notNull();
      t.string('description').notNull();
      t.integer('followers_count').notNull();
      t.integer('friends_count').notNull();
      t.integer('favourites_count').notNull();
    })
    .then(() => {
      return knex.schema.createTable('posts', function(t) {
        t
          .increments('id')
          .unsigned()
          .primary();
        t.string('tweet').notNull();
        t.integer('userId').notNull();
      });
    });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('posts'),
  ]);
};
