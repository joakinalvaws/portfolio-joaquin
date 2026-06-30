// Case study: KRU Store
// NOTA: textos de ejemplo realistas (Fase 5 del brief). Reemplazar con contenido final.
const kruStore = {
  slug: 'kru-store',
  titulo: 'KRU Store',
  subtitulo: 'E-commerce full-stack en producción',
  estado: 'En producción',
  resumen:
    'Tienda online en producción (krustore.com) con pagos reales, asistente de WhatsApp con IA y arquitectura híbrida Vercel + VPS.',
  stackPrincipal: ['Next.js', 'Supabase', 'Mercado Pago', 'Upstash Redis'],
  cardImage: 'kru-store-card.webp',

  problema:
    'Vender en línea en Perú implica resolver tres cosas a la vez que rara vez vienen juntas: aceptar los métodos de pago que la gente realmente usa (Yape vía Mercado Pago), atender consultas por WhatsApp —que es el canal por defecto del cliente local— sin tener a alguien respondiendo 24/7, y hacerlo sobre una infraestructura que no se caiga ni dispare costos en cada pico de tráfico. Las soluciones llave en mano cobran comisiones altas y no permiten el control de seguridad ni la personalización que un negocio en crecimiento necesita.',

  solucion:
    'KRU Store es un e-commerce full-stack en producción sobre Next.js 16, con Supabase como base de datos y autenticación. Los pagos se procesan con Mercado Pago (incluido Yape), validando el estado vía webhooks/IPN. Un asistente de WhatsApp construido con GPT y function calling consulta el catálogo, arma el carrito y resuelve dudas de forma autónoma. La seguridad se trabajó como checklist de 22 puntos (validación de entrada, headers, control de acceso, gestión de secretos) y el rate limiting se implementó con Upstash Redis para proteger los endpoints sensibles. La arquitectura es híbrida: el frontend y las funciones de borde en Vercel, y los servicios que requieren proceso persistente (como el conector de WhatsApp) en un VPS con Docker y Traefik como reverse proxy con TLS automático. Esta separación permite aprovechar el escalado de Vercel sin perder el control de los servicios long-running.',

  arquitectura: {
    imagen: 'kru-store-arquitectura.webp',
    placeholder: 'DIAGRAMA KRU Store — reemplazar',
    descripcion:
      'Arquitectura híbrida: Next.js en Vercel para la tienda y checkout; VPS con Docker + Traefik para el asistente de WhatsApp; Supabase como datos compartidos; Mercado Pago para pagos; Upstash Redis para rate limiting.',
    ascii: `┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│  Browser     │────▶│  Next.js 16  │────▶│  Supabase   │
│  (Web)       │     │  (Vercel)    │     │  Productos  │
└──────────────┘     └──────┬───────┘     └─────────────┘
                            │
                     ┌──────▼──────┐      ┌─────────────┐
                     │  Mercado    │      │  Upstash    │
                     │  Pago (IPN) │      │  Redis (RL) │
                     └─────────────┘      └─────────────┘
┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│  WhatsApp    │────▶│  VPS         │────▶│  GPT +      │
│  Cliente     │     │ Docker+Traefik│    │  Functions  │
└──────────────┘     └──────────────┘     └─────────────┘`,
  },

  stack: [
    'Next.js',
    'Supabase',
    'Mercado Pago',
    'Upstash Redis',
    'GPT-4o',
    'Vercel',
    'Docker',
    'Traefik',
    'VPS Linux',
    'WhatsApp',
  ],

  metricas: [
    { label: 'Puntos de seguridad', valor: '22' },
    { label: 'Canales de venta', valor: '2' },
    { label: 'Uptime', valor: '99.9%' },
    { label: 'Pagos', valor: 'Reales' },
  ],

  galeria: [
    { src: 'kru-store-tienda.webp', alt: 'Vista de la tienda', placeholder: 'CAPTURA KRU — tienda web — reemplazar' },
    { src: 'kru-store-checkout.webp', alt: 'Flujo de checkout', placeholder: 'CAPTURA KRU — checkout — reemplazar' },
    { src: 'kru-store-whatsapp.webp', alt: 'Asistente de WhatsApp', placeholder: 'GIF KRU — asistente WhatsApp — reemplazar' },
  ],

  video: null,

  enlaces: {
    github: '',
    demo: 'https://krustore.com',
    adrs: [],
  },

  aprendizajes:
    'Construir un negocio real enseñó que la arquitectura "correcta" es la que el negocio puede operar: la decisión híbrida Vercel + VPS no fue por elegancia sino porque el conector de WhatsApp necesita un proceso persistente que el modelo serverless no da bien. Tratar la seguridad como un checklist explícito de 22 puntos —en vez de algo implícito— y poner rate limiting con Redis desde el día uno evitó incidentes que en e-commerce se pagan caro. La función calling sobre el catálogo demostró que un asistente puede cerrar ventas sin scripts rígidos.',
}

export default kruStore
