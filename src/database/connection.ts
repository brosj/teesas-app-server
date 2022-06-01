import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  host: '127.0.0.1',
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default pool;
