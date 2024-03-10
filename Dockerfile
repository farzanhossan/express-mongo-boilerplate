FROM node:18-alpine

WORKDIR /app

COPY . .
COPY .env.example .env

RUN yarn
RUN yarn build

EXPOSE 5050

CMD ["yarn", "start"]