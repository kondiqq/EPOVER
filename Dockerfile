FROM node:lts
# or use `FROM node:<NODEVERSION>` to match a specific Node version
# you have installed locally

USER node
ENV NPM_CONFIG_PREFIX=/home/node/.npm
ENV PATH=$NPM_CONFIG_PREFIX/bin:$PATH

RUN npm i -g @sap/cds-dk