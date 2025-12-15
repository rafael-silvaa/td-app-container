# stage 1: builder
# lightweight image
FROM node:18-alpine AS builder 

WORKDIR /app

COPY package*.json ./

RUN npm install

# copy source code
COPY . . 

# stage 2: prod
FROM node:18-alpine AS runner

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/server.js ./

USER appuser

EXPOSE 3000

# healthcheck w/ timeout + 
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/status || exit 1

CMD ["node", "server.js"]