# Use a smaller official Node.js image
FROM node:23-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files and install dependencies (better caching)
COPY package*.json ./

# Install only production dependencies if you're running in production
RUN npm ci --omit=dev

# Copy the rest of the application code
COPY . .

# Run the app on a minimal runtime image (optional but recommended)
FROM node:23-alpine AS runtime

WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app /app

# Expose the desired port
EXPOSE 5000

# Use exec form and specify the default command
CMD ["npm", "start"]
