FROM node:20-alpine

WORKDIR /app

# Copy all files
COPY . .

# Install dependencies
RUN npm install

# Build backend and frontend
RUN npm run build

# Expose port
EXPOSE 5000

# Start command
CMD ["npm", "start"]

