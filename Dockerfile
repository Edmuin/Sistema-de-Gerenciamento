# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json e pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar pnpm e dependências
RUN npm install -g pnpm@10.20.0 && \
    pnpm install --frozen-lockfile

# Stage 2: Runtime
FROM node:18-alpine

WORKDIR /app

# Copiar pnpm do stage anterior
COPY --from=builder /usr/local/lib/node_modules/pnpm /usr/local/lib/node_modules/pnpm
COPY --from=builder /usr/local/bin/pnpm* /usr/local/bin/

# Copiar node_modules do stage anterior
COPY --from=builder /app/node_modules ./node_modules

# Copiar código da aplicação
COPY . .

# Criar diretórios necessários
RUN mkdir -p uploads

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Comando para iniciar a aplicação
CMD ["node", "src/server.js"]
