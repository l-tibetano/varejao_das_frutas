# ==========================================
# ETAPA 1: BUILD
# ==========================================
FROM node:22-alpine AS build

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci

# Copia o código-fonte
COPY . .

# Compila a aplicação
RUN npm run build


# ==========================================
# ETAPA 2: PRODUÇÃO
# ==========================================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Copia o resultado do build
COPY --from=build /app/.output ./.output

# Porta utilizada pelo Nitro
EXPOSE 3000

# Inicializa o servidor
CMD ["node", ".output/server/index.mjs"]