# Estado del Frontend y Hoja de Ruta

Este documento describe el estado actual de la aplicación `web-app`, las funcionalidades que ya están implementadas y las que quedan por desarrollar.

---

## 1. Funcionalidades Implementadas

*   **Autenticación de Usuarios**: Sistema completo de inicio de sesión y registro.
*   **Panel de Administración**:
    *   **Gestión de Colegios**: Formulario para crear nuevos colegios (integra con la Cloud Function `createColegio`).
    *   **Gestión de Usuarios**: Interfaz para crear, leer, actualizar y eliminar usuarios (integra con `createUser`, `updateUser`, `deleteUser`).
*   **Formulario de Contacto**: Página de contacto que envía correos a través de la Cloud Function `sendContactEmail`.
*   **Dashboard de Tareas**: Una vista de "Tareas" que permite a los usuarios agregar y ver sus propias tareas. Esta funcionalidad interactúa directamente con Firestore.

---

## 2. Funcionalidades Pendientes de Desarrollo

Aunque el backend soporta una lógica de negocio más amplia, las siguientes funcionalidades clave aún no tienen una interfaz de usuario en el frontend:

*   **Gestión de Cursos**: No existe una interfaz para que los administradores puedan crear, ver, editar o eliminar cursos.
*   **Gestión de Alumnos**: No hay una interfaz para matricular, ver o gestionar alumnos dentro de los cursos.
*   **Gestión de Avisos**: Los profesores y administradores no tienen una forma de crear, ver o gestionar los avisos. Los apoderados tampoco tienen una vista para consultar los avisos de sus hijos.

---

## 3. Puntos a Considerar

*   La funcionalidad de **"Tareas"** parece ser un prototipo o una característica aislada. Se debería evaluar si se integra con el resto del sistema (ej. asignación de tareas a cursos) o si se elimina. Su interacción directa con Firestore podría ser un candidato a refactorizar, moviendo la lógica a una Cloud Function para centralizar las reglas de negocio y la seguridad.
