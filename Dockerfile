FROM node:18.12.1-alpine3.15 as build

WORKDIR /

# Install npm packages and cache this layer
COPY package*.json /
RUN npm install

# Build copy all source files and build React app
COPY ./ /
RUN npm run build

FROM nginx:1.23

# Move all build files to NGINX serve folde
COPY --from=build /build /usr/share/nginx/html

# Setup NGINX with config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
