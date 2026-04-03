export const personalInfo = {
  name: "Joaquín Alva",
  fullName: "Joaquín Alva Vega",
  title: "Automation Engineer",
  location: "Lima, Perú",
  email: "joakinalvaws@gmail.com",
  phone: "+51 936889160",
  description:
    "Técnico en Sistemas especializado en automatización de procesos, soluciones Cloud (AWS) y flujos No-Code/Low-Code con n8n.",
  bio: [
    "Técnico en Sistemas egresado del IESTP María Rosario Araoz Pinto, especializado en soporte de infraestructura y automatización de procesos.",
    "Mi enfoque está en la implementación de soluciones Cloud con AWS y la optimización de flujos de trabajo mediante herramientas No-Code/Low-Code como n8n. He desarrollado desde bots de WhatsApp con IA hasta pipelines serverless de procesamiento de pedidos.",
    "Creo firmemente que la automatización no reemplaza personas, las potencia. Mi objetivo es transformar procesos manuales y repetitivos en flujos inteligentes que ahorren tiempo y recursos.",
  ],
  highlights: [
    "Técnico en Sistemas",
    "Cloud AWS",
    "n8n Automation",
    "Lima, Perú",
    "Autodidacta",
    "Inglés Técnico",
  ],
  social: {
    linkedin: "https://linkedin.com/in/joaquin-alva",
    github: "https://github.com/joakinalvaws",
  },
  cvFile: "/CV_Joaquin_Alva_Vega.pdf",
};

export const projects = [
  {
    id: 1,
    title: "Agente Conversacional WhatsApp",
    description:
      "Bot de WhatsApp end-to-end para clínica dental. Integra Evolution API, n8n (AI Agent) y GPT-4o-mini para gestión conversacional con memoria persistente. Incluye reserva real en Google Calendar, registro en Supabase y escalado a humano.",
    tags: [
      "n8n",
      "GPT-4o",
      "Supabase",
      "Evolution API",
      "Docker",
      "Traefik",
      "Google Calendar",
      "WhatsApp",
      "VPS Linux",
    ],
    status: "Completado",
    image: "proyecto-whatsapp.webp",
    github: "",
    architecture: `┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  WhatsApp    │────▶│  Evolution   │────▶│   Webhook   │
│  Usuario     │     │  API         │     │   n8n       │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
                                         ┌──────▼──────┐
                                         │  AI Agent   │
                                         │  GPT-4o     │
                                         └──────┬──────┘
                                                │
                          ┌─────────────────────┼─────────────────────┐
                          │                     │                     │
                   ┌──────▼──────┐      ┌──────▼──────┐      ┌──────▼──────┐
                   │  Supabase   │      │  Google     │      │  Escalado   │
                   │  (Memoria)  │      │  Calendar   │      │  a Humano   │
                   └─────────────┘      └─────────────┘      └─────────────┘`,
  },
  {
    id: 2,
    title: "Pipeline Automatización de Pedidos",
    description:
      "Sistema de gestión de pedidos para tienda de materiales de construcción. Frontend React con catálogo, carrito y formulario. Backend serverless en AWS Lambda que registra en Google Sheets y dispara workflow n8n para notificaciones automáticas.",
    tags: [
      "React",
      "Vite",
      "AWS Lambda",
      "Google Sheets API",
      "n8n",
      "Tailwind CSS",
      "Serverless",
      "S3",
      "CloudFront",
    ],
    status: "Completado",
    image: "proyecto-pipeline.webp",
    github: "",
    architecture: `┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  React +    │────▶│  AWS Lambda  │────▶│  Google     │
│  Vite       │     │  (Serverless)│     │  Sheets     │
└─────────────┘     └──────┬───────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │     n8n     │
                    │(Notificac.) │
                    └─────────────┘`,
  },
];

export const techStack = [
  {
    category: "Cloud & Infraestructura",
    items: ["AWS Lambda", "S3", "CloudFront", "Docker", "Traefik", "VPS Linux"],
  },
  {
    category: "Automatización",
    items: [
      "n8n",
      "Webhooks",
      "Google Sheets API",
      "Google Calendar API",
      "Evolution API",
    ],
  },
  {
    category: "Desarrollo",
    items: ["React", "Vite", "Tailwind CSS", "Node.js", "JavaScript (ES6+)"],
  },
  {
    category: "AI & Bots",
    items: ["GPT-4o / OpenAI", "WhatsApp Bot", "AI Agents (LangChain)"],
  },
  {
    category: "Base de Datos",
    items: ["Supabase (PostgreSQL)", "Google Sheets"],
  },
  {
    category: "Herramientas",
    items: ["Git", "GitHub", "VS Code", "Postman", "WSL"],
  },
];

export const metrics = [
  { value: 2, suffix: "", label: "Proyectos End-to-End" },
  { value: 6, suffix: "+", label: "Herramientas de AI Agent" },
  { value: 3, suffix: "", label: "Servicios Cloud AWS" },
  { value: 100, suffix: "%", label: "Automatización No-Code" },
];

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contacto", href: "#contacto" },
];

export const terminalLines = [
  { text: "$ node automate.js", type: "command" },
  { text: "→ Conectando con n8n...        ✓", type: "output" },
  { text: "→ Configurando webhook...      ✓", type: "output" },
  { text: "→ Pipeline activo              ✓", type: "output" },
  { text: "→ Sincronizando AWS Lambda...  ✓", type: "output" },
  { text: "→ WhatsApp Bot online          ✓", type: "output" },
  { text: "", type: "blank" },
  { text: "✅ Todos los sistemas operativos", type: "success" },
];
