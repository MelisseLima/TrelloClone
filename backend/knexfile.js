// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./mydb.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: "./mydb.sqlite",
    },
    migrations: {
      directory: "./src/database/migrations",
    },
    useNullAsDefault: true,
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};
