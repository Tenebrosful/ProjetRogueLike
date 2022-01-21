FROM node:latest
#Install some dependencies

WORKDIR /usr/app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9999

RUN node serveur.js
# Set up a default command
CMD [ "npm","start" ]