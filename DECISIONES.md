# Cosmereando — Decisiones del proyecto

Registro de decisiones tomadas para la web estática sobre el Cosmere de Brandon Sanderson.

## Objetivo y contenido

- Será una guía clara y didáctica para nuevos lectores.
- Incluirá todo el Cosmere publicado: novelas, novelas cortas, relatos, novelas gráficas y material complementario.
- La portada explicará qué es el Cosmere, de dónde surge, quién lo escribió y por qué leerlo.
- La información sobre Brandon Sanderson será una mención sencilla centrada en su relación con el Cosmere.
- La sección “Por qué leer el Cosmere” combinará una explicación objetiva con una recomendación personal.
- El contenido tendrá niveles de spoilers: sin spoilers, spoilers leves y spoilers completos.
- El contenido sensible tendrá avisos visibles y podrá ocultarse hasta que el visitante lo revele.

## Identidad

- Nombre: **Cosmereando**.
- Subtítulo: **A reader’s guide to the Cosmere**.
- Logo tipográfico con un símbolo SVG de una galaxia.
- La galaxia será minimalista, formada por puntos y estrellas.
- Se usarán SVG para el logo, iconos, símbolos, diagramas y mapas.
- Tipografías:
  - Cormorant Garamond para títulos.
  - Inter para textos.
- Las fuentes se cargarán desde Google Fonts.

## Idiomas

- Idioma predeterminado: inglés.
- Idiomas disponibles: inglés, español y catalán.
- Se detectará automáticamente el idioma del navegador y habrá selector manual.
- Inglés en la raíz; español en /es/ y catalán en /ca/.
- Se preparará SEO multilingüe con metadatos por idioma, sitemap y etiquetas hreflang.
- Las traducciones se escribirán manualmente en los JSON.
- Se usarán sinopsis oficiales en cada idioma cuando existan.

## Navegación

- Será un sitio de varias páginas estáticas con navegación estilo documentación.
- Menú lateral:
  - Inicio.
  - Rutas.
  - Libros.
  - Sagas.
  - Planetas.
- Créditos aparecerá solo en el pie de página.
- El menú será visible en escritorio y plegable en móvil.
- Tendrá secciones desplegables:
  - Rutas: rutas comunitarias, orden de publicación y mi recorrido.
  - Sagas: cada saga.
  - Planetas: cada planeta.
- Los elementos variables de Rutas, Libros, Sagas y Planetas se generarán desde los JSON compartidos, no desde listas escritas en los componentes.
- Las páginas individuales tendrán índice lateral, migas de pan y enlaces anterior/siguiente.
- La portada seguirá este orden:
  1. Bienvenida visual.
  2. Qué es el Cosmere.
  3. Quién lo escribió.
  4. Por qué leerlo.
  5. Rutas.
  6. Accesos a Libros, Sagas y Planetas.

### Rutas

- Habrá una página general de rutas y una página individual para cada ruta:
  - Rutas recomendadas por la comunidad.
  - Orden de publicación.
  - Mi recorrido por el Cosmere.
- Las rutas comunitarias incluirán una ruta TOP y otras rutas encontradas por el creador.
- No se atribuirán las rutas a personas concretas ni se incluirán fuentes individuales.
- Todas las rutas incluirán novelas, novelas cortas, relatos y novelas gráficas.
- Cada ruta será una lista numerada continua.
- Cada paso mostrará número, portada, título, tipo de obra y enlace.
- El orden cronológico significará orden de publicación.
- “Mi recorrido por el Cosmere” será el orden personal en que el creador leyó las obras, incluyendo lo leído y señalando lo que falte.

### Libros

- La página de Libros mostrará todas las obras agrupadas visualmente por saga.
- Habrá un grupo independiente llamado **Standalone**.
- Cada obra aparecerá como tarjeta resumida con título, portada, tipo y enlace a la saga.
- No habrá una página independiente para cada libro.
- Los datos completos aparecerán directamente dentro de la página de su saga.

### Sagas

- Habrá una página índice y una página individual para cada saga.
- Cada página de saga incluirá nombre, descripción breve, portada o imagen representativa, planeta y lista de obras.
- Las fichas completas de las obras estarán dentro de la página de la saga.

### Planetas

- Se usará “Planetas” en lugar de “Mundos”.
- Habrá una página índice y una página individual para cada planeta.
- Cada página incluirá nombre, imagen o mapa, descripción breve, sagas relacionadas, obras y sistema de magia.
- Habrá una sección propia de sistemas de magia, organizada por arte y mundo de origen.
- La sección comenzará como un catálogo editorial enlazado a las páginas de planetas y podrá crecer hacia fichas individuales.
- Las páginas de planeta usarán una paleta neutra.

