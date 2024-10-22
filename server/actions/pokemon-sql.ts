'use server';

import { sql } from "@/db";

// Use sql.query for database operations


export const pokemonSQLGet = async (query: string) => {
    try {
        const result = await sql.query(query);
        return result;
    } catch (error: any) {
        console.error('SQL Error:', error);
        if (error.message.includes('more than one row returned by a subquery used as an expression')) {
            throw new Error('The query returned multiple rows in a subquery where only one was expected. Please modify the query to ensure subqueries return a single result when used in a scalar context.');
        }
        throw error;
    }
}
