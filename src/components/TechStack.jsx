import { motion } from 'framer-motion'
import { techStack } from '../data/content'
import { getTechIcon, getCategoryIcon } from '../utils/techIcons'

export default function TechStack() {
  return (
    <section id="tech-stack" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-[#F5F5F5] md:text-4xl">
            Stack Tecnológico
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-[#DC2626]" />
        </motion.div>

        <div className="space-y-10">
          {techStack.map((group, gi) => {
            const CategoryIcon = getCategoryIcon(group.category)
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: gi * 0.1 }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <CategoryIcon className="text-lg text-[#DC2626]" />
                  <h3 className="font-mono text-sm font-semibold text-[#F5F5F5]">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {group.items.map((item, ii) => {
                    const Icon = getTechIcon(item)
                    return (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: gi * 0.1 + ii * 0.05,
                        }}
                        className="group flex items-center gap-2 rounded-lg border border-[#1A1A1A] bg-[#111111] px-4 py-3 transition-all duration-300 hover:scale-105 hover:border-[#DC2626]"
                      >
                        <Icon className="text-lg text-[#9CA3AF] transition-colors duration-300 group-hover:text-[#DC2626]" />
                        <span className="text-sm text-[#9CA3AF]">{item}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
