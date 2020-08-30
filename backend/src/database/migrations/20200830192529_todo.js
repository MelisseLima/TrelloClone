exports.up = function (knex) {
  return knex.schema.createTable('todo', (table) => {
    table.string('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.boolean('status').notNullable();
    table.string('list_id').unsigned();
    table.foreign('list_id').references('lists.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('todo');
};
