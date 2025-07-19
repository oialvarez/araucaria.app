# 5. Criterios de Aceptación

Este documento define los criterios que una funcionalidad debe cumplir para ser aceptada como completa. Sirve como una lista de verificación para el desarrollo y las pruebas de QA.

---

### **AC-01: Registro de Usuario por Invitación**

-   **Escenario**: Un usuario se registra usando un enlace de invitación.
    -   **Dado** que he recibido un enlace de invitación por correo.
    -   **Cuando** hago clic en el enlace.
    -   **Entonces** soy redirigido a una página de registro con mi email pre-rellenado y no editable.
    -   **Y** completo mi nombre y contraseña.
    -   **Entonces** mi cuenta es creada con el rol y colegio correctos.
    -   **Y** el enlace de invitación ya no puede ser utilizado de nuevo.

-   **Escenario**: Intento de usar un enlace inválido.
    -   **Dado** que tengo un enlace de invitación que ya fue usado o ha expirado.
    -   **Cuando** intento acceder a él.
    -   **Entonces** veo una página de error clara que me informa sobre el estado del enlace.

---

### **AC-02: Creación de un Aviso**

-   **Escenario**: Un profesor crea un nuevo aviso.
    -   **Dado** que soy un usuario con rol de "Profesor" y he iniciado sesión.
    -   **Cuando** navego a la sección de avisos y lleno el formulario de creación (título, descripción, cursos).
    -   **Y** presiono "Enviar".
    -   **Entonces** el aviso es creado y visible para los apoderados y alumnos de los cursos seleccionados.
    -   **Y** recibo una confirmación visual de que el aviso fue creado con éxito.

---

### **AC-03: Confirmación de Lectura de Aviso**

-   **Escenario**: Un apoderado confirma la lectura de un aviso.
    -   **Dado** que soy un usuario con rol de "Apoderado" y tengo un aviso sin leer.
    -   **Cuando** abro el aviso.
    -   **Y** hago clic en el botón "Confirmar Lectura".
    -   **Entonces** el sistema registra mi confirmación con mi usuario y la fecha/hora.
    -   **Y** el botón de confirmación es reemplazado por un mensaje que indica que ya fue leído.

-   **Escenario**: Un profesor revisa el estado de lectura.
    -   **Dado** que soy "Profesor" o "Administrador".
    -   **Cuando** veo un aviso que he creado.
    -   **Entonces** puedo ver una lista o un contador de los apoderados que han confirmado la lectura.

---

### **AC-04: Gestión de Usuarios (CRUD por Administrador)**

-   **Escenario**: Un administrador de colegio gestiona usuarios.
    -   **Dado** que soy "Administrador de Colegio".
    -   **Cuando** accedo al panel de gestión de usuarios.
    -   **Entonces** puedo ver, crear, editar y eliminar usuarios únicamente dentro de mi propio colegio.
    -   **Y** no puedo ver ni afectar a usuarios de otros colegios.
