exports.up = function (knex) {
  return knex.schema.createTable("task", (table) => {
    table.string("id").primary();
    table.string("description").notNullable();
    table.string("index").notNullable();
    table.string("list_id").unsigned();
    table.foreign("list_id").references("list.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("task");
};
