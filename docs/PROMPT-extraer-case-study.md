# Prompt — Extraer material de case study de este proyecto

> **Cómo usar:** pega el bloque de abajo en Claude Code (u otro agente) **dentro
> de cada repo de proyecto** (OpsRopz, KRU Store, Dashboard Guardian). Es un único
> prompt genérico; córrelo una vez por repo. El agente preguntará primero, luego
> (si confirmas) creará los ADR que falten y te devolverá un objeto JS listo para
> pegar en `src/data/projects/<slug>.js` del portafolio.

---

Vas a extraer el material para el **case study** de ESTE repositorio, que se
publicará en mi portafolio. Trabaja solo en este repo. Sigue las fases EN ORDEN
y **no generes ni escribas nada hasta terminar la Fase 0 (preguntas)**.

## Fase 0 — Examinar y preguntar (primero, no te lo saltes)

1. Entiende el proyecto: lee `README`, la estructura de carpetas, el código
   principal, la infraestructura/CI (Terraform, GitHub Actions, Dockerfiles) y
   los tests/cobertura.
2. **Busca ADRs existentes** en: `docs/adr/`, `docs/architecture/decisions/`,
   `adr/`, `doc/adr/`, y cualquier `*.md` cuyo título o contenido sea un ADR
   ("ADR", "Architecture Decision Record", "Decisión de arquitectura").
3. Reporta lo que encontraste y **PREGÚNTAME antes de seguir**:
   - ¿Confirmas el nombre del proyecto y un subtítulo de una línea?
   - ¿Hay demo en vivo (URL)? Si no, lo represento con capturas de pantalla.
   - ¿URL del repo en GitHub?
   - "Encontré [N] ADRs" / "no encontré ADRs": ¿reutilizo los existentes / creo
     los faltantes en `docs/adr/`?
   - Métricas medibles a destacar: te propongo las que detecté ([cobertura,
     nº de servicios, latencia, etc.]). ¿Cuáles uso?

   **Espera mi respuesta antes de la Fase 1.**

## Fase 1 — ADRs

- Si YA existen: **no crees nuevos**. Lístalos y arma sus links de GitHub
  (`https://github.com/<owner>/<repo>/blob/<branch>/<ruta>`).
- Si NO existen (y lo confirmé): redacta SOLO las decisiones reales y relevantes
  con evidencia en el código/infra (no inventes, no rellenes). Créalas como
  archivos en `docs/adr/`, formato MADR ligero, numerados
  `0001-titulo-kebab.md`, con secciones: Título · Estado · Fecha · Contexto ·
  Decisión · Consecuencias. Devuélveme las rutas creadas y sus links de GitHub.

## Fase 2 — Contenido (objeto JS listo para pegar)

Devuélveme un objeto JS con EXACTAMENTE estos campos, fundamentado en el repo.
`problema`, `solucion` y `aprendizajes` en **lenguaje de negocio**. **No inventes
métricas**: derívalas de evidencia (reportes de cobertura, recursos de Terraform,
workflows de CI). Marca con `// VERIFICAR` cualquier dato que no pudiste confirmar.

```js
const <slugCamel> = {
  slug: '<slug-kebab>',
  titulo: '',
  subtitulo: '',
  estado: 'En producción',
  resumen: '',                 // 1-2 líneas para la card del home
  stackPrincipal: [],          // 3-4 techs clave (chips de la card)
  cardImage: '<slug>-card.webp',
  problema: '',                // lenguaje de negocio
  solucion: '',                // qué se construyó + por qué de las decisiones
  arquitectura: {
    imagen: '<slug>-arquitectura.webp',
    placeholder: 'DIAGRAMA <Titulo> — reemplazar',
    descripcion: '',           // 1-2 líneas del flujo
    ascii: ``,                 // diagrama ASCII del flujo real
  },
  stack: [],                   // todas las tecnologías reales
  metricas: [                  // 3-4, con evidencia
    { label: '', valor: '' },
  ],
  galeria: [                   // capturas; incluye las que sirven de "demo" si no hay URL en vivo
    { src: '<slug>-1.webp', alt: '', placeholder: 'CAPTURA — describe — reemplazar' }, // captura sugerida: <qué debe mostrar>
  ],
  video: null,
  enlaces: {
    github: '',                // URL del repo
    demo: '',                  // URL en vivo, o '' si se representa con capturas
    adrs: [                    // links a los ADR (existentes o recién creados)
      { label: 'ADR-0001 — ...', url: '' },
    ],
  },
  aprendizajes: '',            // lenguaje de negocio
}

export default <slugCamel>
```

## Reglas
- Fundamenta TODO en el repo real; lo que no puedas verificar, márcalo
  `// VERIFICAR` en vez de inventarlo.
- Español, tono profesional; negocio en problema/solución/aprendizajes.
- No toques el código de la app; solo puedes crear archivos en `docs/adr/`
  (y solo si confirmé que faltan ADRs).
- Slugs del portafolio: `opsropz`, `kru-store`, `dashboard-guardian`.
