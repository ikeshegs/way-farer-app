import { Pool } from 'pg';
import dotenv from 'dotenv';
import {
  createUsers,
  createBookings,
  createBuses,
  createTrips
} from './createTables';
// import dropQuery from './dropTables';

dotenv.config();

const initializerQuery =
  createUsers + createBuses + createTrips + createBookings;

const pool = new Pool({
  connectionString: process.env.DB_URL || process.env.PROD_DB_URL
});

pool.on('connect', () => {
  console.log('connected to the database');
});

/* const query = (text, params) =>
  new Promise((resolve, reject) => {
    pool
      .query(text, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });

query(initializerQuery, []);
*/
export default pool;

// require('make-runnable');
