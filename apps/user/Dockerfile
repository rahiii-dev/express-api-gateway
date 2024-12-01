FROM node:21-alpine AS base

FROM base AS builder

WORKDIR /app
RUN npm install -g turbo
COPY . .

RUN turbo prune user --docker

FROM base AS installer

WORKDIR /app

COPY --from=builder /app/out/json/ . 

RUN npm install

COPY --from=builder /app/out/full/ . 

RUN npm run build

FROM base AS runner

WORKDIR /app

COPY --from=installer /app ./

CMD [ "node", "apps/user/dist/server.js" ]
