import { db_config } from '@config/database';
import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

const migrationFolder = path.resolve(__dirname, '..', 'migrations');

const files = fs.readdirSync(migrationFolder);

const migrations = files.filter(file => file.endsWith('.sql'));

const client = new Client(db_config);

client.connect().then(async () => {
  await client.query('SELECT NOW();');

  const promises = migrations.map(migration => {
    const migrationFilePath = path.resolve(migrationFolder, migration);

    const sql = fs.readFileSync(migrationFilePath, 'utf-8');

    // eslint-disable-next-line no-console
    console.log(`Running migration: ${migration}`);

    return client.query(sql);
  });

  await Promise.all(promises);

  client.end();
});
