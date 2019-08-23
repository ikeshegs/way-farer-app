import {
  Pool
} from 'pg';
import dotenv from 'dotenv';
import {
  createUsers,
  createBuses,
  createTrips,
  createBookings
} from './createTables';
import dropTables from './dropTables';

dotenv.config();

const createTables = createUsers + createBuses + createTrips + createBookings;

const pool = new Pool({
  connectionString: process.env.DB_URL ||
    process.env.PROD_DATABASE_URL ||
    process.env.TEST_DATABASE_URL
});

// let connectionUrl = process.env.DB_URL;

// if (process.env.NODE_ENV === 'production') {
//   connectionUrl = process.env.PROD_DATABASE_URL;
// } else if (process.env.NODE_ENV === 'test') {
//   connectionUrl = process.env.TEST_DATABASE_URL;
// }

// const pool = new Pool({
//   connectionString: connectionUrl
// });

pool.on('connect', () => {
  console.log('Connected to WayFarer-db database');
});

// if (process.env.NODE_ENV === 'production') {
//   pool.query(createTables, (err, data) => {
//     if (data) {
//       console.log('Tables created successfully');
//     } else if (err) {
//       console.log(err);
//     }
//   });
// } else if (process.env.NODE_ENV === 'test') {
//   pool.query(dropTables, []);
//   pool.query(createTables, []);
// }

export default pool;

// require('make-runnable');