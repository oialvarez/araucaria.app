# Contrato de API - Araucaria App

**Versión:** 1.0
**Fecha:** 2025-07-18

Este documento es la fuente única de verdad para la comunicación entre el frontend (`web-app`) y el backend (`functions`). Toda nueva funcionalidad o cambio en un endpoint debe ser reflejado aquí.

---

## Gestión de Colegios

### `createColegio`

- **Descripción:** Registra un nuevo colegio en la plataforma.
- **Endpoint:** `POST /createColegio`
- **Rol Requerido:** `Super Administrador`
- **Request Body (JSON):**
  ```json
  {
    "nombre": "string",
    "direccion": "string",
    "email": "string",
    "telefono": "string"
  }
  ```
- **Response Success (200 OK):**
  ```json
  {
    "colegioId": "<ID_DEL_NUEVO_COLEGIO>",
    "mensaje": "Colegio creado exitosamente"
  }
  ```
- **Respuestas de Error:**
  - `400 Bad Request`: `{ "error": "Faltan campos obligatorios: [campo]" }`
  - `401 Unauthorized`: `{ "error": "Token de autenticación no válido o ausente" }`
  - `403 Forbidden`: `{ "error": "Permiso denegado. Se requiere rol de Super Administrador." }`

---

## Gestión de Usuarios

*Aquí se documentarán los endpoints `createUser`, `updateUser`, `deleteUser`...*

---

## Gestión de Cursos

*Aquí se documentarán los endpoints `createCurso`, `updateCurso`, `deleteCurso`...*

---

## Gestión de Alumnos

*Aquí se documentarán los endpoints `createAlumno`, `updateAlumno`, `deleteAlumno`...*

---

## Gestión de Avisos

*Aquí se documentarán los endpoints `createAviso`, `updateAviso`, `deleteAviso`, `markAvisoAsRead`...*
