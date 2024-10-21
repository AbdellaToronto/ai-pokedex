# PokeAPI Project

This project uses a PostgreSQL database with Prisma ORM.

## Setting up the local development environment

To set up your local development environment, follow these steps:

1. Ensure you have Docker installed on your machine.

2. Clone this repository:
   ```
   git clone git@github.com:AbdellaToronto/pokeapi.git
   cd pokeapi
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
