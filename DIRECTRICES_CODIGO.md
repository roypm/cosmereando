# Cosmereando — Directrices de código

Reglas técnicas y de calidad para desarrollar Cosmereando.

## Principios de diseño

Estos principios son guías, no obligaciones absolutas.

### KISS — Keep It Simple

Preferir soluciones simples, legibles y fáciles de mantener. No añadir capas, abstracciones o dependencias si una solución directa cumple los requisitos.

### DRY — Don't Repeat Yourself

Reutilizar componentes, funciones, utilidades y estilos existentes. Antes de crear una funcionalidad nueva, comprobar si ya existe una solución reutilizable. No forzar la unificación de fragmentos que solo se parecen pero representan conceptos diferentes.

### YAGNI — You Aren't Gonna Need It

No implementar funcionalidades o arquitecturas para necesidades hipotéticas. Crear lo que el proyecto necesita actualmente.

### Separation of Concerns

Separar datos, traducciones, tipos, validación, acceso a datos, componentes, layouts, páginas, estilos e interacciones del navegador.

### Fail Fast

Detectar los errores cerca de su origen. El build debe fallar ante JSON inválido, traducciones incompletas o referencias inexistentes.

### Principle of Least Astonishment

Los nombres y comportamientos deben ser predecibles. Una función debe hacer lo que su nombre indica y no ocultar efectos secundarios.

### Composition over Inheritance

Preferir composición de componentes Astro y funciones reutilizables antes que jerarquías de clases.

### SOLID

SOLID será una referencia secundaria. Se priorizará Single Responsibility Principle. Dependency Inversion solo se aplicará si aparecen servicios sustituibles. Liskov Substitution e Interface Segregation solo serán relevantes si aparece una jerarquía real. No crear abstracciones únicamente para cumplir SOLID.

### Law of Demeter

Los módulos y componentes deben conocer solo las estructuras que necesitan. Usar funciones tipadas de acceso a datos en lugar de recorrer estructuras internas complejas desde la interfaz.

## Holistic Change Review

Before changing code, inspect the existing implementation and understand how the requested change interacts with the current structure, styles, behavior and responsive states.

Do not implement a new instruction as an isolated override. Preserve compatible previous decisions, identify conflicts and refactor or remove obsolete code instead of layering new rules on top of old ones.

Before applying changes:

1. Review the relevant files and surrounding components.
2. Identify dependencies, shared styles and affected responsive states.
3. Check whether the requested change conflicts with an existing implementation.
4. Define the smallest coherent change that solves the problem.
5. Remove obsolete rules, duplicated styles and contradictory behavior.
6. Review the complete affected area after editing.
7. Run the relevant checks and verify that previous functionality still works.

The goal is to maintain a coherent system rather than accumulating visual or structural patches. Never work with a narrow view of only the latest request; always consider the wider architecture and previous decisions.

## Reutilización

- Si una funcionalidad, componente, estilo o utilidad ya existe, debe reutilizarse.
- Extraer componentes cuando representen una pieza conceptual clara.
- No dividir cada elemento pequeño en un componente sin una razón útil.
- No duplicar lógica entre páginas, idiomas o componentes.
- Guardar cada dato una sola vez y usar IDs para relacionarlo.

## Idioma y nombres

Todo el código, nombres de archivos, componentes, variables, funciones, tipos, comentarios, mensajes técnicos y claves de traducción estará escrito en inglés.

- PascalCase: componentes Astro, clases y tipos.
- camelCase: variables, funciones y propiedades.
- kebab-case: archivos, páginas, rutas y clases CSS.
- UPPER_SNAKE_CASE: solo constantes globales.
- Evitar snake_case salvo que lo requiera una herramienta o formato externo.
- Usar nombres descriptivos y evitar abreviaturas ambiguas.

## Encoding

- Todos los archivos fuente, JSON, HTML y recursos de texto deben usar UTF-8.
- Las páginas HTML deben declarar `<meta charset="UTF-8">`.
- Los JSON deben guardarse sin una marca BOM incompatible.
- No sustituir caracteres correctamente escritos por entidades HTML innecesarias.

