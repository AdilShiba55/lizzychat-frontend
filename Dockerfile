# Stage 1: Build
FROM node:18.13.0-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Ensure the .env.production is used during the build
COPY .env.prod .env

# Build the application for production
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Copy the built files from the previous stage to nginx's web directory
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create the ssl directory in the container
RUN mkdir /etc/nginx/ssl

# Copy SSL certificates to the container
COPY ssl/www_lizzychat_com.crt /etc/nginx/ssl/www_lizzychat_com.crt
COPY ssl/server.key /etc/nginx/ssl/server.key

# Expose ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]