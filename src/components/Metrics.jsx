import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { metrics } from '../data/content'

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 1500
          const start = performance.now()

          function tick(now) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <span ref={ref} className="font-mono text-4xl font-bold text-[#DC2626] md:text-5xl">
      {count}
      {hasAnimated && suffix}
    </span>
  )
}

export default function Metrics() {
  return (
    <section className="bg-[#111111] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className={`flex flex-col items-center gap-2 ${
                i < metrics.length - 1
                  ? 'md:border-r md:border-[#DC2626]/20'
                  : ''
              }`}
            >
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              <span className="text-center text-sm text-[#9CA3AF]">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
