FROM node:19
WORKDIR /front
COPY ./front /front
EXPOSE 3000
ENV CI=true