## Comentarios

Los comentarios serán principalmente separadores visuales de secciones, no explicaciones línea por línea.

Ejemplo:

    // ========================================
    // Navigation data
    // ========================================

- Usar títulos de sección claros en inglés.
- Agrupar el código por funcionalidad.
- Evitar comentarios que repitan literalmente el código.
- Añadir comentarios explicativos solo para decisiones no obvias.
- Usar bloques para secciones grandes y comentarios cortos para subsecciones.

## Arquitectura

Dirección general:

    Data and types -> validators and utilities -> components -> layouts and pages

- Evitar dependencias circulares.
- Las funciones de datos serán puras y no dependerán de estado global.
- Los componentes accederán a los datos mediante funciones tipadas como 'getWorkById()' o 'getSagaWorks()'.
- Las funciones tendrán una responsabilidad clara y serán aislables.
- Preferir async/await cuando la asincronía sea necesaria.
- Evitar asincronía innecesaria.
- Usar importaciones explícitas.
- Crear barrel files solo cuando mejoren realmente la organización.

## Astro y TypeScript

- Usar Astro como framework principal.
- Escribir la interfaz con HTML y CSS.
- Usar TypeScript en modo estricto.
- Evitar any salvo justificación clara.
- No añadir React ni otra librería de interfaz sin necesidad justificada.
- Usar JavaScript/TypeScript para mejorar la experiencia, no para hacer obligatoria la navegación.
- Usar APIs nativas del navegador.
- Aislar efectos secundarios en componentes o utilidades de interfaz.
- No usar una librería global de estado.
- Usar estado local y localStorage solo para preferencias persistentes.
- Manipular el DOM de forma mínima y con selectores estables.
- Usar clases CSS para estados visuales y atributos data-* para estados concretos.

## Datos JSON

- Todo el contenido estará en JSON.
- Habrá un JSON general para datos compartidos y JSON separados para inglés, español y catalán.
- Los datos compartidos se separarán por tipo: works.json, sagas.json, planets.json y routes.json.
- Los textos visibles no se escribirán directamente en componentes.
- Las claves de traducción serán jerárquicas y descriptivas, como navigation.routes.title.
- Los tres idiomas conservarán la misma estructura.
- Las claves faltantes o sobrantes se detectarán durante el build.
- Durante el desarrollo se podrá usar inglés como respaldo.
- Antes de publicar, el build fallará si falta una traducción.
- IDs y slugs serán únicos, estables, descriptivos y estarán en inglés.
- Las referencias inválidas harán fallar el build.
- Los datos derivados se calcularán durante el build.
- Los JSON serán legibles, con dos espacios y formato aplicado por Prettier.
- El orden de campos será: identificación, contenido, relaciones y presentación.
- Usar tipos TypeScript y esquemas de validación para datos importantes.
- Los errores indicarán archivo, campo e identificador problemático.

## Componentes y CSS

- Organizar el proyecto por responsabilidad y agrupar lo específico por sección.
- Usar estilos globales para reset, variables, tipografía y base.
- Mantener estilos específicos junto al componente o página.
- Mantener el layout compartido y los componentes reutilizables en las hojas globales de `src/styles`.
- Mantener los estilos específicos de una página junto a su componente Astro mediante `<style>` scoped cuando sea posible.
- Ordenar la cascada con las capas `tokens`, `base`, `layout`, `components`, `pages` y `overrides`.
- Usar `page-intro` como convención para la primera sección de páginas que incluyen breadcrumb.
- Usar CSS normal, no Tailwind.
- Usar BEM y clases en kebab-case.
- Mantener anidación y especificidad bajas.
- Evitar important; solo usarlo como excepción documentada.
- Usar variables CSS globales como fuente única de tokens visuales.
- Separar tokens para modo claro y oscuro.
- Aplicar colores de saga mediante data-saga y CSS.
- Evitar estilos inline salvo para valores dinámicos sin alternativa limpia.
- Usar reset ligero y box-sizing coherente.
- Mantener las media queries junto al componente.
- Usar una escala pequeña de capas CSS: base, header, sidebar, overlay y modal.

