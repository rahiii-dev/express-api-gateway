FROM node:21.7.1

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV NODE_ENV=production

CMD [ "npm", "start" ]
