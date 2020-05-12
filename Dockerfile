FROM node:lts
# Env
ENV NODE_ENV dev
ENV NODE_CONFIG_ENV dev
ENV PORT 5000

WORKDIR /usr/src/app

COPY package.json .
RUN npm install
ADD . /usr/src/app

# Start
CMD [ "npm", "start" ]

EXPOSE 5000