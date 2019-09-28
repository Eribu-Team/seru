// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    },
    migrations: {
      directory: `${__dirname}/../database/migrations/`,
      tableName: "migrations",
    },
    seeds: {
      directory: `${__dirname}/../database/seeds/`,
      tableName: "seeds",
    },
  },
};
