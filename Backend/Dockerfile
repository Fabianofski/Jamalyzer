FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY .. ./

ENV REDIS_HOST="redis"
ENV MONGO_HOST='mongodb:27017'
ENV NODE_ENV='PRODUCTION'

RUN npm i
CMD ["npm", "run", "start"]