# Multi-stage build for Angular

# ========== Stage 1: Build ==========
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies with best layer cache
COPY package*.json ./
RUN npm ci

# Copy the rest (node_modules is ignored via .dockerignore)
COPY . .

# Build (use package script; fallback to npx if script can't find ng)
# Keep as-is if your package.json has: "build": "ng build --configuration production"
RUN npm run build || npx @angular/cli@latest ng build --configuration production

# ========== Stage 2: Serve with Nginx ==========
FROM nginx:alpine

# Option A (recommended): copy the entire dist/ to html/
# Works for Angular outputs like:
# - dist/<project>/
# - dist/<project>/browser (Angular 17+ with builder)
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# If you know your exact folder (check angular.json "outputPath"),
# you can do:
# COPY --from=builder /app/dist/<your-project-name>/ /usr/share/nginx/html/
# or, for Angular 17+ default: /app/dist/<your-project-name>/browser/

# Nginx config for SPA (fallback to index.html)
COPY nginx-spa.conf /etc/nginx/conf.d/default.conf

# Set safe permissions in one layer
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]