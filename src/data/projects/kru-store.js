// Case study: KRU Store (repo: krustore)
// Contenido extraído del repo real vía prompt. Algunos spans de prosa se
// reconstruyeron por corrupción del pegado; ítems con datos inciertos → // VERIFICAR.
const kruStore = {
  slug: 'kru-store',
  titulo: 'KRU Store',
  subtitulo:
    'E-commerce multicanal (web + WhatsApp) con pagos Mercado Pago y panel admin, en producción.',
  estado: 'En producción',
  resumen:
    'Tienda online peruana (zapatillas, iPhones y perfumes) que vende por web y WhatsApp con pagos reales de Mercado Pago y un panel de administración unificado.',
  stackPrincipal: ['Next.js 16', 'Supabase', 'Mercado Pago', 'TypeScript'],
  cardImage: 'kru-store-card.webp',
  logo: 'kru-store-logo.webp', // opcional: si no existe el archivo, no se muestra

  problema:
    'Un negocio peruano que vende zapatillas, iPhones y perfumes recibía pedidos de forma dispersa —redes, mensajes y ventas presenciales— sin un lugar único para cobrar en línea ni para controlar stock, precios y estado de los pedidos. Necesitaba una tienda propia que cobrara con los medios de pago locales (Yape, tarjetas, cuotas), que ordenara la operación en un solo panel y que fuera segura para manejar dinero real.',

  solucion:
    'Se construyó una tienda web (Next.js sobre Vercel) con catálogo, carrito y un checkout que cobra dentro del propio sitio mediante Mercado Pago, sin sacar al cliente a una página externa. Los pedidos de la web y los de WhatsApp convergen en el mismo flujo de estados y en un único panel de administración donde el dueño gestiona productos, precios, stock, pedidos y clientes. Se sumó un bot de WhatsApp con IA para atención y consulta de pedidos. Todas las decisiones clave priorizaron confiabilidad del dinero y seguridad: los precios y totales se calculan siempre en el servidor (nunca se confía en el navegador), el stock se descuenta al confirmarse el pago vía webhook, y se pasó una auditoría de seguridad con todos los hallazgos resueltos.',

  arquitectura: {
    imagen: 'kru-store-arquitectura.webp',
    placeholder: 'DIAGRAMA KRU Store — reemplazar',
    descripcion:
      'El cliente navega un catálogo cacheado en CDN y paga dentro del sitio; al confirmarse el pago, un webhook actualiza el pedido, descuenta stock y notifica por email y WhatsApp.',
    ascii: `[ Navegador ]
     │  catálogo (ISR/CDN, revalidate 1h) · carrito (localStorage)
     ▼
[ Next.js 16 en Vercel ]──────────────────────────────────────┐
     │  /api/checkout  → valida precios y stock EN SERVIDOR    │
     │  Payment Bricks (SPC, sin redirect) → /api/process-pay  │
     ▼                                                         │
[ Mercado Pago ] --pago aprobado--> [ /api/webhooks/mercadopago ]
                                        │  marca pedido "pagado"
                                        │  descuenta stock
                                        │  email (Resend)
                                        │  WhatsApp (Evolution)
                                        ▼
                                   [ Supabase (Postgres + RLS) ]
                                        ▲         ▲
[ Panel Admin (SSR, auth) ]─────────────┘         │
[ Bot WhatsApp (VPS) ] Express+OpenAI+Fuse.js ─────┘
     PM2 ← Evolution API + Traefik + Postgres 15 (Docker en VPS)`,
  },

  stack: [
    'Next.js 16 (App Router, ISR + SSR)',
    'React 19',
    'TypeScript',
    'Tailwind CSS 3',
    'Zod 4 (validación)',
    'Zustand (estado de carrito/checkout)',
    'Supabase — PostgreSQL + RLS',
    '@supabase/ssr (auth del panel admin)',
    'Mercado Pago — Payment Bricks (SPC)',
    'Upstash Redis (rate limiting)',
    'Resend (emails transaccionales)',
    'sharp (pipeline de imágenes)',
    'Vercel (hosting web + CDN)',
    'Evolution API (WhatsApp, Baileys)',
    'Node.js + Express + OpenAI + Fuse.js (bot WhatsApp)',
    'PM2 (proceso del bot en VPS)',
    "Docker Compose + Traefik + Let's Encrypt (VPS)",
    'Axiom (logs de seguridad)',
  ],

  metricas: [
    { label: 'Canales de venta unificados', valor: '2 (web + WhatsApp)' },
    { label: 'Seguridad', valor: '21/21 hallazgos resueltos' },
    { label: 'Rendimiento del catálogo', valor: 'ISR 1h · carga < 100 ms (CDN)' }, // VERIFICAR: <100 ms proviene del doc de decisiones, no medido
  ],

  galeria: [
    { src: 'kru-store-1.webp', alt: 'Home y catálogo de KRU Store', placeholder: 'CAPTURA — home con hero + carrusel de productos destacados — reemplazar' }, // captura sugerida: página de inicio (krustore.com)
    { src: 'kru-store-2.webp', alt: 'Página de producto (PDP)', placeholder: 'CAPTURA — detalle de producto con galería, tallas y botón agregar — reemplazar' }, // captura sugerida: /product/[slug]
    { src: 'kru-store-3.webp', alt: 'Checkout Single Page con Payment Bricks', placeholder: 'CAPTURA — checkout SPC con formulario de pago Mercado Pago embebido — reemplazar' }, // captura sugerida: /checkout con PaymentBrick
    { src: 'kru-store-4.webp', alt: 'Panel admin — gestión de pedidos', placeholder: 'CAPTURA — tabla de pedidos con filtros, selección masiva y buscador — reemplazar' }, // captura sugerida: /admin/(protected)/orders
    { src: 'kru-store-5.webp', alt: 'Bot de WhatsApp respondiendo un pedido', placeholder: 'CAPTURA — conversación de WhatsApp consultando estado de pedido — reemplazar' }, // captura sugerida: chat del bot
  ],

  video: null,

  enlaces: {
    github: 'https://github.com/joakinalvaws/krustore',
    demo: 'https://krustore.com',
    adrs: [
      { label: 'ADR-0001 — Mercado Pago como pasarela de pagos', url: 'https://github.com/joakinalvaws/krustore/blob/main/docs/adr/0001-mercado-pago-como-pasarela.md' },
      { label: 'ADR-0002 — Single Page Checkout con Payment Bricks', url: 'https://github.com/joakinalvaws/krustore/blob/main/docs/adr/0002-single-page-checkout-payment-bricks.md' },
      { label: 'ADR-0003 — Cálculo de precios en el servidor (anti-fraude)', url: 'https://github.com/joakinalvaws/krustore/blob/main/docs/adr/0003-calculo-de-precios-en-servidor.md' },
      { label: 'ADR-0004 — Evolution API en lugar de WhatsApp Cloud', url: 'https://github.com/joakinalvaws/krustore/blob/main/docs/adr/0004-evolution-api-en-lugar-de-whatsapp-cloud.md' },
      { label: 'ADR-0005 — Supabase con fetch directo en el core', url: 'https://github.com/joakinalvaws/krustore/blob/main/docs/adr/0005-supabase-fetch-directo-en-el-core.md' },
      { label: 'ADR-0006 — ISR para el catálogo', url: 'https://github.com/joakinalvaws/krustore/blob/main/docs/adr/0006-isr-para-el-catalogo.md' },
      { label: 'ADR-0007 — CSP con nonce dinámico', url: 'https://github.com/joakinalvaws/krustore/blob/main/docs/adr/0007-csp-nonce-dinamico.md' },
    ],
  },

  aprendizajes:
    'Manejar dinero real obliga a desconfiar del navegador: llevar el cálculo de precios y totales al servidor evitó un fraude de pago por S/0.00 que la auditoría detectó. Cobrar dentro del sitio (checkout en una sola página) en vez de una pasarela externa reduce fricción y mantiene la marca. Unificar los dos canales de venta (web y WhatsApp) en un mismo flujo de estados y un solo panel simplifica la operación diaria del dueño. Y elegir herramientas por su costo/velocidad de arranque real —Mercado Pago por su cobertura local, WhatsApp no oficial para arrancar sin costo por mensaje— permite lanzar un negocio rápido, asumiendo conscientemente los trade-offs y dejándolos documentados para revisarlos cuando el volumen crezca.',
}

export default kruStore
