FROM node:18-alpine

RUN corepack enable && corepack prepare pnpm@8.9.0 --activate

WORKDIR /app

COPY package.json ./

RUN pnpm install

COPY . .

RUN mkdir -p uploads && chmod 777 uploads

EXPOSE 3000

CMD ["pnpm", "run", "dev"]