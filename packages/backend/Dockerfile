FROM node:13 

WORKDIR /server

COPY . .
RUN npm install

EXPOSE 3333

CMD NODE_URLS=http://*:$PORT npm start
