FROM node:20
WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY public ./public

RUN npm i
EXPOSE 5053
CMD ["npm", "start"]

