FROM node:20.14-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:20.14-alpine AS deployer
WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

ENV BODY_SIZE_LIMIT=100000000
ENV NODE_ENV=production

EXPOSE 4545

# Utilise build/index.js ou build/handler.js selon ton setup
CMD [ "node", "build/index.js" ]
