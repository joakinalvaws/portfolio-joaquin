import { motion } from 'framer-motion'
import { getTechIcon } from '../../utils/techIcons'

export default function TechStackGrid({ stack }) {
  if (!stack?.length) return null

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h2 className="mb-4 text-2xl font-bold text-[#F5F5F5] md:text-3xl">Stack tecnológico</h2>
      <div className="mb-6 h-1 w-12 rounded bg-[#DC2626]" />

      <div className="flex flex-wrap gap-3">
        {stack.map((item, i) => {
          const Icon = getTechIcon(item)
          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group flex items-center gap-2 rounded-lg border border-[#1A1A1A] bg-[#111111] px-4 py-3 transition-all duration-300 hover:scale-105 hover:border-[#DC2626]"
            >
              <Icon className="text-lg text-[#9CA3AF] transition-colors duration-300 group-hover:text-[#DC2626]" />
              <span className="text-sm text-[#9CA3AF]">{item}</span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
