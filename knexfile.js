module.exports = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "rootroot",
    database: "swap_right",
    charset: "utf8",
  },
  seeds: {
    directory: "./seed_data",
  },
};
