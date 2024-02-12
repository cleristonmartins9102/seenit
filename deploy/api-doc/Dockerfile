FROM node:18
WORKDIR /app

COPY package.json ./

RUN mkdir source
COPY src ./source/src
COPY tsconfig.json ./source
COPY package.json ./source

RUN cd source && npm i && npm run build
RUN mv ./source/build/src ./
RUN npm i --omit=dev
RUN rm -rf source

EXPOSE 5052
CMD ["npm", "start"]

