import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL || process.env.PROD_DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the database');
});

export default pool;

// require('make-runnable');
