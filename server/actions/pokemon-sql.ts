'use server';

import { sql } from "@vercel/postgres";


export const pokemonSQLGet = async (query: string) => {
    try {
        const result = await sql.query(`${query}`);
        // Maybe I should have more explicit return types here
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}