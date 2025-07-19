# Requisitos Funcionales Detallados del MVP

**Versión:** 1.0
**Fecha:** 2025-07-18

Este documento detalla los requisitos funcionales para cada módulo del MVP. Se basa en el `10_PLAN_DE_PROYECTO_MVP.md`.

## Módulo 1: Gestión de Cursos (Rol: Administrador)

- **RF-1.1:** El sistema debe permitir crear un curso con los campos: `nombre`, `descripción`, `código`.
- **RF-1.2:** El sistema debe mostrar una lista paginada de todos los cursos del colegio.
- **RF-1.3:** El sistema debe permitir editar los campos de un curso existente.
- **RF-1.4:** El sistema debe permitir eliminar un curso, previa confirmación.

## Módulo 2: Gestión de Alumnos (Rol: Administrador)

- **RF-2.1:** El sistema debe permitir crear un alumno con los campos: `nombre`, `curso`, `apoderado` (seleccionado de una lista de usuarios existentes).
- **RF-2.2:** El sistema debe mostrar una lista paginada de todos los alumnos, con filtros por curso.
- **RF-2.3:** El sistema debe permitir editar los datos de un alumno.
- **RF-2.4:** El sistema debe permitir eliminar un alumno, previa confirmación.

## Módulo 3: Gestión de Avisos (Roles: Administrador, Profesor)

- **RF-3.1:** El sistema debe permitir crear un aviso con: `título`, `descripción`, `fecha de publicación`, y la opción de adjuntar un archivo (PDF, JPG, PNG, DOCX - máx 10MB).
- **RF-3.2:** Al crear un aviso, el sistema debe permitir seleccionar uno o más cursos a los que se dirige.
- **RF-3.3:** El sistema debe mostrar una lista de los avisos creados por el usuario.
- **RF-3.4:** El sistema debe permitir editar y eliminar los avisos creados.

## Módulo 4: Consulta de Avisos (Rol: Apoderado)

- **RF-4.1:** El sistema debe mostrar al apoderado una lista de avisos de los cursos donde sus hijos están matriculados.
- **RF-4.2:** Cada aviso en la lista debe mostrar `título`, `fecha` y un indicador de si ha sido leído o no.
- **RF-4.3:** Al hacer clic en un aviso, el apoderado debe poder ver el detalle completo y los archivos adjuntos.
- **RF-4.4:** El sistema debe permitir al apoderado marcar un aviso como "leído". Una vez marcado, el estado debe actualizarse visualmente.
