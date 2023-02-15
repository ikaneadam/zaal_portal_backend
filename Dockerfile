FROM node:14-alpine
WORKDIR /usr/app
# update npm
RUN npm install -g npm
# install deps
COPY package*.json ./
RUN npm ci
# copy all files
COPY . .
# build and serve application
CMD npm run start
