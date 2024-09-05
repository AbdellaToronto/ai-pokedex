'use server';

import { google } from "@ai-sdk/google";
import { pokemonSQLGet } from "./pokemon-sql";
import { generateText, streamText } from "ai";
import { PRISMA_SCHEMA } from "./constants";
import { createStreamableValue } from 'ai/rsc';
import { generateObject } from 'ai';
import { z } from 'zod';


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
      
      
    return { rows: JSON.parse(JSON.stringify(rows)), fields: JSON.parse(JSON.stringify(fields)), query: parsedText }
}


export async function streamAIAnalysis(originalQuestion: string, query: string, results: { rows: any[], fields: any[] }) {
    const model = google('gemini-1.5-flash-latest');
    const stream = createStreamableValue('');

    (async () => {
        const { textStream } = await streamText({
            model: model,
            system: `
            You give a clear and upbeat analysis, sounding kind of like a pokemon announcer, but not too corny.
            A user has given a query to a pokemon database, and you provide an analysis of the data.
            You'll get original request, the postgres query generated for that request, and the results of that query.

            You'll then provide an analysis of the data, in a fun, engaging, and friendly tone.

            You'll also provide a summary of the data in a way that's easy to understand, and provide some insight into what the data means.

            You'll also provide some suggestions for how to improve the query, or what the user could do with the data.
            Use markdown formatting to help.
            `,
            prompt: `
            Original Request: ${originalQuestion}
            ----------------------------------------------
            Postgres Query: ${query}
            ----------------------------------------------
            Query Results: ${JSON.stringify(results)}
            `,
        });

        for await (const delta of textStream) {
            stream.update(delta);
            console.log(delta)
        }

        stream.done();
    })();

    return { output: stream.value };
}


export async function generatePokemonBadge(analysis: string, sqlResult: any) {


const PokemonBadgeSchema = z.object({
    imageUrl: z.string().url().describe('The best potential PokeAPI sprite URL for the Pokemon'),
    header: z.string().describe('The main title for the badge, typically the Pokemon name'),
    subheader: z.string().optional().describe('A subtitle for the badge, could be the Pokemon type or a short description'),
    sections: z.array(z.object({
      content: z.string(),
      scrollable: z.boolean().optional()
    })).max(4).describe('Up to 4 sections of content for the badge'),
    backgroundColor: z.string().optional().describe('A Tailwind CSS background color class'),
    textColor: z.string().optional().describe('A Tailwind CSS text color class'),
    width: z.number().optional(),
    height: z.number().optional()
  });

  const model = google('gemini-1.5-pro-latest', {
    structuredOutputs: false
  });

  const { object } = await generateObject({
    model,
    schema: PokemonBadgeSchema,
    prompt: `
      Based on the following analysis and SQL result, generate a structured object for a Pokemon badge card.
      Choose appropriate colors, content, and a relevant PokeAPI sprite URL.
      
      Analysis: ${analysis}
      
      SQL Result: ${JSON.stringify(sqlResult)}
      
      For the imageUrl, use the format: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/[id].png
      Where [id] is the Pokemon's ID number. If you're unsure of the exact ID, make your best guess based on the data.
      
      Ensure the content is concise and fits well within a small badge card.
    `
  });

  return object;
}