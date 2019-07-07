import { Pool } from 'pg';
import dotenv from 'dotenv';
import dropQuery from './dropTables';
import createQuery from './createTables';
import config from './config/dbConnect';

dotenv.config();

const { connectionUrl } = config.development;

const dbQuery = `${dropQuery}${createQuery}`;
const pool = new Pool({ connectionString: connectionUrl });

pool
  .connect()
  .then(client => {
    client
      .query(dbQuery)
      .then(() => {
        client.release();
        pool.end();
      })
      .catch(err => {
        /* eslint-disable no-console */
        console.log(err);
        pool.end();
      });
  })
  .catch(error => {
    /* eslint-disable no-console */
    console.log(error);
  });
