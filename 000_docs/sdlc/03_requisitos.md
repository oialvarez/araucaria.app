# Documento de Requisitos del Sistema

## 1. Requisitos No Funcionales

### 1.1. Seguridad

*   **Requisito 1.1**: Implementar encriptación de contraseñas (bcrypt, costo 12).
    *   *Necesidad*: Proteger las credenciales contra ataques de fuerza bruta.
*   **Requisito 1.2**: Proteger contra ataques comunes (XSS, CSRF).
    *   *Necesidad*: Prevenir vulnerabilidades de seguridad conocidas.
*   **Requisito 1.3**: Implementar 2FA para roles de Administrador.
    *   *Necesidad*: Añadir una capa extra de seguridad a cuentas críticas.
*   **Requisito 1.4**: Forzar el uso de HTTPS.
    *   *Necesidad*: Proteger los datos en tránsito.
*   **Requisito 1.5**: Cumplir con las normativas de protección de datos de Chile.
    *   *Necesidad*: Evitar sanciones legales y proteger la privacidad del usuario.

### 1.2. Escalabilidad

*   **Requisito 2.1**: Soportar una carga inicial de 507 usuarios sin degradación.
    *   *Necesidad*: Garantizar el rendimiento desde el lanzamiento.
*   **Requisito 2.2**: Usar Firebase y técnicas de caching.
    *   *Necesidad*: Mejorar la velocidad de respuesta y reducir la carga en la base de datos.
*   **Requisito 2.3**: Diseñar para el uso de balanceadores de carga.
    *   *Necesidad*: Asegurar la disponibilidad en picos de alta demanda.
*   **Requisito 2.4**: Mantener un tiempo de respuesta inferior a 2 segundos.
    *   *Necesidad*: Proporcionar una experiencia de usuario fluida.

### 1.3. Usabilidad

*   **Requisito 3.1**: Diseñar una interfaz intuitiva para todos los roles.
    *   *Necesidad*: Facilitar la adopción del sistema.
*   **Requisito 3.2**: Proveer mensajes de error claros y útiles.
    *   *Necesidad*: Ayudar a los usuarios a autogestionar errores.
*   **Requisito 3.3**: Implementar un sistema de ayuda o tutoriales.
    *   *Necesidad*: Reducir la curva de aprendizaje.
*   **Requisito 3.4**: Mantener una interfaz minimalista.
    *   *Necesidad*: Mejorar la claridad y la experiencia de usuario.

### 1.4. Diseño Responsivo

*   **Requisito 4.1**: Garantizar compatibilidad con móviles, tablets y desktops.
    *   *Necesidad*: Permitir el acceso desde cualquier dispositivo.

### 1.5. Accesibilidad

*   **Requisito 5.1**: Cumplir con las pautas WCAG 2.1 nivel AA.
    *   *Necesidad*: Asegurar que el sistema sea usable por personas con discapacidades.
*   **Requisito 5.2**: Usar texto alternativo y etiquetas ARIA.
    *   *Necesidad*: Facilitar el uso a personas con discapacidades visuales.
*   **Requisito 5.3**: Asegurar navegación completa por teclado y compatibilidad con lectores de pantalla.
    *   *Necesidad*: Permitir el uso a personas con discapacidades motrices o visuales.

---

## 2. Requisitos Funcionales

### 2.1. Autenticación y Autorización

*   **Requisito 6.1**: Registro mediante invitación por email (link de un solo uso) y SSO de Google.
    *   *Necesidad*: Controlar el acceso al registro.
*   **Requisito 7.1**: Inicio de sesión con email/contraseña y SSO de Google.
    *   *Necesidad*: Proveer un acceso seguro y conveniente.
*   **Requisito 8.1**: Funcionalidad de recuperación de contraseña por email.
    *   *Necesidad*: Permitir a los usuarios recuperar el acceso a sus cuentas.
*   **Requisito 9.1**: Implementar un sistema basado en roles (Super Admin, Admin, Profesor, Apoderado, Alumno).
    *   *Necesidad*: Asegurar el principio de mínimo privilegio.

### 2.2. Gestión de Colegios (Super Administrador)

*   **Requisitos 10-13**: El Super Administrador debe tener capacidad CRUD (Crear, Leer, Actualizar, Eliminar) completa sobre los colegios.
    *   *Necesidad*: Permitir la gestión centralizada de las instituciones en la plataforma.

