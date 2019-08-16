#dev
FROM node:lts-alpine AS develop-stage

# Install alpine stuff
RUN apk add --no-cache git

WORKDIR /app
RUN npm install -g pm2
COPY ./package*.json ./
RUN npm install

#dev build
FROM develop-stage AS develop-build-stage
COPY . ./
RUN npm run build

#prod build
FROM develop-stage as build-stage
COPY . .
ENV NODE_ENV=production
WORKDIR /app
RUN npm run build
