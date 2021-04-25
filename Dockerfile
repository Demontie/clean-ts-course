FROM node:14
WORKDIR ./clean-ts-course
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start