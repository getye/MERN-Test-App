# Step 1: Use an official Node.js runtime as a parent image
FROM node:21-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application to the container
COPY . .

# Step 6: Expose the port your backend server runs on
EXPOSE 5000

# Step 7: Start the backend server
CMD ["npm", "run", "dev"]
