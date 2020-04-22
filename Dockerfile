FROM node:lts

WORKDIR /usr/src/app

RUN apt-get update || : && apt-get install python -y

COPY package*.json ./

RUN npm ci

RUN npm i -g tsc

COPY . .

CMD [ "tsc && node ./build/server.js"]