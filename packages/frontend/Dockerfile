
# build environment
FROM node:13.12.0-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./

RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# new
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE $REACT_APP_PORT

CMD sed -i -e 's/$REACT_APP_PORT/'"$REACT_APP_PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'