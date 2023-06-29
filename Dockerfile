FROM node:18.16.0-alpine as base
WORKDIR /srv
RUN apk add jq 
COPY package.json pnpm-lock.yaml ./
RUN npm i pnpm@$(jq '.engines.pnpm' package.json  -r) --global
RUN apk del -r jq
RUN pnpm fetch
COPY tsconfig.build.json tsconfig.json src/ ./

FROM base as build
WORKDIR /srv
RUN pnpm i --offline -r
RUN pnpm run build

FROM base as dev
WORKDIR /srv
RUN pnpm i --offline -r
COPY ./src ./src
EXPOSE ${PORT:-3000}
CMD [ "pnpm", "run", "start:dev"]

FROM base as prod
WORKDIR /srv
COPY --from=build /srv/dist .
RUN pnpm i --offline -r --prod --ignore-scripts
RUN pnpm prune -P
EXPOSE ${PORT:-3000}
CMD [ "node", "main.js" ]
