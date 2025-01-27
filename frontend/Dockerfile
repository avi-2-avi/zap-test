FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

RUN npm install -g http-server

EXPOSE 4200

CMD ["npx", "http-server", "dist/frontend/browser", "-p", "4200", "-a", "0.0.0.0"]
