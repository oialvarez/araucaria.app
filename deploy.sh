#!/bin/bash
set -e

# === DEPLOY SCRIPT PARA ARAUCARIA ===
# Este script instala dependencias, compila y despliega Cloud Functions y el frontend web en Firebase

# 1. Instalar dependencias de funciones
cd functions
if [ -f .nvmrc ] && command -v nvm &> /dev/null; then
  echo "Usando nvm para seleccionar versión: $(cat .nvmrc)"
  nvm install
  nvm use
fi
echo "[1/4] Instalando dependencias de Cloud Functions..."
npm install
cd ..

# 2. Instalar dependencias y build del frontend
cd web-app
if [ -f .nvmrc ] && command -v nvm &> /dev/null; then
  echo "Usando nvm para seleccionar versión: $(cat .nvmrc)"
  nvm install
  nvm use
fi
echo "[2/4] Instalando dependencias y generando build del frontend..."
npm install
npm run build
cd ..

# 3. Deploy de Cloud Functions
echo "[3/4] Desplegando Cloud Functions..."
firebase deploy --only functions

# 4. Deploy de Hosting (web)
echo "[4/4] Desplegando Hosting (web)..."
firebase deploy --only hosting

echo "\n¡Deploy completado con éxito! 🚀"
