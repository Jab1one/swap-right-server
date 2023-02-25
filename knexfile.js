module.exports = {
  client: "pg",
  connection: {
    host: "postgres://jab:gYDSEDhVbeBCToNP9GgOEdhHjZNUDLjQ@dpg-cft1e8p4reb6ks61dq7g-a.ohio-postgres.render.com/swap_right",
    user: "jab",
    password: process.env.PG_PASSWORD,
    database: "swap_right",
    charset: "utf8",
  },
  seeds: {
    directory: "./seed_data",
  },
};
