module.exports = {
  client: "pg",
  connection: process.env.DATA_URL,
  seeds: {
    directory: "./seed_data",
  },
};