## Fichas de obras

Cada ficha tendrá:

- Título.
- Portada.
- Primera fecha de publicación original, normalmente en inglés.
- Saga.
- Planeta.
- Sinopsis oficial.
- Indicación de si es una obra individual o una historia perteneciente a otro libro.

Tipos de obra:

- Novela.
- Novela corta.
- Relato del Arcanum.
- Novela gráfica.

Reglas:

- Las obras independientes mostrarán **Standalone** en el campo saga.
- Si el planeta no debe especificarse, aparecerá **No especificado**.
- Las historias cortas de una saga irán dentro de esa saga.
- Arcanum Ilimitado se dividirá por las historias que contiene.

## Diseño visual

- Estilo limpio y editorial.
- Modo claro y oscuro.
- El modo inicial detectará la preferencia del sistema y podrá cambiarse manualmente.
- La paleta base usará grises neutros.
- Cada saga tendrá un color propio, coherente y accesible.
- Los colores se usarán de forma sutil en todo el sitio y más visiblemente en cada página de saga.
- Las tarjetas de Sagas, Planetas y Libros usarán una cuadrícula responsive: varias columnas en escritorio y una en móvil.
- Las imágenes de las tarjetas tendrán proporción uniforme.
- Las tarjetas mostrarán imagen, nombre, descripción breve, número de obras y planeta relacionado cuando corresponda.
- El foco o hover producirá elevación y cambio sutil de borde.
- Habrá animaciones sutiles y se respetará prefers-reduced-motion.
- El contenido tendrá ancho limitado para facilitar la lectura.
- Las imágenes se integrarán junto al contenido cuando mejoren la composición: la imagen de bienvenida y el retrato del autor podrán colocarse junto al texto en escritorio y pasarán a una columna en móvil.
- Se evitará colocar imágenes aisladas justo debajo de cada bloque de texto; las imágenes de libros, sagas y planetas se integrarán principalmente dentro de sus tarjetas o composiciones asociadas.
- La imagen de bienvenida será una imagen que encontrará el creador; su formato se decidirá según la composición.

## Imágenes y créditos

- Se usarán portadas originales e ilustraciones de fans, incluyendo mapas.
- Cada imagen tendrá un alt descriptivo para accesibilidad.
- Habrá una única página global de créditos.
- Los créditos serán una lista sencilla con imagen, autor y fuente.
- La página incluirá una nota indicando que las imágenes pertenecen a sus autores y que los créditos no implican propiedad.
- Se comprobarán permisos y licencias: descargar una imagen gratis no implica automáticamente permiso de reutilización.
- El proyecto se identificará como no oficial y hecho por fans, sin afiliación con Brandon Sanderson ni sus editoriales.

## Actualización

- Habrá una única fecha global de actualización.
- Se mostrará en el pie de página.
- El texto y formato se adaptarán al idioma, por ejemplo: Last updated: 20 August 2026.
- No se mostrará la hora.
- La fecha se modificará manualmente desde un único archivo de configuración.

## Pie de página

Incluirá:

- Enlace a la página global de créditos.
- Licencia del sitio.
- Created by roypm.
- Enlace a https://github.com/roypm/cosmereando.
- Fecha de última actualización.
- Versión actual del sitio con versionado semántico.

## Licencias

- Código: MIT.
- Contenido original: Creative Commons BY-NC-SA.
- Portadas, ilustraciones, textos oficiales y demás materiales de terceros conservarán sus propios derechos.

## Tecnología y datos

- Framework: Astro.
- HTML, CSS y TypeScript, sin React ni otra librería de interfaz innecesaria.
- CSS normal, no Tailwind.
- Todo el contenido estará en JSON.
- Habrá un JSON general para datos compartidos y tres JSON de textos:
  - Inglés.
  - Español.
  - Catalán.
- Los datos compartidos se separarán por tipo, por ejemplo:
  - works.json
  - sagas.json
  - planets.json
  - routes.json
- Los identificadores y slugs estarán en inglés y serán iguales en los tres idiomas, por ejemplo /sagas/mistborn y /planets/roshar.
- No habrá analítica, seguimiento ni cookies de seguimiento.
- No se añadirán banners innecesarios.

## Publicación

- El proyecto quedará preparado para GitHub Pages, Vercel, Netlify u otra plataforma.
- El dominio todavía no se decidirá.
- El repositorio remoto es https://github.com/roypm/cosmereando.

## Estado inicial

- El repositorio está prácticamente vacío: solo contiene README.md y LICENSE.
- La siguiente fase será crear el prototipo y la estructura inicial de Astro.
