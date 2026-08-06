# Portfolio en HTML, CSS y JavaScript puro

Portfolio multipágina construido **sin frameworks ni herramientas de build**: solo HTML semántico, CSS escrito a mano y JavaScript vanilla.

Proyecto realizado como parte del curso de **CSS Avanzado de Víctor Robles** ([victorroblesweb.es](https://victorroblesweb.es)). Los datos de contacto que aparecen en las páginas son ficticios, propios del material del curso.

## Estructura

- `index.html`, `sobre-mi.html`, `curriculum.html`, `portafolio.html`, `blog.html`, `contacto.html` — páginas estáticas
- `assets/css/` — hojas de estilo propias: `reset.css`, `styles.css`, `responsive.css`, `scroll.css`, `loader.css`
- `assets/js/` — JavaScript vanilla: `menu.js` (navegación) y `maps.js` (carga diferida del mapa embebido)
- `assets/fonts/` — Poppins y Font Awesome 6 servidas en local, sin CDN

## Qué se practica

- Maquetación responsive con media queries escritas a mano
- Metodología BEM en el nombrado de clases
- Loader de página y scroll personalizado con CSS puro
- Carga diferida de un iframe de Google Maps con `DOMContentLoaded` y `setTimeout`

## Cómo verlo

No necesita instalación: abre `index.html` en el navegador, o sirve la carpeta con cualquier servidor estático:

```bash
npx serve .
```
