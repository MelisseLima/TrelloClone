exports.up = function (knex) {
  return knex.schema.createTable("boards", (table) => {
    table.string("id").primary();
    table.string("name").notNullable().string();
    table.string("owner").notNullable().unsigned();
    table.string("admins").notNullable();
    table.string("users").notNullable();
    table.foreign("owner").references("users.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("boards");
};
