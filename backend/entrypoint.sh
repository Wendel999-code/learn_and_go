#!/bin/sh

echo "Running Prisma generate..."
npx prisma generate

echo "Running Prisma migrate..."
npx prisma migrate dev --name init

echo "Starting server..."
npx ts-node-dev --respawn --transpile-only src/index.ts
