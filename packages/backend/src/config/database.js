module.exports = {
  development: {
    username: "ywzzbztjmnkyfm",
    password:
      "672f5a0a9df51146da249d6ca1b9ececbf6e7c6ac4f2ca798a8e6a29e4ec8136",
    database: "d9r3i78mkq0pol",
    logging: true,
    config: {
      host: "ec2-107-20-15-85.compute-1.amazonaws.com",
      port: 5432,
      dialect: "postgres",
      logging: true,
      dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true,
      },
      timezone: "America/Fortaleza",
      pool: {
        max: 30,
        min: 1,
        idle: 10000,
        acquire: 60000,
        evict: 1000,
      },
    },
  },
};
