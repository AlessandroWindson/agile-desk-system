FROM node:18-alpine AS builder

WORKDIR /app

# Copia arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependências
RUN npm install

# Copia fontes
COPY src ./src

# Build
RUN npm run build

FROM node:18-alpine

WORKDIR /app

# Copia arquivos necessários
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instala dependências de produção
RUN npm install --production

EXPOSE 5000

CMD ["node", "dist/index.js"]
