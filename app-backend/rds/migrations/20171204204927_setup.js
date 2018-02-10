exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('Users', function(table) {
      table
        .increments('id')
        .unsigned()
        .primary();
      table.string('name').notNull();
      table.string('handle').notNull();
      table.string('location').notNull();
      table.string('description').notNull();
      table.integer('followers_count').notNull();
      table.integer('friends_count').notNull();
      table.integer('favourites_count').notNull();
      table.string('following');
    })
    .then(() => {
      return knex.schema.createTable('Tweets', function(table) {
        table
          .uuid('tweet_id')
          .notNullable()
          .primary();
        table.string('tweet').notNull();
        table.boolean('retweeted').notNull();
        table.integer('retweet_count').notNull();
        table.integer('favorited').notNull();
        table.string('created_at').notNull();
        table.string('handle').notNull();
      });
    });
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('Users'),
    knex.schema.dropTableIfExists('Tweets'),
  ]);
};
