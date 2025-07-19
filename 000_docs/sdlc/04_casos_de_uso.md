# 4. Casos de Uso

Este documento describe los flujos de interacción clave entre los usuarios (actores) y el sistema Araucaria App para lograr objetivos específicos.

---

### **CU-01: Registro de un nuevo usuario por invitación**

-   **Actor Principal**: Usuario no registrado (Profesor, Administrador, etc.).
-   **Disparador**: El usuario recibe un correo electrónico con un enlace de invitación para unirse a un colegio en Araucaria App.
-   **Flujo Principal**:
    1.  El usuario hace clic en el enlace de invitación de un solo uso.
    2.  El sistema valida el token del enlace. Si es válido, redirige al usuario a la página de registro.
    3.  El campo de email del formulario de registro aparece pre-rellenado y deshabilitado.
    4.  El usuario completa sus datos: nombre completo y contraseña (con confirmación).
    5.  El sistema valida que las contraseñas coincidan y cumplan los requisitos de seguridad.
    6.  El usuario envía el formulario.
    7.  El sistema crea la cuenta en Firebase Authentication, asocia el rol y colegio predefinidos en la invitación, y marca el token como usado.
    8.  El sistema redirige al usuario al dashboard principal de la aplicación.
-   **Flujos Alternativos**:
    -   **Token inválido o expirado**: Si el enlace no es válido, el sistema muestra una página de error con un mensaje claro (ej. "El enlace de invitación ha expirado o no es válido. Contacta al administrador de tu colegio.").

---

### **CU-02: Creación y envío de un aviso**

-   **Actor Principal**: Profesor o Administrador de Colegio.
-   **Precondición**: El actor ha iniciado sesión en el sistema.
-   **Flujo Principal**:
    1.  El actor navega a la sección "Gestión de Avisos" y selecciona la opción "Crear Nuevo Aviso".
    2.  El sistema presenta un formulario con los siguientes campos: Título, Descripción, Cursos de destino (selector múltiple), y opción para adjuntar archivos.
    3.  El actor completa la información del aviso.
    4.  El actor envía el formulario.
    5.  El sistema valida los datos. Si son correctos, crea el aviso en la base de datos, asociándolo a los cursos seleccionados.
    6.  El sistema notifica (visible en la plataforma) a los apoderados y alumnos de los cursos seleccionados sobre el nuevo aviso.
    7.  El sistema muestra un mensaje de éxito y redirige al actor a la lista de avisos.
-   **Flujos Alternativos**:
    -   **Error de validación**: Si faltan datos obligatorios, el sistema muestra mensajes de error junto a los campos correspondientes.

---

### **CU-03: Confirmación de lectura de un aviso**

-   **Actor Principal**: Apoderado.
-   **Precondición**: El actor ha iniciado sesión y tiene un aviso pendiente de leer.
-   **Flujo Principal**:
    1.  El actor navega a su lista de avisos y selecciona uno.
    2.  El sistema muestra el detalle completo del aviso.
    3.  Debajo del contenido, se muestra un botón "Confirmar Lectura".
    4.  El actor hace clic en el botón.
    5.  El sistema registra la confirmación en una subcolección del aviso, guardando el `uid` del apoderado y la fecha/hora.
    6.  El botón desaparece y es reemplazado por un texto informativo (ej. "Leído el dd/mm/aaaa a las hh:mm").
-   **Postcondición**: El aviso queda marcado como leído para ese apoderado, y el estado se refleja en la vista de seguimiento para profesores y administradores.
