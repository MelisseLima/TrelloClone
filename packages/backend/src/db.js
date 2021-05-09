const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const pg = require("pg");
const config = require("./config/database");

pg.types.setTypeParser(1082, "text", (text) => text);
pg.types.setTypeParser(1184, "text", (text) => text);
pg.types.setTypeParser(1114, "text", (text) => text);

const db = {};

const sequelize = new Sequelize({
  database: config.development.database,
  username: config.development.username,
  password: config.development.password,
  host: config.development.config.host,
  port: config.development.config.port,
  dialect: config.development.config.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
