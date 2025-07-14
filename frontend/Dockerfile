# Etapa 1: Build
FROM node:20 AS builder

WORKDIR /app

# Copiamos solo archivos necesarios primero (mejor caché de Docker)
COPY package.json package-lock.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del proyecto
COPY . .

# 🔍 Asegura que tengas tailwindcss y postcss bien configurados antes de esto
RUN npm run build

# Etapa 2: Runtime (standalone)
FROM node:20 AS runner

WORKDIR /app

# Variables de entorno para producción
ENV NODE_ENV=production
ENV PORT=3001
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar artefactos necesarios desde el build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 3001

# Start app
CMD ["node", "server.js"]
