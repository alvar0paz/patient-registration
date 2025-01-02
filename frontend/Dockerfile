FROM node:18-alpine

RUN corepack enable && corepack prepare pnpm@8.9.0 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "run", "dev", "--", "--host"]
