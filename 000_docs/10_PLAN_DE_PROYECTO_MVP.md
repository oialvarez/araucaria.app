# Plan de Acción para el MVP de Araucaria App

**Versión:** 1.0
**Fecha:** 2025-07-18

## 1. Diagnóstico y Conclusión

Tras una revisión exhaustiva de la documentación, se concluye que el proyecto Araucaria App posee una base de backend robusta y bien diseñada. Sin embargo, existe una **brecha crítica** entre las capacidades del backend y las funcionalidades expuestas en el frontend. El MVP, definido como un sistema de comunicación de avisos, no es actualmente funcional.

- **Fortalezas:** Arquitectura sólida, modelo de datos coherente, backend funcional.
- **Debilidades:** Frontend incompleto, falta de interfaces para las funcionalidades clave del MVP.
- **Riesgo Principal:** Desvío de recursos en funcionalidades no esenciales (ej. "Tareas").

## 2. Objetivo del Plan

Este plan tiene como objetivo **alinear el desarrollo del frontend con las capacidades del backend para completar el MVP** y entregar un producto funcional que resuelva el problema de comunicación entre colegios y apoderados.

## 3. Definición y Alcance del MVP (Scope)

El MVP se centrará exclusivamente en el flujo de **creación y consulta de avisos**. Las funcionalidades que no contribuyan directamente a este flujo serán pospuestas.

### Funcionalidades **DENTRO** del Alcance del MVP:

1.  **Gestión de Cursos (Admin):** Crear, ver, editar y eliminar cursos dentro de un colegio.
2.  **Gestión de Alumnos (Admin):** Matricular, ver, editar y eliminar alumnos, asociándolos a sus cursos y apoderados.
3.  **Gestión de Avisos (Profesor/Admin):** Crear, ver, editar y eliminar avisos para cursos específicos.
4.  **Consulta de Avisos (Apoderado):** Ver los avisos de los cursos de sus hijos y marcarlos como leídos.
5.  **Dashboard de Roles:** Vistas personalizadas para cada rol (Admin, Profesor, Apoderado) que muestren solo la información y acciones pertinentes.

### Funcionalidades **FUERA** del Alcance del MVP:

1.  **Módulo de "Tareas":** Se congela su desarrollo. No se invertirá más tiempo en esta funcionalidad.
2.  **Gestión de Super Administrador:** Se asume que la gestión de colegios se realiza manualmente o con la interfaz ya creada. No se desarrollarán más vistas para este rol en el MVP.
3.  **Notificaciones Push/Email en tiempo real:** Las notificaciones se gestionarán en una fase post-MVP.

## 4. Fases de Ejecución (Roadmap)

El plan se divide en tres fases secuenciales. Cada fase construye sobre la anterior, siguiendo una progresión lógica.

### **Fase 1: Cimientos de la Gestión Académica (Frontend)**
*Objetivo: Permitir a los administradores configurar la estructura del colegio.*

- **Tarea 1.1:** Desarrollar la interfaz de **Gestión de Cursos** (CRUD completo).
- **Tarea 1.2:** Desarrollar la interfaz de **Gestión de Alumnos** (CRUD completo).
- **Hito de Fase 1:** Un administrador puede iniciar sesión, crear un curso, y matricular a un alumno en ese curso.

### **Fase 2: El Corazón de la Comunicación (Frontend)**
*Objetivo: Habilitar el flujo principal de creación y consumo de avisos.*

- **Tarea 2.1:** Desarrollar la interfaz de **Gestión de Avisos** para Profesores/Administradores (CRUD completo).
- **Tarea 2.2:** Desarrollar la vista de **Consulta de Avisos** para Apoderados (incluir botón "Marcar como leído").
- **Tarea 2.3:** Implementar la lógica para que los profesores vean quién ha leído el aviso.
- **Hito de Fase 2:** Un profesor puede enviar un aviso a un curso y un apoderado de ese curso puede leerlo.

### **Fase 3: Pruebas y Refinamiento (QA y UI/UX)**
*Objetivo: Asegurar la calidad y usabilidad del MVP.*

- **Tarea 3.1:** Ejecutar el plan de pruebas de QA (ver `12_ESTRATEGIA_QA.md`).
- **Tarea 3.2:** Realizar pruebas de usabilidad (UX) con los flujos completos.
- **Tarea 3.3:** Corregir bugs y realizar ajustes de UI basados en el feedback.
- **Hito de Fase 3:** MVP funcional, probado y listo para un lanzamiento controlado.

## 5. Próximos Pasos

1.  Revisar y validar este plan con el equipo de desarrollo.
2.  Detallar los requisitos funcionales en `11_REQUISITOS_FUNCIONALES_MVP.md`.
3.  Definir la estrategia de pruebas en `12_ESTRATEGIA_QA.md`.
4.  Comenzar la ejecución de la Fase 1.
