FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY .. ./
ENV REDIS_HOST="redis"
ENV MONGO_URI='mongodb://mongodb:27017'
RUN npm i
CMD ["npm", "run", "start"]