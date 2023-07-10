import { createPool } from 'mysql2/promise';
import {
   DB_HOST,
   DB_USER,
   DB_PASSWORD,
   DB_PORT,
   BD_DATABASE,
} from './config.js';

const pool = createPool({
   host: DB_HOST,
   user: DB_USER,
   password: DB_PASSWORD,
   port: DB_PORT,
   database: BD_DATABASE,
});

export default pool;
