
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('user_id').primary();
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').notNullable();
      table.string('user_name').notNullable();
      table.string('password').notNullable();
      table.string('postal_code').notNullable();
    })
    .createTable('items', function(table) {
      table.increments('item_id').primary();
      table.integer('user_id').unsigned().notNullable(); 
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('images_url').notNullable();
      table.foreign('user_id').references('user_id').inTable('users');
    })
    .createTable('matches', function(table) {
      table.increments('match_id').primary();
      table.integer('item1_id').unsigned().notNullable(); 
      table.integer('item2_id').unsigned().notNullable(); 
      table.integer('user1_id').unsigned().notNullable(); 
      table.integer('user2_id').unsigned().notNullable(); 
      table.foreign('item1_id').references('item_id').inTable('items');
      table.foreign('item2_id').references('item_id').inTable('items');
      table.foreign('user1_id').references('user_id').inTable('users');
      table.foreign('user2_id').references('user_id').inTable('users');
    })
    .createTable('likes', function(table) {
      table.increments('like_id').primary();
      table.integer('item_id').unsigned().notNullable(); 
      table.integer('user_id').unsigned().notNullable(); 
      table.foreign('item_id').references('item_id').inTable('items');
      table.foreign('user_id').references('user_id').inTable('users');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('likes')
    .dropTable('matches')
    .dropTable('items')
    .dropTable('users');
};