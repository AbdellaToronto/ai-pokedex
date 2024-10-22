import { sql as VercelPgDatabase } from '@vercel/postgres';

declare module '@/db' {
  export const sql: typeof VercelPgDatabase;
}
