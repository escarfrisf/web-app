# base image
FROM node:11.12.0-alpine

# estableciendo directorio de trabajo
WORKDIR /usr/src/app

# agregano '/usr/src/app/node_modules/.bin' a $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Instalando y haciendo caché a las dependencias de la app
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci
RUN npm install react-scripts@2.1.8 -g --silent

# iniciando la app
CMD ["npm", "start"]
