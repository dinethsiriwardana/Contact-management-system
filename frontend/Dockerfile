# Use an official Node runtime as a parent image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React application
RUN npm run build

# Start a new stage for the production image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built files from the previous stage
COPY --from=build /app/build ./build

# Expose port 3000 (default port for serve)
EXPOSE 3000

# Run the command to start the server
CMD ["serve", "-s", "build"]
