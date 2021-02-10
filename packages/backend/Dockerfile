FROM node:alpine 

WORKDIR /server

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD NODE_URLS=http://*:$PORT npm start
