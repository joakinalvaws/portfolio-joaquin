import { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

// Convierte una URL de YouTube/Loom en su forma embebible + miniatura.
function parseVideo(url) {
  if (!url) return null

  // YouTube
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/)
  if (yt) {
    const id = yt[1]
    return {
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1`,
      thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    }
  }

  // Loom
  const loom = url.match(/loom\.com\/(?:share|embed)\/([\w-]+)/)
  if (loom) {
    return {
      embedUrl: `https://www.loom.com/embed/${loom[1]}?autoplay=1`,
      thumbnail: null,
    }
  }

  return { embedUrl: url, thumbnail: null }
}

export default function VideoEmbed({ video, titulo }) {
  const [playing, setPlaying] = useState(false)
  const parsed = parseVideo(video)
  if (!parsed) return null

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h2 className="mb-4 text-2xl font-bold text-[#F5F5F5] md:text-3xl">Demo en video</h2>
      <div className="mb-6 h-1 w-12 rounded bg-[#DC2626]" />

      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-[#1A1A1A] bg-[#0A0A0A]">
        {playing ? (
          <iframe
            src={parsed.embedUrl}
            title={`Video: ${titulo}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Reproducir video de ${titulo}`}
            className="group absolute inset-0 flex h-full w-full items-center justify-center"
          >
            {parsed.thumbnail && (
              <img
                src={parsed.thumbnail}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
            )}
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#DC2626] text-white transition-transform duration-300 group-hover:scale-110">
              <FaPlay className="ml-1 text-xl" />
            </span>
          </button>
        )}
      </div>
    </section>
  )
}
