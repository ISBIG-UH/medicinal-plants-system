# Use a base image with Node.js pre-installed
FROM node:25-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY BQ.Client/package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY ./BQ.Client/ .

COPY ./BQ.Client/.env.production ./.env.production

# Build the React app
RUN npm run build


# Use Nginx as the base image for serving the production build
FROM nginx:alpine


# Copy the production build files from the build stage to the nginx web root directory
COPY --from=build /app/dist /usr/share/nginx/html

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
