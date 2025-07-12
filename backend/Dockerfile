# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Solo copia lo necesario para instalar dependencias
COPY package*.json ./

# Instala solo dependencias necesarias para producción
RUN npm install --only=production

# Copia el resto de archivos necesarios para runtime
COPY dist ./dist

# Etapa 2: Imagen final liviana
FROM node:20-alpine

WORKDIR /app

# Copia solo lo necesario desde la imagen anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/main"]


