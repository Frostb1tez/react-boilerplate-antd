FROM node:12-alpine AS build-stage

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build


FROM nginx:alpine as production-stage

WORKDIR /usr/share/nginx/html
#!/bin/sh
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf ./*

COPY --from=build-stage /app/build .

EXPOSE  80

CMD ["nginx", "-g", "daemon off;"]