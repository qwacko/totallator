FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN npm install --global pnpm
RUN pnpm install

#This is required to have a value otherwise compilation of lucia doesn't work.
ARG AUTH_SECRET=DeployAuthSecretDeployAuthSecretDeployAuthSecret

RUN npx prisma generate
RUN pnpm build


# stage run
FROM node:18-alpine AS run

WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/pnpm* ./
COPY --from=build /app/prisma ./
COPY --from=build /app/build ./build

RUN npm install --global pnpm
RUN pnpm install --filter "prisma"

ENV DATABASE_URL=
ENV AUTH_SECRET=
ENV ALLOW_SIGNUP=true
ENV ALLOW_HTTP=true

# RUN npm install
CMD pnpm prisma-deploy && node build/index.js

