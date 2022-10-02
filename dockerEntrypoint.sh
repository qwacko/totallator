#!/bin/sh

echo "Starting Load"
cd /app

echo "Installing Dependencies"
npm install

echo "Building Server"
npm run build

echo "Updating DB"
npx prisma migrate deploy

echo "Starting Server"
node build/index.js