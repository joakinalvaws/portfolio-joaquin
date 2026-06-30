import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { HiArrowLeft } from 'react-icons/hi'

export default function ProjectHero({ proyecto }) {
  const { titulo, subtitulo, estado, enlaces } = proyecto

  return (
    <header className="border-b border-[#1A1A1A] px-6 pb-12 pt-28">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/#proyectos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#9CA3AF] transition-colors hover:text-[#DC2626]"
        >
          <HiArrowLeft />
          Volver a proyectos
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-green-900/60 px-3 py-1 text-xs font-medium text-green-400">
            {estado}
          </span>
          <h1 className="mb-3 text-4xl font-bold text-[#F5F5F5] md:text-5xl">{titulo}</h1>
          <p className="mb-8 font-mono text-lg text-[#DC2626]">{subtitulo}</p>

          <div className="flex flex-wrap gap-4">
            {enlaces.demo && (
              <a
                href={enlaces.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] px-5 py-2.5 font-medium text-white transition-colors duration-300 hover:bg-[#EF4444]"
              >
                <FaExternalLinkAlt className="text-sm" />
                Ver demo en vivo
              </a>
            )}
            {enlaces.github ? (
              <a
                href={enlaces.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#1A1A1A] px-5 py-2.5 font-medium text-[#F5F5F5] transition-colors duration-300 hover:border-[#DC2626]"
              >
                <FaGithub className="text-lg" />
                Ver en GitHub
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#1A1A1A] px-5 py-2.5 font-medium text-[#9CA3AF]/50">
                <FaGithub className="text-lg" />
                Repo próximamente
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </header>
  )
}
