FROM node:20
WORKDIR /app
RUN mkdir public && cd public && mkdir images
RUN mkdir source

COPY tsconfig.json ./source
COPY tsconfig.build.json ./source
COPY package.json ./source
COPY .env ./source

COPY package.json ./
COPY .env ./
COPY src ./source/src

RUN cd source && npm i && npm run build && cp -r ./build/src ../ 
RUN rm -rf source
RUN npm i --omit=dev

EXPOSE 3000
CMD ["npm", "start"]


