import { useState } from 'react'
import { m } from 'framer-motion'
import { HiPhotograph, HiZoomIn } from 'react-icons/hi'
import { getAsset } from '../../utils/assets'
import Lightbox from './Lightbox'

export default function MediaGallery({ galeria }) {
  const [activeIndex, setActiveIndex] = useState(null)
  if (!galeria?.length) return null

  // Solo las imágenes con asset real son navegables en el lightbox
  // (los placeholders no abren nada).
  const images = galeria
    .map((item) => ({ ...item, resolvedSrc: getAsset(item.src) }))
    .filter((item) => item.resolvedSrc)

  const active = activeIndex !== null ? images[activeIndex] : null
  const goTo = (delta) =>
    setActiveIndex((i) => (i + delta + images.length) % images.length)

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="mb-4 text-2xl font-bold text-[#F5F5F5] md:text-3xl">Galería</h2>
      <div className="mb-6 h-1 w-12 rounded bg-[#DC2626]" />

      <div className="grid gap-4 sm:grid-cols-2">
        {galeria.map((item, i) => {
          const src = getAsset(item.src)
          return (
            <m.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {src ? (
                <button
                  onClick={() => setActiveIndex(images.findIndex((img) => img.src === item.src))}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#1A1A1A]"
                  aria-label={`Ampliar: ${item.alt}`}
                >
                  <img src={src} alt={item.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs text-[#F5F5F5] opacity-0 transition-opacity group-hover:opacity-100">
                    <HiZoomIn /> Ampliar
                  </span>
                </button>
              ) : (
                // Placeholder visible para asset pendiente
                <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#DC2626]/40 bg-[#0A0A0A] p-4 text-center">
                  <HiPhotograph className="text-3xl text-[#9CA3AF]" />
                  <span className="font-mono text-xs text-[#DC2626]">⚠ {item.placeholder}</span>
                </div>
              )}
            </m.div>
          )
        })}
      </div>

      <Lightbox
        open={activeIndex !== null}
        onClose={() => setActiveIndex(null)}
        onPrev={images.length > 1 ? () => goTo(-1) : undefined}
        onNext={images.length > 1 ? () => goTo(1) : undefined}
        counter={active ? `${activeIndex + 1} / ${images.length}` : null}
        label={active?.alt}
      >
        {active && <img src={active.resolvedSrc} alt={active.alt} className="max-h-[85vh] max-w-full rounded-lg object-contain" />}
      </Lightbox>
    </section>
  )
}
