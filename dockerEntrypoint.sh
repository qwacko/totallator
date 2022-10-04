#!/bin/sh

echo "Starting Load"
cd /app

echo "Installing Dependencies"
pnpm install

echo "Building Server"
pnpm build

echo "Updating DB"
npx prisma migrate deploy

echo "Starting Server"
node build/index.js