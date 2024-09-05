'use server';

import { google } from "@ai-sdk/google";
import { pokemonSQLGet } from "./pokemon-sql";
import { generateText } from "ai";
import { PRISMA_SCHEMA } from "./constants";


export const generalizedAIPoweredPokemonQuery = async (query: string) => {
    const model = google('gemini-1.5-flash-latest');

    const { text } = await generateText({
        model: model,
        system: `
        You are a Postgres querying expert, who can write incredibly valuable, complex and interesting queries.
        You are also a Pokemon expert, and can answer questions about Pokemon, as someone with a deep understanding of both the brand and the public PokeAPI.
        
        You have access to a Postgres Database, which has all of this data - and now prisma as an ORM gives you a good breakdown of their relationships.

        Given in this insight, you will be given a query in natural language from a user, and all you do is return a postgres compatible query that will be run against the DB.

        Here is the Prisma ORM schema for reference to the fields, tables and relationships:

        \`\`\`
        ${PRISMA_SCHEMA}
        \`\`\`

        When given a natural language question, you just provide a valid postgres query that can be run against the DB.
        When making a query, if it only has one column, consider what additional valuable information you could add, and try to keep the columns to 3 at minimum, 7 maximum.
        `,
        prompt: query,
      });

      // the response will often come with markdown ```sql ...``` - you need to remove the markdown and just return the raw query string
      // handle cases without sql as well
      const parsedText = text.replace('```sql\n', '').replace('\n```', '').replace('```\n', '').replace('\n```', '');

      // ensure rows and fields are plain objects before returning
      const { rows, fields } = await pokemonSQLGet(parsedText);
      
      
    return { rows: JSON.parse(JSON.stringify(rows)), fields: JSON.parse(JSON.stringify(fields)) }
}