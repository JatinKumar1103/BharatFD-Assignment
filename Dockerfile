# Use Node.js 20 as the parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 8000 (your app's running port)
EXPOSE 8000

# Start the server when the container is run
CMD ["npm", "run", "server"]
