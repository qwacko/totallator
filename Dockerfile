FROM node:18-alpine AS build

WORKDIR /app
COPY . .

ENTRYPOINT ["/app/dockerEntrypoint.sh"]

