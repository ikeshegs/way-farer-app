import dotenv from 'dotenv';

dotenv.config();

const databaseConfiguration = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_DATABASE,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT,
    connectionUrl: process.env.DEV_DB_CONNECTION_URL
  }
};

export default databaseConfiguration;
