

module.exports = {
    client: 'postgresql',
    connection: {
      host: process.env.HOSTNAME,
      port: 5432,
      user: process.env.HOSTNAME,
      password: process.env.HOSTNAME,
      database: process.env.HOSTNAME,
      ssl: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    // seeds: {
    //   directory: 'C:/Users/julie/Desktop/Projects/Brainstation Projects/julien-abraham-swapright/swap-right-server/seed_data',
    // },
  };
