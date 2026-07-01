import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa'
import { HiExternalLink } from 'react-icons/hi'
import { certifications } from '../data/certifications'
import { getAsset } from '../utils/assets'
import Lightbox from './case-study/Lightbox'

function CertificationCard({ cert, index }) {
  const [open, setOpen] = useState(false)
  const badge = getAsset(cert.insignia)
  const clickable = Boolean(badge || cert.credencial)

  // Con insignia → abre el lightbox (con botón "Ver credencial" adentro si hay link).
  // Sin insignia pero con link → abre la credencial directo.
  const handleOpen = () => {
    if (badge) setOpen(true)
    else if (cert.credencial) window.open(cert.credencial, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex flex-col gap-3 rounded-xl border border-[#1A1A1A] bg-[#111111] p-5 transition-all duration-300 hover:border-[#DC2626] hover:shadow-[0_0_15px_rgba(220,38,38,0.15)]"
    >
      <div className="relative w-fit">
        <button
          type="button"
          onClick={clickable ? handleOpen : undefined}
          aria-label={badge ? `Ver insignia de ${cert.nombre}` : `Ver credencial de ${cert.nombre}`}
          className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#1A1A1A] text-[#DC2626] ${
            clickable ? 'cursor-pointer transition-transform duration-300 hover:scale-105' : 'cursor-default'
          }`}
        >
          {badge ? (
            <img src={badge} alt="" className="h-full w-full object-contain" />
          ) : (
            <FaCertificate className="text-xl" />
          )}
        </button>
        {clickable && (
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC2626] text-[8px] text-white">
            <HiExternalLink />
          </span>
        )}
      </div>

      <div>
        <h3 className="font-medium leading-snug text-[#F5F5F5]">{cert.nombre}</h3>
        <p className="mt-1 text-sm text-[#9CA3AF]">{cert.emisor}</p>
      </div>

      <span className="mt-auto font-mono text-xs text-[#DC2626]">{cert.anio}</span>

      {badge && (
        <Lightbox open={open} onClose={() => setOpen(false)} label={`Insignia: ${cert.nombre}`}>
          <div className="flex flex-col items-center gap-4 p-2">
            <img src={badge} alt={cert.nombre} className="max-h-[70vh] rounded-lg" />
            {cert.credencial && (
              <a
                href={cert.credencial}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] px-5 py-2.5 font-medium text-white transition-colors duration-300 hover:bg-[#EF4444]"
              >
                <FaExternalLinkAlt className="text-sm" />
                Ver credencial
              </a>
            )}
          </div>
        </Lightbox>
      )}
    </motion.div>
  )
}

export default function Certifications() {
  if (!certifications?.length) return null

  return (
    <section id="certificaciones" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-[#F5F5F5] md:text-4xl">Certificaciones</h2>
          <div className="mx-auto h-1 w-16 rounded bg-[#DC2626]" />
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.nombre} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
