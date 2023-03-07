FROM node:alpine
WORKDIR /usr/app
COPY . /usr/app
RUN npm ci
RUN npm run build

COPY /usr/app/dist /var/www/html