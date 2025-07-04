# Deploy de Araucaria (Cloud Functions + Web)

Este documento explica cómo desplegar tanto las Cloud Functions como el frontend web de Araucaria en Firebase, de forma segura y automatizada.

---

## 🚀 Deploy automático

1. **Asegúrate de tener las claves correctas en tu config local:**
   - `web-app/src/lib/config.ts` debe existir y tener tus claves de Firebase (¡no lo subas al repo!).

2. **Ejecuta el script de deploy:**
   ```sh
   ./deploy.sh
   ```
   (Si da error de permisos, ejecuta primero: `chmod +x deploy.sh`)

3. **El script hará:**
   - Instalación de dependencias en `functions/` y `web-app/`
   - Build de frontend SvelteKit
   - Deploy de Cloud Functions
   - Deploy de Hosting (web)

---

## Deploy manual (pasos separados)

1. **Build del frontend:**
   ```sh
   cd web-app
   npm install
   npm run build
   cd ..
   ```
2. **Build y deploy de funciones:**
   ```sh
   cd functions
   npm install
   cd ..
   firebase deploy --only functions
   ```
3. **Deploy de hosting:**
   ```sh
   firebase deploy --only hosting
   ```

---

## Buenas prácticas

- Nunca subas archivos sensibles (`config.ts`, `.env`, etc) al repo.
- Si cambias la estructura de carpetas o el build, revisa `firebase.json`.
- Si tienes errores de permisos, revisa que estés autenticado con `firebase login`.
- Si el deploy falla, revisa logs en la consola de Firebase y asegúrate de que las dependencias estén instaladas.

---

¡Listo! Tu app y funciones estarán online en Firebase 🚀
