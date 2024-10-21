#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker and try again."
    exit 1
fi

# Check if Prisma CLI is installed
if ! command -v prisma &> /dev/null; then
    echo "Prisma CLI is not installed. Installing it now..."
    npm install -g prisma
fi

# Set up environment variables
DB_NAME="pokeapi"
DB_USER="postgres"
DB_PASSWORD="postgres"
DB_PORT="5432"

# Update .env file
echo "Updating .env file..."
echo "DATABASE_URL=\"postgresql://$DB_USER:$DB_PASSWORD@localhost:$DB_PORT/$DB_NAME?schema=public\"" > .env

# Start PostgreSQL container
echo "Starting PostgreSQL container..."
docker run --name pokeapi-postgres -e POSTGRES_DB=$DB_NAME -e POSTGRES_USER=$DB_USER -e POSTGRES_PASSWORD=$DB_PASSWORD -p $DB_PORT:5432 -d postgres:14

# Wait for the container to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 10

# Import the SQL dump
echo "Importing SQL dump..."
docker exec -i pokeapi-postgres psql -U $DB_USER -d $DB_NAME < pokeapi_dump.sql

# Generate Prisma schema
echo "Generating Prisma schema..."
prisma db pull

echo "Local development environment setup complete!"
