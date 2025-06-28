import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from './schema'

export const connectionString = process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/dbname'

export const pool = new Pool({
    connectionString,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

export const db = drizzle(pool, {schema})