import { useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'

// Modal reutilizable (imagen ampliada o diagrama). Sin librerías externas.
// onPrev/onNext son opcionales: si se pasan, habilitan flechas + teclado ←/→
// para navegar entre varias imágenes (ej. MediaGallery). Sin ellos, es un
// lightbox de una sola imagen (ej. ArchitectureDiagram).
export default function Lightbox({ open, onClose, onPrev, onNext, counter, children, label = 'Vista ampliada' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    document.addEventListener('keydown', onKey)
    // bloquear scroll del fondo mientras está abierto
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {open && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
        >
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 text-3xl text-[#9CA3AF] transition-colors hover:text-[#DC2626]"
          >
            <HiX />
          </button>

          {onPrev && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              aria-label="Imagen anterior"
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-3xl text-[#F5F5F5] transition-colors hover:text-[#DC2626] sm:left-4"
            >
              <HiChevronLeft />
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              aria-label="Imagen siguiente"
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-3xl text-[#F5F5F5] transition-colors hover:text-[#DC2626] sm:right-4"
            >
              <HiChevronRight />
            </button>
          )}

          <m.div
            key={counter ?? undefined}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-5xl overflow-auto"
          >
            {children}
          </m.div>

          {counter && (
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 font-mono text-xs text-[#9CA3AF]">
              {counter}
            </span>
          )}
        </m.div>
      )}
    </AnimatePresence>
  )
}
