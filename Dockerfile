FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm
RUN apk add --no-cache python3 make g++

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG DATABASE_URL
ARG NEXT_PUBLIC_API_BASE_URL
RUN echo "DATABASE_URL=${DATABASE_URL}" > .env && \
    echo "NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}" >> .env

RUN pnpm exec next telemetry disable
RUN pnpm build

EXPOSE 3000
ENV NODE_ENV=production

CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm exec prisma db seed && pnpm start"]