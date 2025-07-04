# Araucaria Web App

¡Bienvenido al frontend de Araucaria!

## Primeros pasos

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/oialvarez/araucaria.app.git
   cd araucaria.app/web-app
   ```

2. **Instala dependencias:**
   ```sh
   npm install
   ```

3. **Configura tus credenciales de Firebase:**
   - Copia el archivo de ejemplo:
     ```sh
     cp src/lib/config.example.ts src/lib/config.ts
     ```
   - Abre `src/lib/config.ts` y pega tus claves reales de Firebase (puedes obtenerlas desde la consola de Firebase, sección "Configuración del proyecto").
   - **¡Nunca subas este archivo al repo!** Está protegido por `.gitignore`.

4. **Ejecuta la app en modo desarrollo:**
   ```sh
   npm run dev
   ```

5. **Abre tu navegador en:**
   [http://localhost:5173](http://localhost:5173)

---

## Buenas prácticas

- **No subas archivos sensibles** como `src/lib/config.ts`, `.env`, ni ninguna clave privada.
- Usa siempre el archivo `config.example.ts` para compartir la estructura de configuración con el equipo.
- Las carpetas `.svelte-kit/` y `build/` son artefactos temporales y de compilación, no deben subirse al repo (ya están en el `.gitignore`).
- Si necesitas limpiar el historial de archivos sensibles, sigue la guía de seguridad del repo o pide ayuda a un admin.

---

## Scripts útiles

- `npm run dev` — Ejecuta la app en modo desarrollo
- `npm run build` — Genera la build de producción
- `npm run preview` — Previsualiza la build de producción localmente

---

## Colaboración

- Antes de hacer un PR, asegúrate de que tu rama esté actualizada con `master`.
- Escribe mensajes de commit claros y descriptivos.
- Consulta el equipo si tienes dudas sobre la estructura o seguridad del repo.

---

¡Gracias por contribuir a Araucaria! 🌲
