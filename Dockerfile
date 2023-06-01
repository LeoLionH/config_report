# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN NODE_ENV=development npm i
COPY . .
RUN npm run build
CMD [ "npm", "run", "start" ]