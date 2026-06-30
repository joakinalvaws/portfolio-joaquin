import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiJavascript,
  SiDocker,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiPostman,
  SiLinux,
  SiGooglesheets,
  SiGooglecalendar,
  SiSupabase,
  SiOpenai,
  SiAnthropic,
  SiTerraform,
  SiNextdotjs,
  SiVercel,
  SiTraefikproxy,
  SiPostgresql,
  SiTelegram,
  SiPython,
  SiUpstash,
  SiRedis,
  SiMercadopago,
} from 'react-icons/si'
import {
  FaAws,
  FaMicrosoft,
  FaServer,
  FaCogs,
  FaCloud,
  FaCode,
  FaWhatsapp,
  FaBrain,
  FaRobot,
  FaDatabase,
  FaTools,
} from 'react-icons/fa'
import { VscTerminalBash } from 'react-icons/vsc'

// Mapa centralizado: nombre de tecnología → componente de ícono.
// Reutilizado por TechStack (home) y TechStackGrid (case study).
const iconMap = {
  // Cloud & infra
  'AWS Lambda': FaAws,
  'AWS SQS': FaAws,
  'AWS DynamoDB': FaAws,
  'AWS SNS': FaAws,
  'AWS SES': FaAws,
  'AWS Bedrock': FaAws,
  S3: FaAws,
  CloudFront: FaAws,
  Docker: SiDocker,
  Traefik: SiTraefikproxy,
  'VPS Linux': SiLinux,
  Terraform: SiTerraform,
  Vercel: SiVercel,
  // Automatización
  n8n: FaCogs,
  Webhooks: FaCloud,
  'Google Sheets API': SiGooglesheets,
  'Google Calendar API': SiGooglecalendar,
  'Evolution API': FaWhatsapp,
  'GitHub Actions': SiGithubactions,
  // Desarrollo
  React: SiReact,
  Vite: SiVite,
  'Next.js': SiNextdotjs,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': SiNodedotjs,
  'JavaScript (ES6+)': SiJavascript,
  Python: SiPython,
  // AI & bots
  'GPT-4o / OpenAI': SiOpenai,
  'GPT-4o': SiOpenai,
  'OpenAI Agents SDK': SiOpenai,
  'Claude Haiku': SiAnthropic,
  'Claude (Anthropic)': SiAnthropic,
  'WhatsApp Bot': FaWhatsapp,
  WhatsApp: FaWhatsapp,
  'AI Agents (LangChain)': FaBrain,
  'AI Agents': FaBrain,
  // Datos
  'Supabase (PostgreSQL)': SiSupabase,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  DynamoDB: FaAws,
  'Google Sheets': SiGooglesheets,
  // Pagos / integraciones
  'Mercado Pago': SiMercadopago,
  'Upstash Redis': SiUpstash,
  Redis: SiRedis,
  Telegram: SiTelegram,
  'Power BI REST API': FaServer,
  'Azure AD': FaMicrosoft,
  // Herramientas
  Git: SiGit,
  GitHub: SiGithub,
  'VS Code': FaCode,
  Postman: SiPostman,
  WSL: VscTerminalBash,
}

const categoryIcons = {
  'Cloud & Infraestructura': FaCloud,
  'IA & Agentes': FaRobot,
  Desarrollo: FaCode,
  'Datos & Bases': FaDatabase,
  'Automatización & Integraciones': FaCogs,
  Herramientas: FaTools,
  // alias previos (por compatibilidad)
  Automatización: FaCogs,
  'AI & Bots': FaRobot,
  'Base de Datos': FaDatabase,
}

export function getTechIcon(name) {
  return iconMap[name] || FaCogs
}

export function getCategoryIcon(name) {
  return categoryIcons[name] || FaTools
}
