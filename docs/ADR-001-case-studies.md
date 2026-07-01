# ADR-001 — Modelo de contenido y routing para case studies

- **Estado:** Aceptado
- **Fecha:** 2026-06-30
- **Contexto del cambio:** Rediseño del portafolio de "cards" a páginas dedicadas tipo case study (ver `brief-portafolio-claude-code.md`).

## Contexto

El portafolio era una SPA de una sola página (React 19 + Vite 8 + Tailwind 4) sin
router: `App.jsx` montaba todas las secciones en orden y la navegación era 100%
anchor-scroll. Los proyectos vivían como objetos en `src/data/content.js` y se
renderizaban como cards con un diagrama ASCII expandible inline.

El brief pide que cada proyecto tenga una página de detalle navegable
(`/proyectos/[slug]`) con contenido rico (problema, solución, arquitectura,
métricas, galería, video, aprendizajes), manteniendo el home como landing.

## Decisión

### 1. Modelo de datos: objetos JS por proyecto (no MDX)

Cada case study es un archivo en `src/data/projects/` (`opsropz.js`,
`kru-store.js`, `dashboard-guardian.js`) que exporta un objeto con un schema
fijo (documentado como JSDoc en `src/data/projects/index.js`). `index.js` agrega
todo en `caseStudies` y expone `getCaseStudyBySlug` / `getAdjacentCaseStudies`.

**Por qué JS y no MDX:**
- Extiende el patrón que el proyecto ya usaba (`content.js`), sin curva nueva.
- Cero dependencias ni reconfiguración del bundler (MDX requeriría
  `@mdx-js/rollup` + una capa de frontmatter para los campos estructurados).
- Los campos del brief son mayormente estructurados (arrays de métricas, stack,
  galería) más bloques de texto; no se necesita componer componentes dentro de
  prose, que es la ventaja real de MDX.
- Fácil de validar y de tipar vía JSDoc.

**Trade-off aceptado:** el texto largo va como strings (con `\n\n` para separar
párrafos), menos cómodo que escribir Markdown. Si en el futuro el contenido
narrativo crece mucho, migrar a MDX es viable sin tocar la UI.

### 2. Routing: `react-router-dom`

El stack es Vite (no Next.js), así que la notación `/proyectos/[slug]` del brief
se implementa con `react-router-dom`:
- `main.jsx` envuelve la app en `<BrowserRouter>`.
- `App.jsx` es el shell (CircuitBackground + Navbar persistentes) + `<Routes>`:
  `/` → `Home`, `/proyectos/:slug` → `CaseStudy`.
- Slug inexistente → `<Navigate to="/" replace>`.
- `vercel.json` incluye un rewrite SPA (`/(.*)` → `/index.html`) para que las
  URLs profundas no den 404 al refrescar o entrar directo en Vercel.

**Por qué no migrar a Next.js:** el brief pide *extender, no rehacer*. Next daría
SSR y mejor SEO/OG, pero implicaría reescribir todo el proyecto.

## Consecuencias

- ✅ Home y case studies comparten tokens visuales, fuentes y patrón de animación
  (framer-motion `whileInView`). Componentes nuevos en `src/components/case-study/`.
- ✅ `iconMap` de tecnologías centralizado en `src/utils/techIcons.js` (reusado por
  `TechStack` del home y `TechStackGrid` del case study).
- ✅ Assets opcionales: `src/utils/assets.js` resuelve imágenes vía
  `import.meta.glob`; si el archivo no existe, la UI muestra un placeholder
  marcado ("⚠ DIAGRAMA … — reemplazar").
- ⚠️ **Limitación SEO (SPA sin SSR):** `useDocumentMeta` actualiza `<title>` y
  `meta description` por página en cliente. Esto sirve para la pestaña y para
  crawlers que ejecutan JS (Googlebot), pero **el unfurling de links en redes
  sociales/WhatsApp no ejecuta JS**, así que un `og:image` por proyecto no se
  refleja ahí. Mejora futura: prerender (ej. `vite-plugin-ssg`/`react-snap`) o
  migración a SSR. Fuera de alcance de este cambio.
- ⚠️ Lint: se añadió `eslint-plugin-react` (`jsx-uses-vars`) para corregir un
  falso positivo pre-existente de `no-unused-vars` sobre `motion`. Queda 1 error
  pre-existente de `react-hooks/set-state-in-effect` en el typewriter de
  `Hero.jsx` (código original, no relacionado con este cambio).
