FROM node:8-alpine

WORKDIR /usr/src/app

ADD ./app /usr/src/app/

CMD [ "node", "index.js" ]
