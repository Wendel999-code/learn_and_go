# --- Build stage ---
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package.json and install ALL deps (including dev for TS)
COPY package*.json ./ 
COPY tsconfig.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npm run prisma:generate

# Build TypeScript
RUN npm run build

# --- Production stage ---
FROM node:22-alpine
WORKDIR /app

# Copy only prod dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled code + prisma schema/client
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma 

EXPOSE 3000
CMD ["node", "dist/index.js"]
