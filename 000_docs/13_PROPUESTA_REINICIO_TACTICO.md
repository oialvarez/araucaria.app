# Propuesta de Reinicio Táctico

**Versión:** 1.0
**Fecha:** 2025-07-18

## 1. Diagnóstico del Problema Raíz

El proyecto se encuentra estancado no por una mala elección tecnológica fundamental (Svelte y Firebase son excelentes), sino por dos cuellos de botella específicos en la ejecución:

1.  **Fricción en el Desarrollo de UI:** El equipo está invirtiendo un esfuerzo desproporcionado en la construcción y estilización de componentes de UI básicos, en lugar de enfocarse en la lógica de la aplicación. Esto es ineficiente y desmotivador.
2.  **Comunicación Ambivalente con el Backend:** La falta de un "contrato" formal entre el frontend y las Cloud Functions genera confusión, retrabajo y errores difíciles de depurar.

Cambiar de framework (ej. a React) o de plataforma de backend no solucionará estos problemas de raíz; solo los trasladará a un nuevo entorno tecnológico.

## 2. La Solución: Un Reinicio Táctico

Proponemos un **reinicio en la estrategia, no en el código**. Mantenemos la pila tecnológica actual pero adoptamos un enfoque más industrializado y disciplinado para resolver los cuellos de botella.

### Estrategia 1: Industrializar el Desarrollo del Frontend con una Librería de Componentes

Dejaremos de construir componentes de UI desde cero. Adoptaremos una librería de componentes profesional y bien mantenida para Svelte. Esto nos proporciona de inmediato:

- **Componentes listos para usar:** Botones, formularios, tablas, modales, etc.
- **Consistencia visual:** Un tema coherente y profesional.
- **Accesibilidad (a11y):** Componentes diseñados siguiendo las mejores prácticas.
- **Aumento radical de la productividad:** El equipo se centrará en ensamblar interfaces, no en construir ladrillos.

**Recomendación de Librería:**

- **Opción A (Recomendada): [shadcn-svelte](https://www.shadcn-svelte.com/)** - Extremadamente popular, estéticamente agradable, personalizable y sigue las mejores prácticas. Es el estándar de facto en el ecosistema de Svelte/React para desarrollo rápido y de calidad.
- **Opción B: [Melt UI](https://melt-ui.com/)** - Una librería de componentes "headless" que da más control sobre los estilos, pero requiere más trabajo de configuración inicial. Es la base de shadcn-svelte.

**Plan de Acción Inmediato:**
1.  **Decidir la librería de componentes.** (Recomendación: shadcn-svelte).
2.  **Integrar la librería** en el proyecto `web-app`.
3.  **Refactorizar una vista existente** (ej. el formulario de login o de creación de colegios) usando los nuevos componentes para validar la integración. Este será un prototipo rápido para demostrar el aumento de velocidad.

### Estrategia 2: Formalizar la Comunicación con un Contrato de API

Crearemos un documento único y centralizado que defina cada endpoint de las Cloud Functions, sus parámetros de entrada, su formato de respuesta y los posibles códigos de error.

**Plan de Acción Inmediato:**
1.  **Crear el documento `20_API_CONTRACT.md`** en la carpeta `000_docs`.
2.  **Documentar un endpoint existente** (ej. `createColegio`) como plantilla, especificando:
    - **Endpoint:** `POST /createColegio`
    - **Rol Requerido:** `Super Administrador`
    - **Request Body (JSON):** `{ nombre: string, direccion: string, ... }`
    - **Response Success (200 OK):** `{ colegioId: string, mensaje: string }`
    - **Response Error (400 Bad Request):** `{ error: "Faltan campos obligatorios" }`
    - **Response Error (403 Forbidden):** `{ error: "Permiso denegado" }`
3.  **Completar la documentación** para todas las funciones existentes antes de desarrollar nuevas interfaces.

## 3. Conclusión y Próximos Pasos

Este enfoque de **Reinicio Táctico** mitiga los riesgos, conserva la inversión ya realizada y ataca directamente las causas del estancamiento. En lugar de una demora de meses por un reinicio total, podríamos ver un aumento de productividad en cuestión de días.

**Próximos Pasos Recomendados:**

1.  **Validar esta propuesta** con el equipo técnico.
2.  **Ejecutar el plan de acción inmediato:** Integrar la librería de componentes y crear el borrador del contrato de API.
3.  **Reanudar el plan de desarrollo del MVP** (`10_PLAN_DE_PROYECTO_MVP.md`) utilizando el nuevo enfoque.
