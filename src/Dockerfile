FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar fontes e build
COPY . .
RUN npm run build

# Stage de produção
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copiar build do frontend
COPY --from=builder /app/dist .

# Configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
