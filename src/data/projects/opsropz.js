// Case study: OpsRopz
// NOTA: textos de ejemplo realistas (Fase 5 del brief). Reemplazar con contenido final.
const opsropz = {
  slug: 'opsropz',
  titulo: 'OpsRopz',
  subtitulo: 'Inteligencia operacional para retail con IA',
  estado: 'En producción',
  resumen:
    'Detección de anomalías de inventario en tiempo real con IA, con alertas en lenguaje natural por WhatsApp, Slack y Email.',
  // Stack principal para chips de la card (subconjunto del stack completo)
  stackPrincipal: ['AWS Lambda', 'AWS Bedrock', 'DynamoDB', 'Terraform'],
  cardImage: 'opsropz-card.webp',

  problema:
    'En retail, las inconsistencias de inventario (mermas, descuadres entre el stock teórico y el real, movimientos sospechosos) suelen detectarse tarde: al cierre de mes o durante un conteo físico, cuando la pérdida ya ocurrió. Los equipos de operaciones reciben reportes en hojas de cálculo que nadie alcanza a revisar a tiempo, y las alertas técnicas existentes son ruido difícil de interpretar para quien toma la decisión en piso de venta.',

  solucion:
    'OpsRopz es un pipeline serverless y orientado a eventos sobre AWS que procesa los movimientos de inventario a medida que ocurren. Cada evento entra por SQS, se persiste en DynamoDB y dispara una capa de detección de anomalías. Cuando se identifica una desviación relevante, se invoca a Claude Haiku a través de AWS Bedrock para traducir el hallazgo técnico a una explicación accionable en lenguaje natural ("la tienda X tiene 12 unidades menos de lo esperado en el SKU Y, patrón similar al de la semana pasada"). La alerta se distribuye por WhatsApp, Slack o Email según el canal del responsable, vía SNS/SES. Se eligió arquitectura serverless para escalar a cero costo en horas valle y absorber picos sin aprovisionar servidores; Terraform mantiene toda la infraestructura como código y CI/CD en GitHub Actions garantiza despliegues reproducibles.',

  arquitectura: {
    imagen: 'opsropz-arquitectura.webp',
    placeholder: 'DIAGRAMA OpsRopz — reemplazar',
    descripcion:
      'Flujo orientado a eventos: ingesta por SQS → persistencia en DynamoDB → capa de detección → explicación con Claude Haiku (Bedrock) → distribución multicanal vía SNS/SES.',
    ascii: `┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Eventos    │────▶│  SQS         │────▶│  Lambda     │
│  Inventario │     │  (cola)      │     │  Ingesta    │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                                         ┌──────▼──────┐
                                         │  DynamoDB   │
                                         │  + Detector │
                                         └──────┬──────┘
                                                │ anomalía
                                         ┌──────▼──────┐
                                         │  Bedrock    │
                                         │ Claude Haiku│
                                         └──────┬──────┘
                          ┌─────────────────────┼─────────────────────┐
                   ┌──────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
                   │  WhatsApp   │      │  Slack      │      │  Email      │
                   │  (SNS)      │      │  (SNS)      │      │  (SES)      │
                   └─────────────┘      └─────────────┘      └─────────────┘`,
  },

  stack: [
    'AWS Lambda',
    'AWS SQS',
    'AWS DynamoDB',
    'AWS SNS',
    'AWS SES',
    'AWS Bedrock',
    'Claude Haiku',
    'Terraform',
    'GitHub Actions',
    'Python',
  ],

  metricas: [
    { label: 'Cobertura de tests (capa IA)', valor: '94%' },
    { label: 'Canales de alerta', valor: '3' },
    { label: 'Infraestructura como código', valor: '100%' },
    { label: 'Latencia evento → alerta', valor: '<5s' },
  ],

  galeria: [
    { src: 'opsropz-alerta-whatsapp.webp', alt: 'Ejemplo de alerta en WhatsApp', placeholder: 'GIF OpsRopz — alerta WhatsApp — reemplazar' },
    { src: 'opsropz-dashboard.webp', alt: 'Panel de anomalías', placeholder: 'CAPTURA OpsRopz — dashboard — reemplazar' },
  ],

  video: null,

  enlaces: {
    github: '',
    demo: '',
    adrs: [],
  },

  aprendizajes:
    'El mayor aprendizaje fue que el valor no estaba en detectar la anomalía sino en comunicarla: pasar el hallazgo por un LLM para redactarlo en lenguaje de negocio multiplicó la tasa de acción del equipo. A nivel técnico, invertir temprano en tests de la capa de IA (94% de cobertura) permitió iterar prompts con confianza, y mantener la infraestructura 100% en Terraform hizo que reproducir el entorno o revertir un cambio fuera trivial.',
}

export default opsropz
