import dotenv from 'dotenv';
import { Pool } from 'pg';
import config from './dbConnect';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';

const { connectionUrl } = config.development;
const pool =
  environment === 'test'
    ? new Pool({ connectionString: process.env.TEST_DATABASE_URL })
    : new Pool({ connectionString: connectionUrl });

export default pool;
