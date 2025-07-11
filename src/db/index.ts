import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

// Only load dotenv in development
if (process.env.NODE_ENV === 'development') {
  const { config } = require('dotenv');
  config({ path: '.env' });
}

export const db = drizzle(sql, { schema });