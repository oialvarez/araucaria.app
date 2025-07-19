# Documento de Alcance

## 1. Introducción

Este documento define el alcance del proyecto de desarrollo de un sistema de gestión de avisos para colegios. El sistema permitirá a los profesionales de la educación y administradores enviar avisos a los apoderados, quienes podrán confirmar la lectura de los mismos. Los alumnos también tendrán acceso a la información del curso y los avisos, pero no podrán acusar recibo. El sistema se desarrollará utilizando **Firebase** y **Svelte**, y estará orientado a una plataforma web.

## 2. Objetivos del Proyecto

*   **Objetivo Principal**: Desarrollar un sistema que permita a los profesionales de la educación y administradores enviar avisos a los apoderados, quienes podrán confirmar la lectura de los mismos. Los alumnos podrán ver la información del curso y los avisos, pero no acusar recibo.
*   **Objetivos Secundarios**:
    *   Implementar un sistema de autenticación seguro mediante correo electrónico.
    *   Asegurar que el sistema sea accesible para personas con discapacidades visuales (daltónicos y ciegos).
    *   Cumplir con las normativas de protección de datos de Chile.

## 3. Alcance del Proyecto

### 3.1. Funcionalidades Principales (MVP)

*   **Gestión de Avisos**:
    *   Crear avisos (profesionales de la educación y administradores).
    *   Leer avisos (todos los usuarios).
    *   Actualizar avisos (el creador del aviso y el administrador).
    *   Eliminar avisos (el creador del aviso y el administrador).
    *   Confirmación de lectura de avisos (apoderados).
    *   Marcación de avisos como realizados (profesionales de la educación y administradores).
*   **Autenticación y Autorización**:
    *   Registro de usuario.
    *   Inicio de sesión.
    *   Recuperación de contraseña.
    *   Roles de usuario:
        *   **Super Administrador**: Gestiona colegios.
        *   **Administrador**: Gestiona cursos, usuarios y avisos.
        *   **Profesional de la Educación**: Gestiona avisos.
        *   **Apoderado**: Puede ver avisos y confirmar su lectura.
        *   **Alumno**: Puede ver la información del curso y los avisos, pero no confirmar su lectura.

### 3.2. Funcionalidades Secundarias (Futuras Fases)

*   **Gestión de Colegios (Super Administrador)**:
    *   Crear colegios.
    *   Leer información de los colegios.
    *   Actualizar información de los colegios.
    *   Eliminar colegios.
*   **Gestión de Cursos (Administrador)**:
    *   Crear cursos.
    *   Leer información de los cursos.
    *   Actualizar información de los cursos.
    *   Eliminar cursos.

### 3.3. Requisitos No Funcionales

*   **Seguridad**: Encriptación de contraseñas, protección contra ataques comunes (SQL Injection, XSS, CSRF), y cumplimiento con las normativas de protección de datos.
*   **Escalabilidad**: El sistema debe soportar un mínimo de **507 usuarios iniciales** (27 profesionales de la educación, 160 alumnos, 160 apoderados y 160 apoderados suplentes) y escalar a medida que se agreguen más cursos y usuarios.
*   **Usabilidad**: Interfaz intuitiva y fácil de usar para todos los roles de usuarios.
*   **Diseño Responsivo**: La aplicación debe adaptarse a diferentes tamaños de pantalla (móviles, tablets, desktops).
*   **Accesibilidad**: Cumplir con los estándares WCAG AA y considerar la accesibilidad para daltónicos y ciegos.

## 4. Exclusiones

*   **Integración con Sistemas Externos**: No se incluirá la integración con sistemas de gestión escolar o APIs de terceros, excepto la autenticación mediante correo electrónico (Google).
*   **Funcionalidades Avanzadas**: No se incluirán funcionalidades avanzadas como análisis de datos o informes en el MVP.

## 5. Stakeholders

*   **Stakeholders Clave**:
    *   Directores de colegios.
    *   Profesionales de la educación (27 usuarios).
    *   Apoderados (160 usuarios) y apoderados suplentes (160 usuarios).
    *   Alumnos (160 usuarios).
*   **Patrocinadores del Proyecto**: Los dos integrantes del equipo de desarrollo.

## 6. Métricas de Éxito

*   **Número de Usuarios**: Inicialmente, el sistema debe soportar 507 usuarios (27 profesionales de la educación, 160 alumnos, 160 apoderados y 160 apoderados suplentes).
*   **Tiempo de Respuesta**: Inferior a 2 segundos.
*   **Crecimiento del Sistema**: Monitorear el número de cursos agregados mensualmente, trimestralmente y anualmente.

## 7. Riesgos

*   **Riesgos Técnicos**: Restricciones legales con respecto al uso de datos y privacidad.
*   **Riesgos Operativos**: Falta de interés por parte de los colegios en adoptar el sistema.

## 8. Consideraciones Adicionales

*   **Apoderados**: Pueden ser hasta dos apoderados por alumno (160 apoderados principales y 160 apoderados suplentes).
*   **Profesionales de la Educación**: Un colegio tiene 27 profesionales de la educación.
*   **Administradores**: Un colegio debe tener al menos dos administradores.
*   **Colegio Inicial**: El colegio inicial tiene:
    *   27 profesionales de la educación.
    *   160 alumnos.
    *   160 apoderados principales.
    *   160 apoderados suplentes.

## 9. Conclusión

El alcance del proyecto está bien definido, con un enfoque claro en el desarrollo del MVP. Se han identificado las funcionalidades principales, los requisitos no funcionales y los riesgos asociados. El sistema debe ser escalable para soportar un mínimo de 507 usuarios iniciales y debe cumplir con los estándares de seguridad, usabilidad y accesibilidad. El proyecto está listo para avanzar a la fase de diseño y desarrollo.
