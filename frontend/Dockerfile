# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# install all deps (including devDeps, needed for tsc + vite)
COPY package*.json tsconfig.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Default to local config
ARG NGINX_CONF=nginx.local.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
