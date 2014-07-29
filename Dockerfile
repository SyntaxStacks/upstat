FROM phusion/passenger-nodejs:latest

# Bundle app source
ADD . /opon

# Install app dependencies
RUN cd /opon; npm install

EXPOSE 3000 

CMD ["node", "/opon/server.js"]
