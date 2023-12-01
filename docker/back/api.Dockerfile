FROM node:14

RUN mkdir /srv/back

RUN chown -R node:node /usr/local/lib/node_modules \
    && chown -R node:node /usr/local/bin \
    && chown -R node:node /srv/back

USER node:node

WORKDIR /srv/back
COPY package.json .
RUN npm i


EXPOSE 3000

# CMD ["npm", "run", "start:dev"]