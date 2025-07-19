# Araucaria App: Bienvenido a la Documentación de Araucaria App

Este es el punto de partida central para toda la documentación del proyecto. Desde aquí puedes navegar a guías más detalladas según tu rol e intereses.

---

## 1. Visión General del Proyecto

Araucaria App es una plataforma de comunicación diseñada para optimizar la interacción entre colegios, profesores y apoderados. Nuestro objetivo es centralizar los avisos, facilitar la gestión académica y fortalecer la comunidad escolar a través de una herramienta moderna y fácil de usar.
Problema que Resuelve:
Actualmente, la comunicación entre colegios y apoderados suele ser dispersa y poco eficiente, lo que genera confusiones y retrasos en la entrega de información importante. La Araucaria App centraliza y simplifica este proceso, asegurando que todos los actores involucrados estén al tanto de los avisos y eventos relevantes.

Usuarios Principales:
Super Administradores: Responsables de la gestión global de los colegios en la plataforma.
Administradores de Colegio: Encargados de gestionar cursos, usuarios y avisos dentro de un colegio específico.
Profesionales de la Educación: Profesores que crean y gestionan avisos para los apoderados y alumnos.
Apoderados: Reciben y confirman la lectura de avisos.
Alumnos: Pueden ver la información del curso y los avisos, pero no confirmar su lectura.
### 1.2. Objetivos Generales
Escalabilidad: Construir un sistema capaz de manejar un número creciente de usuarios y funciones sin degradación en el rendimiento.
Mantenibilidad: Asegurar que la base de código sea fácil de entender, modificar y extender con el tiempo.
Fiabilidad: Entregar una aplicación robusta y estable con un tiempo de inactividad mínimo y pocos errores.
Seguridad: Proteger los datos de los usuarios y la integridad del sistema implementando las mejores prácticas de seguridad en todos los niveles.
### 1.3. Objetivos Específicos
Implementar Autenticación de Usuarios: Permitir que los usuarios se registren e inicien sesión mediante correo electrónico y Single Sign-On (SSO) con Google.
Habilitar la Creación y Gestión de Avisos: Permitir que los profesores y administradores creen, actualicen y eliminen avisos.
Confirmación de Lectura de Avisos: Permitir que los apoderados marquen los avisos como leídos y que los profesores vean el estado de confirmación.
Gestionar Colegios y Cursos: Permitir que los super administradores y administradores de colegio gestionen colegios, cursos y alumnos.
MVP de Comunicación y Avisos: Entregar una versión mínima viable (MVP) que permita la comunicación básica entre profesores y apoderados.
## 2. Principios Arquitectónicos
Adherimos a un conjunto de principios arquitectónicos probados para guiar nuestro proceso de desarrollo. Estos principios aseguran que nuestra aplicación sea robusta, flexible y fácil de gestionar.

### 2.1. Arquitectura Limpia (Clean Architecture)
Seguimos los principios de la Arquitectura Limpia para separar las preocupaciones y crear un sistema que sea independiente de frameworks, interfaces de usuario y bases de datos. Esto hace que nuestra aplicación sea más testeable, mantenible y adaptable a cambios futuros.

Entidades: Objetos y reglas de negocio centrales.
Casos de Uso: Reglas de negocio específicas de la aplicación.
Adaptadores de Interfaz: Gateways, presentadores y controladores que convierten datos para los casos de uso y la interfaz de usuario.
Frameworks y Controladores: La capa más externa, que contiene la interfaz de usuario, bases de datos y servicios externos.
### 2.2. Principios SOLID
S - Principio de Responsabilidad Única: Una clase o módulo debe tener solo una razón para cambiar.
O - Principio Abierto/Cerrado: Las entidades de software deben estar abiertas para extensión pero cerradas para modificación.
L - Principio de Sustitución de Liskov: Los subtipos deben ser sustituibles por sus tipos base.
I - Principio de Segregación de Interfaces: Los clientes no deben verse obligados a depender de interfaces que no usan.
D - Principio de Inversión de Dependencias: Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones.
### 2.3. DRY (No te Repitas)
Cada pieza de conocimiento debe tener una única representación clara y autoritaria dentro del sistema. Nos esforzamos por eliminar la redundancia en nuestro código, configuraciones y documentación.

