import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.DATABASE;
if (!connectionString) {
  throw new Error('No database connection string was provided to neon(). Set DATABASE_URL or DATABASE in .env');
}

const sql = neon(connectionString);
export default sql;

