# Use Node 22 Alpine
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install build dependencies for LightningCSS native module
RUN apk add --no-cache python3 make g++ bash git libc6-compat


# Copy package files first (for caching)
COPY package.json package-lock.json* ./
# Copy .env for environment variables
COPY .env .

# Copy prisma folder before install/generate
COPY prisma ./prisma

# Install dependencies and force rebuild native modules
RUN npm install --force
RUN npx prisma generate

# Copy the rest of the app (excluding node_modules)
COPY . .

# Expose Next.js dev port
EXPOSE 3000

# Run Next.js dev server
CMD ["npm", "run", "dev"]