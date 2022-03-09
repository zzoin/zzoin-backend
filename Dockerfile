FROM node:14

RUN mkdir -p /home/app
WORKDIR /home/app

RUN npm i -g npm 
RUN npm i -g pm2
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm i
COPY ./ ./
RUN npm run build
RUN rm -rf src
RUN rm -rf test

EXPOSE 3000

CMD ["pm2-runtime", "dist/main.js"]