FROM node:23-alpine AS builder

WORKDIR /app

RUN yarn global add pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm run build


FROM node:23-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

RUN yarn global add pnpm && pnpm install --prod

EXPOSE 3000

CMD ["node", "dist/index.js"]
