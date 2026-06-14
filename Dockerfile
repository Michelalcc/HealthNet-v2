# ============================================================
# HEALTHNET V2 — Dockerfile (backend)
# Guardar en: la RAÍZ del proyecto (junto a /backend y /frontend)
# ============================================================

# Imagen base Node.js liviana
FROM node:20-alpine

# Crear carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json primero (para cachear dependencias)
COPY backend/package*.json ./backend/

# Instalar dependencias del backend
RUN cd backend && npm install --production

# Copiar todo el proyecto
COPY . .

# Exponer el puerto del servidor
EXPOSE 3000

# Comando para arrancar
CMD ["node", "backend/server.js"]
