FROM node:22.18.0-alpine3.21 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

CMD ["npx", "ts-node", "dist/http/app.js"]