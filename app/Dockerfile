FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN npm install --global pnpm
# RUN npm install

ENTRYPOINT ["/app/dockerEntrypoint.sh"]

