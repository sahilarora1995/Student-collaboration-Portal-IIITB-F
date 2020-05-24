FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
#RUN npm install - Net issues removing this
ADD src /usr/src/app/src
ADD public /usr/src/app/public
ADD node_modules /usr/src/app/node_modules
CMD ["npm", "start"]
