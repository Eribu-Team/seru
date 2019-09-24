export default {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "antek",
      database: "frameworkwatch",
    },
    migrations: {
      directory: `${__dirname}/../database/migrations/`,
      tableName: "migrations",
    },
  },
};
