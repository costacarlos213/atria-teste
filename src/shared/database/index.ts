import { Pool, PoolClient } from 'pg';

const pool = new Pool({
  user: process.env.PG_USER || 'postgres',
  host: process.env.PG_HOST || 'localhost',
  database: process.env.PG_DATABASE || 'postgres',
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || '5432', 10),
});

async function createConnection(): Promise<PoolClient> {
  const client = await pool.connect();

  await client.query('SELECT NOW();');

  return client;
}

export { createConnection };