## Responsive y accesibilidad

- Aplicar mobile-first.
- Usar pocos breakpoints basados en necesidades reales.
- Preferir unidades fluidas, max-width, minmax() y clamp().
- Evitar desbordamientos globales y usar scroll local solo cuando sea necesario.
- Usar HTML semántico.
- Un solo h1 por página y jerarquía continua de encabezados.
- Usar enlaces HTML para navegación y botones para acciones.
- Las tarjetas enlazables serán un único enlace, sin enlaces anidados.
- Enlaces internos en la misma pestaña; externos en pestaña nueva con target="_blank" y rel="noreferrer".
- Todo icono interactivo tendrá nombre accesible.
- Mantener foco visible y contraste mínimo WCAG AA.
- Imágenes informativas con alt descriptivo; decorativas con alt vacío.
- Mantener los créditos separados del alt.
- Respetar prefers-reduced-motion.
- Revisar manualmente teclado, foco, contraste, encabezados, alt y navegación sin JavaScript antes de publicar.

## Errores y tests

- Usar errores tipados y mensajes claros en inglés.
- Los errores de datos y configuración serán explícitos.
- No dejar logs de depuración en producción.
- Usar Vitest para utilidades, datos y componentes.
- Playwright podrá añadirse más adelante.
- No fijar porcentaje mínimo de cobertura inicialmente.
- Nombrar tests según el comportamiento observable.
- Unit tests junto al código y tests de integración en tests/.
- Usar fixtures pequeñas para unit tests y JSON reales para integración.
- Cada test será independiente.
- No usar snapshots por defecto.
- Preferir aserciones específicas y legibles.

## Dependencias, entorno y scripts

- Evaluar cada dependencia por utilidad, mantenimiento, tamaño, licencia y seguridad.
- Usar pnpm y mantener el lockfile en Git.
- Fijar Node en .nvmrc y pnpm en package.json mediante packageManager.
- Usar Corepack en local y GitHub Actions.
- No guardar secretos en el repositorio.
- Usar .env y .env.example si son necesarios.
- Solo exponer variables explícitamente públicas al navegador.
- Ejecutar pnpm audit antes de publicar y valorar manualmente el resultado.
- Scripts estándar: dev, build, preview, lint, lint:fix, format, format:check, typecheck, test y check.
- format modifica archivos; format:check solo verifica.
- lint detecta; lint:fix intenta corregir.
- check ejecuta las comprobaciones principales.

## Git y publicación

- main es la rama estable y de despliegue.
- develop es la rama principal de desarrollo.
- Trabajar directamente en develop.
- No crear ramas temporales por feature.
- No usar Pull Requests durante el desarrollo.
- Organizar commits por feature o sección.
- Usar Conventional Commits en inglés.
- Cada commit debe representar un cambio lógico completo.
- Se permiten commits intermedios en develop si el proyecto compila.
- No integrar funcionalidades incompletas.
- Antes de publicar se podrán consolidar commits intermedios.
- Para publicar se abrirá una Pull Request de develop a main.
- La Pull Request exigirá revisión manual y todas las comprobaciones.
- main no permitirá pushes directos.
- La integración final usará merge commit.
- GitHub Actions hará comprobaciones rápidas en develop y completas en la Pull Request.
- Los errores bloquean; las advertencias se revisan.
- Los cambios en main desplegarán automáticamente.
- Las versiones usarán etiquetas semánticas manuales.
- CHANGELOG.md se actualizará antes de cada publicación.
- La documentación afectada se actualizará en el mismo commit o feature.

## Documentación y revisión

README.md incluirá requisitos, instalación, comandos, estructura, flujo de Git y cómo añadir contenido.

Antes de aceptar cambios relevantes:

1. Revisar reutilización y ausencia de duplicación.
2. Revisar nombres y comentarios.
3. Ejecutar pnpm check.
4. Revisar accesibilidad antes de publicar.
5. Confirmar datos y traducciones válidos.
6. Confirmar documentación actualizada.
7. Confirmar que no se añadieron dependencias innecesarias.

Las decisiones visuales y de contenido permanecen en DECISIONES.md.
