FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_HOST=https://www.anigame.com.br
ARG VITE_API_PORT=443

ENV VITE_API_HOST=${VITE_API_HOST}
ENV VITE_API_PORT=${VITE_API_PORT}

RUN npm run build

FROM node:22-alpine AS final

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
