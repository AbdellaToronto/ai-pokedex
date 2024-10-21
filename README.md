# AI Pokedex

This project uses a PostgreSQL database with Prisma ORM.

## Setting up the local development environment

To set up your local development environment, follow these steps:

1. Ensure you have Docker installed on your machine.

2. Clone this repository:
   ```
   git clone git@github.com:AbdellaToronto/ai-pokedex.git
   cd ai-pokedex
   ```

3. Run the setup script:
   ```
   chmod +x setup_local_db.sh
   ./setup_local_db.sh
   ```

   This script will:
   - Start a PostgreSQL container using Docker
   - Import the SQL dump into the container
   - Generate the Prisma schema file
   - Set up the necessary environment variables

4. Once the script completes, your local development environment is ready!

5. You can now run your Next.js application:
   ```
   npm run dev
   ```

## To get a free API key through Google AI Studio, read this!

To access the Gemini API and start building with Google's advanced AI models, you can obtain a free API key through Google AI Studio. Here's a summary of the important steps:

1. Visit [Google AI Studio](https://aistudio.google.com/) to test Gemini models without writing any code.
2. In the top left corner of AI Studio, click on "Get API Key" to generate your Gemini API key.
3. The free tier includes 1,500 requests per day with Gemini 1.5 Flash.
4. You can use this API key in your code to access Gemini models, including Gemini 1.5 Flash and Gemini 1.5 Pro.
5. With just a few lines of code, you can start generating content or creating chat interactions using the Gemini API.

For more detailed information on using the Gemini API, including code examples and pricing details, check out this comprehensive guide: [Everything you need to know about the Gemini API as a developer in less than 5 minutes](https://medium.com/around-the-prompt/everything-you-need-to-know-about-the-gemini-api-as-a-developer-in-less-than-5-minutes-5e75343ccff9).

## Updating the database

If you need to update the database schema or data, you can modify the `pokeapi_dump.sql` file and run the setup script again. It will recreate the Docker container with the updated data.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