## 3. Mejores Prácticas
### 3.1. Control de Versiones (Git)
Estrategia de Ramificación: Usamos un modelo similar a GitFlow (main, develop, feature/, bugfix/, release/).
Mensajes de Commit: Los commits deben seguir la especificación de Conventional Commits.
Pull Requests (PRs): Todo el código debe ser revisado mediante PRs antes de ser fusionado en develop o main. Los PRs deben ser pequeños, enfocados e incluir una descripción clara de los cambios.
### 3.2. Estilo de Código y Linting
Enforzamos un estilo de código consistente usando Prettier y ESLint. Las configuraciones se encuentran en la raíz del proyecto. Todo el código debe pasar las verificaciones de formato y linting antes de ser comprometido.

### 3.3. Pruebas
Pruebas Unitarias: Aislar y probar componentes y funciones individuales.
Pruebas de Integración: Probar la interacción entre diferentes partes del sistema.
Pruebas End-to-End (E2E): Simular escenarios de usuario para probar el flujo de la aplicación de principio a fin.

## 4. Pila Tecnológica (Technology Stack)

Esta sección describe las tecnologías, frameworks y plataformas clave utilizadas en el proyecto Araucaria App.

### **Frontend (`web-app`)**

*   **Framework:** [SvelteKit](https://kit.svelte.dev/)
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Librería UI:** [Svelte](https://svelte.dev/)
*   **Estilos:** [Sass](https://sass-lang.com/)
*   **Herramienta de Build:** [Vite](https://vitejs.dev/)
*   **Librerías Clave:**
    *   `firebase`: Para la integración con Firebase en el lado del cliente.
    *   `openai`: Para interactuar con la API de OpenAI.

### **Backend (`functions`)**

*   **Plataforma:** [Firebase Cloud Functions](https://firebase.google.com/docs/functions)
*   **Entorno de Ejecución:** Node.js v18
*   **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
*   **Librerías Clave:**
    *   `firebase-admin`: Para operaciones de backend con privilegios de administrador.
    *   `firebase-functions`: El SDK principal para Cloud Functions.
    *   `nodemailer`: Para el envío de correos electrónicos.

### **Desarrollo y Herramientas**

*   **Control de Versiones:** Git
*   **Calidad de Código:** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
*   **Gestor de Paquetes:** npm

---

## 5. Estructura del Proyecto
Esta sección describe la estructura de directorios de alto nivel del proyecto Araucaria App.

```markdown
/araucaria-app
|-- 000_docs/                # Documentación, incluyendo este archivo.
|-- functions/               # Funciones de Firebase (lógica del backend).
|   |-- src/
|   |-- package.json
|-- web-app/                 # Aplicación frontend con SvelteKit.
|   |-- src/
|   |   |-- lib/               # Componentes compartidos, utilidades y configuración de Firebase.
|   |   |-- routes/            # Páginas de la aplicación y endpoints de API.
|   |-- static/              # Recursos estáticos (imágenes, fuentes).
|   |-- package.json
|-- .gitignore
|-- firebase.json            # Configuración del proyecto de Firebase.
|-- README.md                # README general del proyecto.
```

Esta estructura separa el backend (functions) del frontend (web-app), promoviendo una base de código limpia y organizada.

---

## 6. Desarrollo Local (Local Development)

Sigue estos pasos para configurar el entorno de desarrollo en tu máquina local.

### **Requisitos Previos**

*   [Node.js](https://nodejs.org/) (versión 18 o superior)
*   [Firebase CLI](https://firebase.google.com/docs/cli)

### **Configuración del Frontend (`web-app`)**

1.  **Navega al directorio `web-app`:**
    ```sh
    cd web-app
    ```

2.  **Instala las dependencias:**
    ```sh
    npm install
    ```

3.  **Configura las variables de entorno:**
    Copia el archivo de ejemplo y añade tus credenciales de Firebase.
    ```sh
    cp .env.example .env
    ```

4.  **Inicia el servidor de desarrollo:**
    ```sh
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

### **Configuración del Backend (`functions`)**

1.  **Navega al directorio `functions`:**
    ```sh
    cd functions
    ```

2.  **Instala las dependencias:**
    ```sh
    npm install
    ```

3.  **Ejecuta las funciones en el emulador local:**
    ```sh
    npm run serve
    ```
    Esto iniciará el emulador de Firebase, permitiéndote probar tus funciones localmente.

---

## 7. Modelo de Datos (Data Model)

El sistema se basa en un modelo de datos NoSQL en Firestore, organizado en las siguientes colecciones principales:

*   **`colegios`**: Almacena la información de cada institución educativa.
    *   `id`, `nombre`, `direccion`, `email`, `telefono`
*   **`users`**: Contiene los perfiles de todos los usuarios de la plataforma.
    *   `uid`, `email`, `nombre`, `rol`, `colegioId`, `hijos` (para apoderados)
*   **`cursos`**: Define los cursos dentro de cada colegio.
    *   `id`, `nombre`, `descripcion`, `codigo`, `colegioId`, `administradorId`
*   **`alumnos`**: Guarda la información de los estudiantes.
    *   `id`, `nombre`, `cursoId`, `colegioId`, `apoderadoId`
*-   [**`03_requisitos.md`**](./sdlc/03_requisitos.md): Requisitos funcionales y no funcionales detallados.
-   [**`04_casos_de_uso.md`**](./sdlc/04_casos_de_uso.md): Flujos de interacción de los usuarios con el sistema (Casos de Uso).
-   [**`05_criterios_de_aceptacion.md`**](./sdlc/05_criterios_de_aceptacion.md): Criterios medibles para validar que una funcionalidad está completa.
    *   `id`, `titulo`, `descripcion`, `fechaPublicacion`, `cursos`, `profesorId`
    *   **Subcolección `confirmaciones`**: Registra la lectura de los avisos por parte de los apoderados.

---

## 8. Roles y Permisos de Usuario

El acceso a las funcionalidades está controlado por un sistema de roles. Cada rol tiene un conjunto específico de permisos:

### **Super Administrador**
*   **Descripción**: Gestiona toda la plataforma, incluyendo múltiples colegios.
*   **Permisos**: Acceso total de Creación, Lectura, Actualización y Eliminación (CRUD) sobre todas las entidades: `Colegios`, `Usuarios`, `Cursos`, `Alumnos` y `Avisos`.

### **Administrador de Colegio**
*   **Descripción**: Gestiona un único colegio.
*   **Permisos**: CRUD sobre `Usuarios`, `Cursos` y `Alumnos` dentro de su propio colegio. Puede gestionar `Avisos` para todo el colegio.

### **Profesor**
*   **Descripción**: Gestiona la comunicación con los apoderados de sus cursos.
*   **Permisos**: Puede crear, actualizar y eliminar `Avisos` para los cursos que tiene asignados. Puede ver la lista de alumnos y apoderados de sus cursos.

### **Apoderado**
*   **Descripción**: Padre, madre o tutor de uno o más alumnos.
*   **Permisos**: Puede ver los `Avisos` asociados a los cursos de sus hijos. Puede marcar los avisos como leídos. No tiene permisos de creación o edición de contenido.

---

## 9. Reglas de Seguridad (Firestore & Storage)

La seguridad de los datos se refuerza a nivel de Firebase con reglas específicas para Firestore y Storage. Estas reglas operan independientemente de la lógica del backend, proporcionando una capa adicional de protección.

### **Firestore Rules (`firestore.rules`)**

Las reglas de Firestore definen quién puede leer, escribir y eliminar documentos en la base de datos.

*   **Operaciones Generales**: La creación y eliminación de la mayoría de las entidades (`users`, `colegios`, `cursos`, `alumnos`) no se permite directamente desde el cliente. Estas operaciones deben ser ejecutadas a través de las Cloud Functions del backend, que se ejecutan con privilegios de administrador.
*   **`colegios`, `cursos`, `alumnos`**: Solo los administradores de un colegio pueden leer y escribir datos dentro del ámbito de su propio colegio.
*   **`users`**: Un usuario solo puede leer y actualizar su propio documento. Nadie más tiene acceso.
*   **`avisos`**:
    *   **Creación**: Permitida para `profesores` y `administradores`.
    *   **Lectura**: `Administradores` y `profesores` pueden leer todos los avisos de su colegio. Los `apoderados` solo pueden leer los avisos que aplican a los cursos de sus hijos.
    *   **Actualización/Eliminación**: Permitida para `administradores` (cualquier aviso) y para `profesores` (solo los avisos que ellos crearon).
*   **`avisos/{avisoId}/confirmaciones`**:
    *   **Creación**: Un `apoderado` puede crear una confirmación de lectura para un aviso relevante.
    *   **Lectura**: `Profesores` y `administradores` pueden leer las confirmaciones para hacer seguimiento.

### **Storage Rules (`storage.rules`)**

Las reglas de Storage controlan el acceso a los archivos subidos (ej. PDFs, imágenes adjuntas a los avisos).

*   **Ruta de Archivos**: Los archivos se organizan por colegio y tipo: `/{colegioId}/{type}/{id}/{fileName}`.
*   **Lectura**: Cualquier usuario autenticado (`administrador`, `profesor`, `apoderado`) puede leer archivos pertenecientes a su colegio.
*   **Escritura (Subida)**: Solo los `profesores` y `administradores` pueden subir archivos.
*   **Restricciones**: Se aplican validaciones estrictas sobre el tipo de archivo (PDF, JPG, PNG, DOC, DOCX) y el tamaño máximo (10MB).

---

## 10. Estado del Frontend y Trabajo Pendiente

Esta sección evalúa el estado actual de la aplicación `web-app`, las funcionalidades implementadas y las que quedan por desarrollar.

### **Funcionalidades Implementadas**

*   **Autenticación de Usuarios**: Sistema completo de inicio de sesión y registro.
*   **Panel de Administración**:
    *   **Gestión de Colegios**: Formulario para crear nuevos colegios (integra con la Cloud Function `createColegio`).
    *   **Gestión de Usuarios**: Interfaz para crear, leer, actualizar y eliminar usuarios (integra con `createUser`, `updateUser`, `deleteUser`).
*   **Formulario de Contacto**: Página de contacto que envía correos a través de la Cloud Function `sendContactEmail`.
*   **Dashboard de Tareas**: Una vista de "Tareas" que permite a los usuarios agregar y ver sus propias tareas. Esta funcionalidad interactúa directamente con Firestore.

### **Funcionalidades Pendientes de Desarrollo**

Aunque el backend soporta una lógica de negocio más amplia, las siguientes funcionalidades clave aún no tienen una interfaz de usuario en el frontend:

*   **Gestión de Cursos**: No existe una interfaz para que los administradores puedan crear, ver, editar o eliminar cursos.
*   **Gestión de Alumnos**: No hay una interfaz para matricular, ver o gestionar alumnos dentro de los cursos.
*   **Gestión de Avisos**: Los profesores y administradores no tienen una forma de crear, ver o gestionar los avisos. Los apoderados tampoco tienen una vista para consultar los avisos de sus hijos.

### **Puntos a Considerar**

*   La funcionalidad de **"Tareas"** parece ser un prototipo o una característica aislada. Se debería evaluar si se integra con el resto del sistema (ej. asignación de tareas a cursos) o si se elimina. Su interacción directa con Firestore podría ser un candidato a refactorizar, moviendo la lógica a una Cloud Function para centralizar las reglas de negocio y la seguridad.

---

## 11. Funcionalidades del Backend (`functions`)

El backend, construido con Firebase Cloud Functions, ofrece las siguientes capacidades a través de una API interna. Todas las funciones requieren autenticación y validan los permisos del usuario (ej. administrador, profesor) antes de ejecutar una operación.

### **Gestión de Usuarios**

*   `createUser`: Crea un nuevo usuario en Firebase Authentication y Firestore.
*   `updateUser`: Actualiza los datos de un usuario existente.
*   `deleteUser`: Elimina un usuario del sistema.

### **Gestión de Colegios**

*   `createColegio`: Registra un nuevo colegio en la plataforma.
*   `updateColegio`: Modifica los datos de un colegio.
*   `deleteColegio`: Elimina un colegio.

### **Gestión de Cursos**

*   `createCurso`: Crea un nuevo curso asociado a un colegio.
*   `updateCurso`: Actualiza la información de un curso.
*   `deleteCurso`: Elimina un curso.

### **Gestión de Alumnos**

*   `createAlumno`: Añade un nuevo alumno a un curso.
*   `updateAlumno`: Modifica los datos de un alumno.
*   `deleteAlumno`: Elimina un alumno de un curso.

### **Gestión de Avisos**

*   `createAviso`: Permite a profesores y administradores crear nuevos avisos.
*   `updateAviso`: Modifica un aviso existente.
*   `deleteAviso`: Elimina un aviso.
*   `markAvisoAsRead`: Permite a los apoderados marcar un aviso como leído.

### **Comunicación**

*   `sendContactEmail`: Envía un correo electrónico desde el formulario de contacto de la aplicación.