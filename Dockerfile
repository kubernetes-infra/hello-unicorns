FROM node:16-alpine

WORKDIR /usr/src/app

ADD ./app /usr/src/app/

CMD [ "node", "index.js" ]
