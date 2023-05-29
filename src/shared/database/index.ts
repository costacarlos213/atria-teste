import { db_config } from '@config/database';
import { Pool, PoolClient } from 'pg';

const pool = new Pool(db_config);

async function createConnection(): Promise<PoolClient> {
  const client = await pool.connect();

  await client.query('SELECT NOW();');

  return client;
}

export { createConnection };
