# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS builder

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY . .

RUN set -eux; \
    if [ ! -f package.json ]; then \
      echo "ERROR: package.json is missing. Add your Next.js/Payload app files before building."; \
      exit 1; \
    fi; \
    if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi; \
    npm run build; \
    npm prune --omit=dev

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app /app

USER nextjs
EXPOSE 8080

CMD ["npm", "run", "start"]
