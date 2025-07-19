# Estrategia de Calidad (QA) para el MVP

**Versión:** 1.0
**Fecha:** 2025-07-18

Este documento define la estrategia de aseguramiento de la calidad para el MVP de Araucaria App.

## 1. Objetivos de Calidad

- **Funcionalidad:** Asegurar que todos los requisitos del MVP (`11_REQUISITOS_FUNCIONALES_MVP.md`) se cumplan sin errores críticos.
- **Usabilidad:** Garantizar que los flujos de usuario sean intuitivos y fáciles de usar para los roles definidos.
- **Seguridad:** Verificar que los permisos de los roles se apliquen correctamente en el frontend.

## 2. Tipos de Pruebas

- **Pruebas Unitarias:** Cada componente de Svelte y cada función de utilidad deben tener sus propias pruebas unitarias.
- **Pruebas de Integración:** Se probará la interacción entre los componentes del frontend y las llamadas a las Firebase Functions para asegurar que los datos fluyen correctamente.
- **Pruebas End-to-End (E2E):** Se simularán los flujos de usuario completos para validar la lógica de negocio de principio a fin.

## 3. Casos de Prueba E2E (Alto Nivel)

- **CT-E2E-01 (Flujo Admin Completo):**
  1. Iniciar sesión como Administrador.
  2. Crear un nuevo Curso.
  3. Crear un nuevo Alumno y asignarlo al curso y a un Apoderado.
  4. Crear un Aviso y dirigirlo al curso creado.
  5. Cerrar sesión.

- **CT-E2E-02 (Flujo Apoderado):**
  1. Iniciar sesión como el Apoderado del alumno creado en el caso anterior.
  2. Verificar que el Aviso es visible en su dashboard.
  3. Abrir el Aviso, ver el contenido y marcarlo como leído.
  4. Verificar que el estado cambia a "Leído".
  5. Cerrar sesión.

- **CT-E2E-03 (Verificación de Lectura Profesor):**
  1. Iniciar sesión como el Profesor/Admin que creó el aviso.
  2. Navegar a la vista de "Avisos Enviados".
  3. Verificar que el sistema indica que el Apoderado ha leído el aviso.

## 4. Herramientas

- **Pruebas Unitarias/Integración:** Vitest, Svelte Testing Library.
- **Pruebas E2E:** Playwright o Cypress (a definir por el equipo técnico).
- **Gestión de Incidencias:** GitHub Issues.
