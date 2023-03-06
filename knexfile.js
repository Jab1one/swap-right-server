module.exports = {
  client: "pg",
  // client: "mysql",
  connection: {
    connectionString: process.env.DATA_URL,
    host : process.env.HOSTNAME,
    port : 5432,
    user : process.env.USERNAME,
    password : process.env.DB_PASSWORD, 
    database : process.env.DATABASE,
    ssl: false
    // host: "127.0.0.1",
    // user: "root",
    // password: "rootroot",
    // database: "swap_right",
    // charset: "utf8"

  },
  migrations: {
    directory: "./migrations",
},
  seeds: {
    directory: "./seed_data",
  }

};

