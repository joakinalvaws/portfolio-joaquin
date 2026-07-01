// Case study: Dashboard Guardian (repo: GuardianBI)
// Contenido extraído del repo real vía prompt. Algunos spans de prosa se
// reconstruyeron por corrupción del pegado; ítems con datos inciertos → // VERIFICAR.
const dashboardGuardian = {
  slug: 'dashboard-guardian',
  titulo: 'Dashboard Guardian',
  subtitulo:
    'Agente de IA que audita dashboards de Power BI de forma autónoma y alerta cuando los datos dejan de ser confiables.',
  estado: 'En producción',
  resumen:
    'Un agente que revisa cada día los dashboards de Power BI de la empresa, detecta datos desactualizados o inconsistentes y avisa por Telegram con un informe PDF — solo cuando hay algo que importa.',
  stackPrincipal: ['OpenAI Agents SDK', 'Python + FastAPI', 'Supabase', 'Next.js'],
  cardImage: 'dashboard-guardian-card.webp',
  logo: 'dashboard-guardian-logo.webp', // opcional: si no existe el archivo, no se muestra

  problema:
    'Las empresas toman decisiones mirando dashboards de Power BI, pero esos tableros se desactualizan o se contradicen en silencio: una métrica lleva días sin cargarse, el número del dashboard no coincide con la fuente, o el mismo indicador aparece distinto en dos reportes. Nadie lo nota hasta que ya se decidió sobre datos equivocados. Las herramientas de observabilidad de datos vigilan los pipelines y las tablas, pero no la capa de visualización que la gente realmente mira.',

  solucion:
    'Se construyó un agente que audita la capa de visualización, no solo los datos crudos. Cada día compara lo que muestran los dashboards contra la fuente de verdad usando tres verificaciones (datos desactualizados, métricas inconsistentes y conflictos entre reportes), clasifica la severidad, redacta la causa probable en lenguaje natural y entrega un informe PDF por Telegram — pero solo cuando hay algo relevante, para no generar ruido. El agente usa el OpenAI Agents SDK con tool use real y salida estructurada, lo que hace su diagnóstico predecible y auditable. Corre en GitHub Actions (sin servidor que mantener) y el MVP audita una simulación de dashboards para ser demostrable sin licencias de Microsoft, con una integración de Power BI real lista para enchufarse.',

  arquitectura: {
    imagen: 'dashboard-guardian-arquitectura.webp',
    placeholder: 'DIAGRAMA Dashboard Guardian — reemplazar',
    descripcion:
      'Un cron diario dispara el ciclo scanner → agente → informe → entrega; la web en Vercel lee las auditorías desde Supabase en modo solo lectura.',
    ascii: `GitHub Actions (cron diario · 07:00 Lima)
        │
        ▼
   scheduler.py ──── ciclo de auditoría (backend/app/) ────┐
        │                                                  │
        ▼                                                  │
   scanner/  ──►  Supabase (ventas · dashboard_snapshots)  │
        │        fuente de verdad  vs.  lo que muestra     │
        ▼                                                  │
   agent/ (OpenAI Agents SDK · salida Pydantic)            │
     3 tools: desactualizado · inconsistente · conflicto   │
        │                                                  │
        ├──► db/repository.py ──► Supabase (audits)        │
        │                                                  │
        └──► reports/ (HTML → PDF · WeasyPrint) ──► Storage │
                    │                                      │
                    └──► Telegram (resumen + PDF, si hay hallazgos)

   Next.js en Vercel ──(RLS solo lectura)──► Supabase
      historial de auditorías · drill-down por hallazgo`,
  },

  stack: [
    'OpenAI Agents SDK (openai-agents 0.14.0)',
    'GPT-5.4-mini',
    'Python 3.12',
    'FastAPI 0.136.3',
    'Pydantic / pydantic-settings',
    'Supabase (PostgreSQL + Storage)',
    'WeasyPrint 69.0 (HTML → PDF)',
    'Jinja2',
    'Telegram Bot API',
    'Next.js 16 + React 19',
    'Tailwind CSS 4',
    'Vercel',
    'GitHub Actions (cron)',
    'pytest + pytest-asyncio',
  ],

  metricas: [
    { label: 'Tipos de error detectados', valor: '3/3' },
    { label: 'Agente con tool use real', valor: '3 tools + salida Pydantic' },
    { label: 'Tests automatizados', valor: '40 en 8 suites' },
  ],

  galeria: [
    { src: 'dashboard-guardian-1.webp', alt: 'Historial de auditorías en la web', placeholder: 'CAPTURA — historial de auditorías — reemplazar' }, // captura sugerida: home de guardian-bi.vercel.app con la lista de auditorías
    { src: 'dashboard-guardian-2.webp', alt: 'Detalle de una auditoría con drill-down por hallazgo', placeholder: 'CAPTURA — detalle de auditoría — reemplazar' }, // captura sugerida: detalle con valor mostrado vs. fuente, causa y recomendación
    { src: 'dashboard-guardian-3.webp', alt: 'Histórico de una métrica en el tiempo', placeholder: 'CAPTURA — histórico de métrica — reemplazar' }, // captura sugerida: gráfico de barras (diferencia % por auditoría)
    { src: 'dashboard-guardian-4.webp', alt: 'Notificación de Telegram con el informe adjunto', placeholder: 'CAPTURA — alerta en Telegram — reemplazar' }, // captura sugerida: mensaje de Telegram con resumen + PDF adjunto
    { src: 'dashboard-guardian-5.webp', alt: 'Informe PDF generado por el agente', placeholder: 'CAPTURA — informe PDF — reemplazar' }, // captura sugerida: primera página del PDF con hallazgos, severidad y causa
  ],

  video: null,

  enlaces: {
    github: 'https://github.com/joakinalvaws/GuardianBI',
    demo: 'https://guardian-bi.vercel.app',
    adrs: [
      { label: 'ADR-001 — dashboard_snapshots desacopla la fuente de datos', url: 'https://github.com/joakinalvaws/GuardianBI/blob/main/docs/adr/001-dashboard-snapshots-desacopla-la-fuente.md' },
      { label: 'ADR-002 — OpenAI Agents SDK sobre chat.completions', url: 'https://github.com/joakinalvaws/GuardianBI/blob/main/docs/adr/002-openai-agents-sdk-sobre-chat-completions.md' },
      { label: 'ADR-003 — Supabase sobre Excel o SQLite', url: 'https://github.com/joakinalvaws/GuardianBI/blob/main/docs/adr/003-supabase-sobre-excel-o-sqlite.md' },
      { label: 'ADR-004 — Scheduler en GitHub Actions', url: 'https://github.com/joakinalvaws/GuardianBI/blob/main/docs/adr/004-scheduler-en-github-actions.md' },
      { label: 'ADR-005 — Power BI como ruta de producción', url: 'https://github.com/joakinalvaws/GuardianBI/blob/main/docs/adr/005-power-bi-como-ruta-de-produccion.md' },
    ],
  },

  aprendizajes:
    'Desacoplar la fuente de datos detrás de un contrato (los snapshots) permitió construir y demostrar todo el sistema sin depender de licencias de Microsoft, dejando la integración real de Power BI como un detalle intercambiable. Apoyarse en el Agents SDK con salida estructurada convirtió al agente en un componente predecible y auditable, no en un chatbot. Y elegir infraestructura serverless (cron en Actions + web en Vercel + datos en Supabase) mantuvo el costo cerca de cero sin sacrificar que corra solo cada día. La regla de "solo alertar cuando es relevante" resultó clave para que la alerta se tome en serio y no se convierta en ruido que la gente ignora.',
}

export default dashboardGuardian
