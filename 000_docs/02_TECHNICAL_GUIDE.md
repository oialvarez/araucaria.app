# Guía Técnica para Desarrolladores

Este documento proporciona toda la información técnica necesaria para configurar el entorno de desarrollo, entender la pila tecnológica y conocer las reglas de seguridad de Araucaria App.

---

## 1. Pila Tecnológica (Technology Stack)

### **Frontend (`web-app`)**

*   **Framework:** [SvelteKit](https://kit.svelte.dev/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Librería UI:** [Svelte](https://svelte.dev/)
*   **Estilos:** [Sass](https://sass-lang.com/)
*   **Herramienta de Build:** [Vite](https://vitejs.dev/)
*   **Librerías Clave:** `firebase`, `openai`

### **Backend (`functions`)**

*   **Plataforma:** [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
*   **Entorno de Ejecución:** Node.js v18
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Librerías Clave:** `firebase-admin`, `firebase-functions`, `nodemailer`

### **Desarrollo y Herramientas**

*   **Control de Versiones:** Git
*   **Calidad de Código:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
*   **Gestor de Paquetes:** npm

---

## 2. Estructura del Proyecto

```markdown
/araucaria-app
|-- 000_docs/                # Documentación.
|-- functions/               # Backend (Firebase Functions).
|-- web-app/                 # Frontend (SvelteKit).
|-- .gitignore
|-- firebase.json
|-- firestore.rules
|-- storage.rules
|-- README.md
```

---

## 3. Desarrollo Local (Local Development)

### **Requisitos Previos**

*   [Node.js](https://nodejs.org/) (v18+)
*   [Firebase CLI](https://firebase.google.com/docs/cli)

### **Configuración del Frontend (`web-app`)**

1.  **Navega al directorio:** `cd web-app`
2.  **Instala dependencias:** `npm install`
3.  **Configura entorno:** `cp .env.example .env` y añade tus credenciales de Firebase.
4.  **Inicia el servidor:** `npm run dev` (disponible en `http://localhost:5173`).

### **Configuración del Backend (`functions`)**

1.  **Navega al directorio:** `cd functions`
2.  **Instala dependencias:** `npm install`
3.  **Inicia el emulador:** `npm run serve`

---

## 4. Reglas de Seguridad (Firestore & Storage)

### **Firestore Rules (`firestore.rules`)**

*   **Operaciones Generales**: La mayoría de las operaciones de creación/eliminación se delegan a las Cloud Functions.
*   **`colegios`, `cursos`, `alumnos`**: Solo los administradores del colegio pueden leer/escribir.
*   **`users`**: Un usuario solo puede leer/actualizar su propio documento.
*   **`avisos`**: Acceso granular basado en roles (`administrador`, `profesor`, `apoderado`).
*   **`confirmaciones`**: Los apoderados pueden crear; administradores/profesores pueden leer.

### **Storage Rules (`storage.rules`)**

*   **Lectura**: Permitida para cualquier usuario autenticado del colegio.
*   **Escritura**: Permitida solo para `profesores` y `administradores`.
*   **Restricciones**: Se valida el tipo de archivo y el tamaño (máx. 10MB).
