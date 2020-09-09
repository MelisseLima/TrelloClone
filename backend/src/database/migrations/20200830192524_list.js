exports.up = function (knex) {
  return knex.schema.createTable("list", (table) => {
    table.string("id").primary();
    table.string("label").notNullable();
    table.string("index").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("list");
};
