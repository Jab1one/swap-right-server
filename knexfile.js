module.exports = {
  client: "pg",
  connection: {
    connectionString: process.env.DATA_URL,
    host : process.env.HOSTNAME,
    port : 5432,
    user : process.env.USERNAME,
    password : process.env.DB_PASSWORD, database : process.env.DATABASE,
    ssl: {rejectUnauthorized: false}
  },
  seeds: {
    directory: "./seed_data",
  },
};

