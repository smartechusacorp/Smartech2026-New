FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies
RUN npm install

# Copy source code
COPY backend ./backend
COPY frontend ./frontend

# Build backend and frontend
RUN npm run build

# Expose port
EXPOSE 5000

# Run migrations and start server
CMD npm run migrate && npm start

