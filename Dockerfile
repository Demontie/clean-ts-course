FROM node:14
WORKDIR /clean-ts-course/
COPY ./package.json .
RUN npm install --only=prod