##### DEPENDENCIES

FROM --platform=linux/amd64 node:19-alpine AS deps
RUN apk add --no-cache libc6-compat openssl1.1-compat
WORKDIR /app

# Install Prisma Client - remove if not using Prisma

COPY prisma ./

# Install dependencies based on the preferred package manager

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

RUN \
 if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
 elif [ -f package-lock.json ]; then npm ci; \
 elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
 else echo "Lockfile not found." && exit 1; \
 fi

##### BUILDER

FROM --platform=linux/amd64 node:19-alpine AS builder
ENV DATABASE_URL postgres://admin:default@127.0.0.1
ENV NEXTAUTH_SECRET nextauthsecret
ENV NEXTAUTH_URL http://auth.example.com
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
 if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
 elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
 elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
 else echo "Lockfile not found." && exit 1; \
 fi

##### PRISMA
FROM --platform=linux/amd64 node:19-alpine AS prisma
WORKDIR /app

ENV DATABASE_URL postgres://admin:default@127.0.0.1

COPY ./prisma ./prisma

RUN npm init -y
RUN npm install prisma --save-dev


##### RUNNER

FROM --platform=linux/amd64 node:19-alpine AS runner
WORKDIR /app

ENV DATABASE_URL postgres://admin:default@127.0.0.1
ENV NEXTAUTH_SECRET nextauthsecret
ENV NEXTAUTH_URL http://auth.example.com
ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=prisma /app ./prisma

COPY --chown=nextjs:nodejs ./dockerEntrypoint.sh /


USER nextjs
EXPOSE 3000
ENV PORT 3000

RUN chmod +x /dockerEntrypoint.sh

ENTRYPOINT ["/dockerEntrypoint.sh"]
CMD []