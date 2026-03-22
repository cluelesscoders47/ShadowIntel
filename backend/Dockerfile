# Use the official lightweight Node.js image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the engine source code
COPY . .

# Expose the AI Engine port
EXPOSE 5000

# Start the ShadowIntel Brain
CMD ["node", "server.js"]
