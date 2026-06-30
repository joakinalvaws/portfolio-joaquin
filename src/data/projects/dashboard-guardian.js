// Case study: Dashboard Guardian
// NOTA: textos de ejemplo realistas (Fase 5 del brief). Reemplazar con contenido final.
const dashboardGuardian = {
  slug: 'dashboard-guardian',
  titulo: 'Dashboard Guardian',
  subtitulo: 'Agente autónomo de auditoría de dashboards Power BI',
  estado: 'En producción',
  resumen:
    'Agente autónomo que audita dashboards de Power BI contra la fuente de datos, genera PDFs y los distribuye por Telegram en schedule diario.',
  stackPrincipal: ['OpenAI Agents SDK', 'Power BI REST API', 'PostgreSQL', 'GitHub Actions'],
  cardImage: 'dashboard-guardian-card.webp',

  problema:
    'Los dashboards de Power BI se vuelven la fuente de verdad para decisiones de negocio, pero nadie audita que sigan siendo correctos: una métrica puede divergir de la base de datos por un cambio de modelo, un filtro mal aplicado o una carga incompleta, y el error pasa inadvertido durante semanas. La revisión manual es tediosa, no se hace, y cuando alguien nota la inconsistencia la decisión equivocada ya se tomó.',

  solucion:
    'Dashboard Guardian es un agente autónomo construido con OpenAI Agents SDK que compara los valores publicados en Power BI contra la fuente real en PostgreSQL/Supabase. Se conecta a la Power BI REST API autenticándose con Azure AD, extrae los valores de cada visual, los confronta contra una consulta de control en la base de datos y razona sobre las discrepancias para clasificarlas (diferencia esperada vs. inconsistencia real). El resultado se compila en un PDF legible y se distribuye automáticamente por Telegram. Todo el proceso corre en schedule diario mediante GitHub Actions, sin infraestructura dedicada. Se documentaron 5 ADRs para dejar registro de decisiones clave (autenticación con Azure AD, estrategia de comparación, formato de reporte) y la suite supera el 80% de cobertura de tests.',

  arquitectura: {
    imagen: 'dashboard-guardian-arquitectura.webp',
    placeholder: 'DIAGRAMA Dashboard Guardian — reemplazar',
    descripcion:
      'Agente programado en GitHub Actions: extrae métricas vía Power BI REST API (Azure AD) → compara contra PostgreSQL/Supabase → razona discrepancias con OpenAI Agents SDK → genera PDF → distribuye por Telegram.',
    ascii: `┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│ GitHub       │────▶│ OpenAI       │────▶│ Power BI    │
│ Actions (cron)│    │ Agents SDK   │     │ REST (AzureAD)│
└──────────────┘     └──────┬───────┘     └─────────────┘
                            │ compara
                     ┌──────▼──────┐      ┌─────────────┐
                     │ PostgreSQL  │      │  PDF        │
                     │ /Supabase   │─────▶│  Reporte    │
                     └─────────────┘      └──────┬──────┘
                                                 │
                                          ┌──────▼──────┐
                                          │  Telegram   │
                                          │  (entrega)  │
                                          └─────────────┘`,
  },

  stack: [
    'OpenAI Agents SDK',
    'Power BI REST API',
    'Azure AD',
    'PostgreSQL',
    'Supabase',
    'Python',
    'GitHub Actions',
    'Telegram',
  ],

  metricas: [
    { label: 'Cobertura de tests', valor: '+80%' },
    { label: 'ADRs documentados', valor: '5' },
    { label: 'Auditoría', valor: 'Diaria' },
    { label: 'Infraestructura dedicada', valor: '0' },
  ],

  galeria: [
    { src: 'dashboard-guardian-pdf.webp', alt: 'Reporte PDF generado', placeholder: 'CAPTURA Dashboard Guardian — reporte PDF — reemplazar' },
    { src: 'dashboard-guardian-telegram.webp', alt: 'Entrega por Telegram', placeholder: 'CAPTURA Dashboard Guardian — Telegram — reemplazar' },
  ],

  video: null,

  enlaces: {
    github: '',
    demo: '',
    adrs: [],
  },

  aprendizajes:
    'Diseñar un agente autónomo enseñó la importancia de la trazabilidad: documentar 5 ADRs no fue burocracia sino la forma de razonar las decisiones difíciles (cómo autenticar contra Azure AD, cómo decidir qué cuenta como "inconsistencia"). Superar el 80% de cobertura dio la confianza para dejarlo corriendo sin supervisión diaria. Y montar todo sobre GitHub Actions demostró que un agente útil no necesita infraestructura dedicada: el cron de CI/CD basta para tareas programadas de auditoría.',
}

export default dashboardGuardian
