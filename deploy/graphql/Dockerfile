FROM node:18
WORKDIR /app

RUN mkdir source
COPY src ./source/src
COPY tsconfig.json ./source
COPY tsconfig.build.json ./source
COPY package.json ./source
COPY package.json ./

RUN cd source && npm i && npm run build

RUN mv ./source/build/src ./
RUN npm i --omit=dev

RUN rm -rf source

EXPOSE 5051
CMD ["npm", "start"]