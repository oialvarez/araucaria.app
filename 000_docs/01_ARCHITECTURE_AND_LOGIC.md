# Arquitectura y Lógica de Negocio

Este documento detalla los principios arquitectónicos, el modelo de datos, los roles de usuario y la lógica de negocio del backend de Araucaria App.

---

## 1. Principios de Arquitectura

*   **Clean Architecture**: Separación clara entre la lógica de negocio y los frameworks.
*   **SOLID**: Principios de diseño orientado a objetos para un código mantenible.
*   **DRY (Don't Repeat Yourself)**: Evitar la duplicación de código.

---

## 2. Modelo de Datos (Data Model)

El sistema se basa en un modelo de datos NoSQL en Firestore, organizado en las siguientes colecciones principales:

*   **`colegios`**: Almacena la información de cada institución educativa.
    *   `id`, `nombre`, `direccion`, `email`, `telefono`
*   **`users`**: Contiene los perfiles de todos los usuarios de la plataforma.
    *   `uid`, `email`, `nombre`, `rol`, `colegioId`, `hijos` (para apoderados)
*   **`cursos`**: Define los cursos dentro de cada colegio.
    *   `id`, `nombre`, `descripcion`, `codigo`, `colegioId`, `administradorId`
*   **`alumnos`**: Guarda la información de los estudiantes.
    *   `id`, `nombre`, `cursoId`, `colegioId`, `apoderadoId`
*   **`avisos`**: Contiene todas las comunicaciones y avisos.
    *   `id`, `titulo`, `descripcion`, `fechaPublicacion`, `cursos`, `profesorId`
    *   **Subcolección `confirmaciones`**: Registra la lectura de los avisos por parte de los apoderados.

---

## 3. Roles y Permisos de Usuario

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

## 4. Funcionalidades del Backend (`functions`)

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
