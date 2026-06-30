import { motion } from 'framer-motion'

// Fila de métricas destacadas del proyecto. Los valores pueden ser no numéricos
// ("94%", "<5s", "Reales"), por eso se muestran con entrada animada en stagger
// en lugar de un contador 0→N.
export default function MetricsBar({ metricas }) {
  if (!metricas?.length) return null

  return (
    <section className="bg-[#111111] px-6 py-12">
      <div
        className={`mx-auto grid max-w-4xl gap-8 ${
          metricas.length >= 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
        }`}
      >
        {metricas.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <span className="font-mono text-3xl font-bold text-[#DC2626] md:text-4xl">
              {m.valor}
            </span>
            <span className="text-sm text-[#9CA3AF]">{m.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
