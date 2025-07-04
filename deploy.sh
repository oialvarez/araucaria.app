#!/bin/bash
set -e

# === DEPLOY SCRIPT PARA ARAUCARIA ===
# Este script compila y despliega las Cloud Functions y el frontend web en Firebase

# 1. Selección automática de versión de Node con nvm (si existe .nvmrc)
echo "\n[1/5] Seleccionando versión de Node para Cloud Functions..."
cd functions
if [ -f .nvmrc ]; then
  if command -v nvm &> /dev/null; then
    echo "Usando nvm para seleccionar versión: $(cat .nvmrc)"
    nvm install
    nvm use
  else
    echo "ADVERTENCIA: nvm no está instalado. Usa Node versión $(cat .nvmrc) para evitar problemas."
  fi
fi

# Instalación de dependencias
npm install
cd ..

# 2. Build de frontend SvelteKit
echo "\n[2/5] Instalando dependencias y generando build del frontend..."
cd web-app
npm install
npm run build
cd ..

# 3. Deploy de Cloud Functions
echo "\n[3/5] Desplegando Cloud Functions..."
firebase deploy --only functions

# 4. Deploy de Hosting (web)
echo "\n[4/5] Desplegando Hosting (web)..."
firebase deploy --only hosting

# 5. Mensaje final
echo "\n[5/5] ¡Deploy completado con éxito! 🚀"
