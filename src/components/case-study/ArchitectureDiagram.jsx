import { useState } from 'react'
import { m } from 'framer-motion'
import { HiZoomIn } from 'react-icons/hi'
import { getAsset } from '../../utils/assets'
import Lightbox from './Lightbox'

export default function ArchitectureDiagram({ arquitectura }) {
  const [open, setOpen] = useState(false)
  const imgSrc = getAsset(arquitectura.imagen)

  return (
    <m.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl px-6 py-12"
    >
      <h2 className="mb-4 text-2xl font-bold text-[#F5F5F5] md:text-3xl">Arquitectura</h2>
      <div className="mb-6 h-1 w-12 rounded bg-[#DC2626]" />

      {imgSrc ? (
        // Imagen real del diagrama → ampliable con lightbox
        <button
          onClick={() => setOpen(true)}
          className="group relative w-full overflow-hidden rounded-xl border border-[#1A1A1A]"
          aria-label="Ampliar diagrama de arquitectura"
        >
          <img src={imgSrc} alt={`Diagrama de arquitectura: ${arquitectura.descripcion}`} className="w-full" loading="lazy" />
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-black/70 px-2 py-1 text-xs text-[#F5F5F5] opacity-0 transition-opacity group-hover:opacity-100">
            <HiZoomIn /> Ampliar
          </span>
        </button>
      ) : (
        // Fallback: ASCII del flujo + placeholder visible para el asset pendiente
        <div className="overflow-hidden rounded-xl border border-dashed border-[#DC2626]/40 bg-[#0A0A0A]">
          <div className="border-b border-[#1A1A1A] bg-[#111111] px-4 py-2 text-center font-mono text-xs text-[#DC2626]">
            ⚠ {arquitectura.placeholder}
          </div>
          <div className="overflow-x-auto p-4">
            <pre className="font-mono text-xs leading-relaxed text-[#9CA3AF]">
              {arquitectura.ascii}
            </pre>
          </div>
        </div>
      )}

      <p className="mt-4 text-sm leading-relaxed text-[#9CA3AF]">{arquitectura.descripcion}</p>

      <Lightbox open={open} onClose={() => setOpen(false)} label="Diagrama de arquitectura">
        {imgSrc && <img src={imgSrc} alt={arquitectura.descripcion} className="max-h-[85vh] max-w-full rounded-lg object-contain" />}
      </Lightbox>
    </m.section>
  )
}
