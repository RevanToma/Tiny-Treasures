# JS Runtime
FROM node:19-alpine3.16

WORKDIR /backend

COPY backend .

RUN npm install

CMD ["npm", "run", "start:prod"]
