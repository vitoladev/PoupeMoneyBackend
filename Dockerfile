FROM node:14

ENV PORT=3000

RUN mkdir -p /app
COPY . /app

WORKDIR /app
RUN yarn install

RUN yarn build
EXPOSE 3000
CMD yarn start