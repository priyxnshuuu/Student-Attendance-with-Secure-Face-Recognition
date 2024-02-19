# Node Block
FROM node:16-alpine as nodework

ARG BUILD_ENV=development

RUN echo ${BUILD_ENV}

RUN mkdir -p /usr/app/
WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

# Nginx Block
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /usr/app/build .
COPY --from=nodework /usr/app/nginx/default.conf /etc/nginx/conf.d