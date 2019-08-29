#dev
FROM node:lts-alpine

# Install alpine stuff
RUN apk add --no-cache git

COPY ./.docker/wait-for /

WORKDIR /app
COPY ./package*.json ./
RUN npm ci
RUN ls
