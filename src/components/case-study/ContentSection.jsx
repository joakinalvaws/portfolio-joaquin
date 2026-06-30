import { motion } from 'framer-motion'

// Bloque de texto con título y decorador rojo (mismo patrón que las secciones del home).
// `texto` puede traer dobles saltos de línea → se separa en párrafos.
export default function ContentSection({ titulo, texto, eyebrow }) {
  const parrafos = texto.split('\n\n').filter(Boolean)

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl px-6 py-12"
    >
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[#DC2626]">
          {eyebrow}
        </p>
      )}
      <h2 className="mb-4 text-2xl font-bold text-[#F5F5F5] md:text-3xl">{titulo}</h2>
      <div className="mb-6 h-1 w-12 rounded bg-[#DC2626]" />
      <div className="space-y-4">
        {parrafos.map((p, i) => (
          <p key={i} className="leading-relaxed text-[#9CA3AF]">
            {p}
          </p>
        ))}
      </div>
    </motion.section>
  )
}
