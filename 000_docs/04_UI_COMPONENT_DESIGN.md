# Diseño de Componentes de UI (Atomic Design)

Este documento detalla los componentes de la interfaz de usuario (UI) de la aplicación Araucaria, siguiendo la metodología de "atomic design".

## 1. Átomos

Los átomos son los bloques de construcción más básicos de la UI.

### 1.1. Botones

-   **Botón Primario**: Para acciones principales (ej. "Enviar", "Guardar").
-   **Botón Secundario**: Para acciones secundarias (ej. "Cancelar").
-   **Botón de Enlace**: Parece un enlace pero tiene comportamiento de botón.

### 1.2. Inputs

-   **Input de Texto**: Campo estándar para texto.
-   **Input de Contraseña**: Campo para contraseñas con visibilidad opcional.
-   **Textarea**: Para textos largos.
-   **Checkbox**: Para opciones de sí/no.
-   **Radio Button**: Para seleccionar una opción de un grupo.

### 1.3. Etiquetas (Labels)

-   Asociadas a cada input para accesibilidad.

### 1.4. Iconos

-   Iconos SVG para acciones comunes (ej. cerrar, editar, eliminar).

## 2. Moléculas

Las moléculas son grupos de átomos que funcionan juntos como una unidad.

### 2.1. Formulario de Búsqueda

-   Compuesto por un `Input de Texto` y un `Botón Primario` ("Buscar").

### 2.2. Campo de Formulario

-   Compuesto por una `Etiqueta` y un `Input` (texto, contraseña, etc.).

## 3. Organismos

Los organismos son secciones más complejas de la UI compuestas por moléculas y/o átomos.

### 3.1. Tarjeta de Noticia (Notice Card)

-   Muestra un resumen de una noticia, con título, fecha y un `Botón de Enlace` para "Leer más".

### 3.2. Formulario de Contacto

-   Agrupa varios `Campos de Formulario` y un `Botón Primario` para enviar.

### 3.3. Cabecera (Header)

-   Contiene el logo de la aplicación y la navegación principal.

## 4. Plantillas (Templates)

Las plantillas son esqueletos de páginas que muestran la estructura del contenido.

### 4.1. Plantilla de Dashboard

-   Estructura de la página principal del administrador, con una `Cabecera`, un menú lateral y un área de contenido para `Tarjetas de Noticia`.

### 4.2. Plantilla de Login

-   Contiene un `Formulario de Login` centrado en la página.

## 5. Páginas (Pages)

Las páginas son instancias específicas de las plantillas con contenido real.

-   **Página de Login**: Instancia de la `Plantilla de Login`.
-   **Página de Dashboard**: Instancia de la `Plantilla de Dashboard` con noticias reales.
