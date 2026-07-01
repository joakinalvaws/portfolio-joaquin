// Case study: OpsRopz (repo: opsRopz-Dashboard)
// Contenido extraído del repo real vía prompt. Algunos spans de prosa se
// reconstruyeron por corrupción del pegado; ítems con datos inciertos → // VERIFICAR.
const opsropz = {
  slug: 'opsropz',
  titulo: 'OpsRopz',
  subtitulo:
    'Sistema de inteligencia operacional para retail — AWS serverless + IA generativa.',
  estado: 'En producción',
  resumen:
    'Vigila las operaciones de una tienda retail en tiempo real, detecta anomalías con IA y avisa al equipo por WhatsApp, Slack y email antes de que escalen.',
  stackPrincipal: ['AWS Lambda', 'Amazon Bedrock (Claude)', 'Terraform', 'Next.js'],
  cardImage: 'opsropz-card.webp',
  logo: 'opsropz-logo.webp', // opcional: si no existe el archivo, no se muestra

  problema:
    'En una tienda retail, los problemas operativos —quiebres de stock, caídas de ventas, pedidos a proveedores que no llegan— suelen detectarse tarde: cuando alguien revisa una planilla a fin de día o nota el estante vacío. Nadie vigila los números las 24 horas y los reportes se leen con muy poca frecuencia como para reaccionar a tiempo. El resultado son ventas perdidas y decisiones tardías.',

  solucion:
    'OpsRopz invierte el modelo: en vez de que el equipo revise reportes, el sistema los busca cuando algo necesita atención. Cada evento de la tienda (inventario, ventas, pedidos) fluye por un pipeline serverless en AWS que calcula KPIs en tiempo real; cuando aparece una anomalía real, un modelo de IA (Claude Haiku 4.5) la explica en lenguaje natural con una recomendación accionable, y la distribuye por el canal adecuado —WhatsApp, Slack o email— según su gravedad. Se eligió una arquitectura híbrida (núcleo serverless dentro de la capa gratuita de AWS + un VPS) para minimizar costos, con patrones de resiliencia (reintentos, DLQ, idempotencia) para que ningún evento se pierda en silencio. El dashboard público en Next.js muestra KPIs y alertas sin exponer credenciales gracias a un proxy server-side, y toda la infraestructura está descrita como código con Terraform.',

  arquitectura: {
    imagen: 'opsropz-arquitectura.webp',
    placeholder: 'DIAGRAMA OpsRopz — reemplazar',
    descripcion:
      'Pipeline event-driven: los eventos entran por SQS, se procesan en Lambdas, se analizan con IA (Bedrock) y se distribuyen como alertas multicanal; el dashboard consume una API REST protegida.',
    ascii: `Eventos retail (VPS) → SQS → Lambda (processor) → DynamoDB (KPIs)
                       ↓ DLQ                ↓
                             Lambda (analyzer) → Bedrock / Claude
                                       ↓
                                     SNS → CloudWatch
                                       ↓
                       n8n (VPS) → WhatsApp / Slack
                       SES → Email (reporte diario)
                                       ↓
                   API Gateway → Dashboard Next.js (Vercel)`,
  },

  stack: [
    'Python 3.12',
    'AWS Lambda',
    'Amazon SQS (+DLQ)',
    'DynamoDB (+Streams)',
    'Amazon SNS',
    'Amazon EventBridge',
    'Amazon SES',
    'Amazon S3',
    'API Gateway',
    'Amazon Bedrock — Claude Haiku 4.5',
    'AWS IAM',
    'CloudWatch',
    'Terraform (workspaces dev/prod)',
    'GitHub Actions',
    'pre-commit',
    'n8n',
    'Evolution API (WhatsApp)',
    'Slack API',
    'Next.js 15',
    'React 19',
    'Recharts',
    'Tailwind CSS',
    'Vercel',
    'pytest',
    'moto',
    'ruff',
    'black',
    'pip-audit',
  ],

  metricas: [
    { label: 'Cobertura de tests', valor: '≥70% en CI · 94% capa IA' }, // VERIFICAR: el valor llegó truncado en el pegado
    { label: 'Funciones serverless', valor: '5 Lambdas event-driven' },
    { label: 'Tests automatizados', valor: '78 (pytest)' },
    { label: 'Infraestructura como código', valor: '57 recursos AWS (Terraform)' },
  ],

  galeria: [
    { src: 'opsropz-1.webp', alt: 'Dashboard de KPIs de inventario en tiempo real', placeholder: 'CAPTURA — dashboard Next.js con KPIs y gráfico de días de stock — reemplazar' }, // captura sugerida: home del dashboard en vivo
    { src: 'opsropz-2.webp', alt: 'Alerta de anomalía explicada por IA', placeholder: 'CAPTURA — alerta con severidad, regla y análisis en lenguaje natural — reemplazar' }, // captura sugerida: lista de alertas con una crítica
    { src: 'opsropz-3.webp', alt: 'Alerta entregada por WhatsApp/Slack', placeholder: 'CAPTURA — notificación recibida en WhatsApp o Slack #ops-alertas — reemplazar' }, // captura sugerida: mensaje real en el canal
    { src: 'opsropz-4.webp', alt: 'Observabilidad y CI', placeholder: 'CAPTURA — CloudWatch dashboard o pipeline CI en verde — reemplazar' }, // captura sugerida: CloudWatch o Actions CI verde
  ],

  video: null,

  enlaces: {
    github: 'https://github.com/joakinalvaws/opsRopz-Dashboard',
    demo: 'https://opsropz-dashboard.vercel.app',
    adrs: [
      { label: 'ADR-0001 — Arquitectura híbrida AWS + VPS', url: 'https://github.com/joakinalvaws/opsRopz-Dashboard/blob/main/docs/decisions/0001-hybrid-aws-vps.md' },
      { label: 'ADR-0002 — SSM Parameter Store vs Secrets Manager', url: 'https://github.com/joakinalvaws/opsRopz-Dashboard/blob/main/docs/decisions/0002-ssm-over-secrets-manager.md' },
      { label: 'ADR-0003 — Resiliencia: DLQ + fallos parciales de batch', url: 'https://github.com/joakinalvaws/opsRopz-Dashboard/blob/main/docs/decisions/0003-dlq-batch-failures.md' },
      { label: 'ADR-0004 — Dashboard con proxy server-side de la API key', url: 'https://github.com/joakinalvaws/opsRopz-Dashboard/blob/main/docs/decisions/0004-dashboard-server-side-api-key.md' },
      { label: 'ADR-0005 — Claude Haiku 4.5 vía inference profile', url: 'https://github.com/joakinalvaws/opsRopz-Dashboard/blob/main/docs/decisions/0005-claude-haiku-inference-profile.md' },
      { label: 'ADR-0006 — Estado remoto de Terraform (S3 + locks DynamoDB)', url: 'https://github.com/joakinalvaws/opsRopz-Dashboard/blob/main/docs/decisions/0006-terraform-remote-state.md' },
      { label: 'ADR-0007 — CD de infra con apply manual (workflow_dispatch)', url: 'https://github.com/joakinalvaws/opsRopz-Dashboard/blob/main/docs/decisions/0007-terraform-cd-manual.md' },
    ],
  },

  aprendizajes:
    'El valor no está en recolectar datos, sino en filtrar el ruido: solo las anomalías reales disparan un análisis, evitando la fatiga de alertas. La IA generativa convierte números en decisiones al explicar "por qué importa" y "qué hacer". Tratar la resiliencia como requisito desde el diseño (reintentos, DLQ, idempotencia, observabilidad) es lo que hace confiable a un sistema que opera sin supervisión constante. Y documentar las decisiones (ADRs) más automatizar la calidad en CI (tests, linters, escaneo de dependencias) mantiene el proyecto mantenible a medida que crece.',
}

export default opsropz
