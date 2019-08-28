#dev
FROM node:lts-alpine AS develop-stage

# Install alpine stuff
RUN apk add --no-cache git

WORKDIR /app
RUN npm install -g pm2
COPY ./package*.json ./
RUN npm install
COPY ./.docker/wait-for /

COPY . .
RUN npm run build
