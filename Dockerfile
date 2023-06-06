FROM node:18.13.0-alpine as build
WORKDIR /srv/
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile
COPY ./src ./src

FROM build as dev
WORKDIR /srv/
EXPOSE ${PORT:-3000}
CMD [ "pnpm", "run", "start:dev"]

FROM node:18.13.0-alpine as prod
WORKDIR /srv/
COPY --from=build /srv/dist .
COPY --from=build package.json pnpm-lock.yaml
RUN pnpm i --frozen-lockfile -P
EXPOSE ${PORT:-3000}
CMD [ "node", "main.js" ]
