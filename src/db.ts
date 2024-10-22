import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

type SqlParameter = string | number | boolean | null;

export const sql = {
  query: async <T = any>(text: string, params?: SqlParameter[]): Promise<QueryResult<T>> => {
    const start = Date.now();
    const res = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  },
  queryRow: async <T = any>(text: string, params?: SqlParameter[]): Promise<T | null> => {
    const { rows } = await pool.query<T>(text, params);
    return rows[0] || null;
  },
  queryRows: async <T = any>(text: string, params?: SqlParameter[]): Promise<T[]> => {
    const { rows } = await pool.query<T>(text, params);
    return rows;
  },
};
