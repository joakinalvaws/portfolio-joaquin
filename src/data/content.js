export const personalInfo = {
  name: "Joaquín Alva",
  fullName: "Joaquín Alva Vega",
  title: "Automation Engineer",
  location: "Lima, Perú",
  email: "joakinalvaws@gmail.com",
  phone: "+51 936889160",
  description:
    "Técnico en Sistemas especializado en automatización, IA aplicada y soluciones Cloud serverless (AWS). Construyo sistemas end-to-end en producción.",
  bio: [
    "Técnico en Sistemas egresado del IESTP María Rosario Araoz Pinto, especializado en automatización de procesos, IA aplicada e infraestructura Cloud.",
    "Mi trabajo va de pipelines serverless en AWS (Lambda, Bedrock, DynamoDB con Terraform) a e-commerce full-stack en producción y agentes autónomos de IA. He llevado a producción tres sistemas: detección de anomalías de inventario con IA (OpsRopz), una tienda online con pagos reales y asistente de WhatsApp (KRU Store) y un agente de auditoría de dashboards (Dashboard Guardian).",
    "Creo firmemente que la automatización no reemplaza personas, las potencia. Mi objetivo es transformar procesos manuales y repetitivos en flujos inteligentes que ahorren tiempo y recursos.",
  ],
  highlights: [
    "Técnico en Sistemas",
    "Cloud AWS & Serverless",
    "IA & Agentes",
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

// Los proyectos ahora viven como case studies en src/data/projects/.
// Ver caseStudies en '../data/projects'.

export const techStack = [
  {
    category: "Cloud & Infraestructura",
    items: [
      "AWS Lambda",
      "AWS Bedrock",
      "Terraform",
      "Docker",
      "Traefik",
      "Vercel",
      "VPS Linux",
    ],
  },
  {
    category: "IA & Agentes",
    items: ["Claude (Anthropic)", "OpenAI Agents SDK", "GPT-4o", "AI Agents"],
  },
  {
    category: "Desarrollo",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "Python",
      "JavaScript (ES6+)",
      "Tailwind CSS",
    ],
  },
  {
    category: "Datos & Bases",
    items: ["Supabase (PostgreSQL)", "PostgreSQL", "DynamoDB", "Upstash Redis"],
  },
  {
    category: "Automatización & Integraciones",
    items: [
      "GitHub Actions",
      "n8n",
      "Webhooks",
      "Power BI REST API",
      "Azure AD",
      "Mercado Pago",
      "WhatsApp",
      "Telegram",
    ],
  },
  {
    category: "Herramientas",
    items: ["Git", "GitHub", "VS Code", "Postman", "WSL"],
  },
];

export const metrics = [
  { value: 3, suffix: "", label: "Proyectos en producción" },
  { value: 3, suffix: "", label: "Agentes de IA integrados" },
  { value: 94, suffix: "%", label: "Cobertura de tests (IA)" },
  { value: 100, suffix: "%", label: "Infraestructura como código" },
];

export const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre Mí", href: "#sobre-mi" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contacto", href: "#contacto" },
];

export const terminalLines = [
  { text: "$ node deploy.js", type: "command" },
  { text: "→ OpsRopz · AWS Bedrock (Claude)   ✓", type: "output" },
  { text: "→ KRU Store · Mercado Pago         ✓", type: "output" },
  { text: "→ Dashboard Guardian · Power BI    ✓", type: "output" },
  { text: "→ CI/CD GitHub Actions             ✓", type: "output" },
  { text: "", type: "blank" },
  { text: "✅ Todos los sistemas en producción", type: "success" },
];
