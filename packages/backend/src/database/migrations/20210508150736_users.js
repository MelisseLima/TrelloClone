exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('id').primary();
    table.string('username').notNullable().string();
    table.string('password').notNullable().string();
    table.string('email').notNullable().string();
    table.string('createDate').notNullable();
    table.string('lastAltered').notNullable();
    table.string('isActive').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
