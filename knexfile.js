module.exports = {
  client: "pg",
  connection: {
    host: process.env.DATA_URL,
    port: 5432,
    user: "jab",
    password: process.env.PG_PASSWORD,
    database: "swap_right",
    charset: "utf8",
  },
  seeds: {
    directory: "./seed_data",
  },
};
