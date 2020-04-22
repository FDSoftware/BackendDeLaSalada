FROM node:lts

WORKDIR /usr/src/app

RUN apt-get update || : && apt-get install python -y

COPY package*.json ./

RUN npm ci

RUN npm i -g ts-node

COPY . .

CMD [ "ts-node ", "src/server.ts" ]