### 2.3. Gestión de Usuarios (Administrador de Colegio)

*   **Requisito 14.1**: El Administrador puede crear nuevos usuarios (profesores, apoderados) dentro de su colegio.
*   **Requisito 15.1**: El Administrador puede ver una lista de todos los usuarios de su colegio.
*   **Requisito 16.1**: El Administrador puede actualizar la información de los usuarios de su colegio.
*   **Requisito 17.1**: El Administrador puede desactivar o eliminar usuarios de su colegio.
    *   *Necesidad*: Permitir la gestión descentralizada y completa del ciclo de vida de los usuarios a nivel de colegio.

### 2.4. Gestión de Cursos (Administrador de Colegio)

*   **Requisito 18.1**: El Administrador puede crear nuevos cursos en su colegio.
*   **Requisito 19.1**: El Administrador puede ver y listar todos los cursos de su colegio.
*   **Requisito 20.1**: El Administrador puede actualizar los detalles de un curso existente.
*   **Requisito 21.1**: El Administrador puede eliminar un curso.
    *   *Necesidad*: Permitir la organización y gestión académica completa dentro de cada colegio.

### 2.5. Gestión de Alumnos (Administrador de Colegio)

*   **Requisito 22.1**: El Administrador puede matricular nuevos alumnos en los cursos.
*   **Requisito 23.1**: El Administrador puede ver la lista de todos los alumnos del colegio.
*   **Requisito 24.1**: El Administrador puede actualizar los datos de un alumno.
*   **Requisito 25.1**: El Administrador puede dar de baja a un alumno.
    *   *Necesidad*: Permitir la gestión completa del alumnado.

### 2.6. Gestión de Avisos

*   **Requisito 26.1**: Profesores y Administradores pueden crear avisos.
    *   *Necesidad*: Facilitar la comunicación desde el colegio hacia los apoderados.
*   **Requisito 27.1**: Todos los usuarios pueden leer los avisos que les correspondan.
    *   *Necesidad*: Asegurar que la información llegue a su destino.
*   **Requisitos 28-29**: El creador del aviso y los administradores pueden actualizar y eliminar avisos.
    *   *Necesidad*: Permitir la corrección y mantenimiento de la información comunicada.
*   **Requisito 29.1**: Profesores y Administradores pueden marcar un aviso como "realizado" o "completado".
    *   *Necesidad*: Cerrar el ciclo de una tarea o comunicado que requiere una acción.

### 2.7. Confirmación de Lectura (Apoderados)

*   **Requisito 30.1**: Los apoderados pueden marcar un aviso como leído.
    *   *Necesidad*: Proveer un mecanismo de acuse de recibo.
*   **Requisito 31.1**: El sistema debe registrar fecha y hora de la confirmación.
    *   *Necesidad*: Mantener una auditoría de la comunicación.
*   **Requisito 32.1**: Profesores y Administradores pueden ver el estado de confirmación.
    *   *Necesidad*: Permitir el seguimiento de la recepción de comunicados.

### 2.8. Permisos de Alumno

*   **Requisito 33.1**: Los alumnos pueden ver los avisos correspondientes a sus cursos.
    *   *Necesidad*: Mantener a los alumnos informados.
*   **Requisito 33.2**: Los alumnos no pueden confirmar la lectura de avisos ni interactuar con ellos.
    *   *Necesidad*: Simplificar el flujo y mantener la responsabilidad de la confirmación en el apoderado.

### 2.9. Interfaz Pública

*   **Requisitos 33-34**: Debe existir un formulario de contacto público que envíe la información a un email específico.
    *   *Necesidad*: Proveer un canal de comunicación para nuevos colegios interesados.

### 2.9. Interfaz de Administración

*   **Requisito 35.1**: El Super Administrador debe tener un panel de control centralizado.
    *   *Necesidad*: Facilitar la gestión global del sistema.

### 2.10. Diseño y Estilos (CSS)

*   **Requisitos 36-39**: El diseño debe ser minimalista, usar variables CSS, y tener una página de inicio y botones atractivos y funcionales.
    *   *Necesidad*: Asegurar una experiencia de usuario positiva, consistente y mantenible.