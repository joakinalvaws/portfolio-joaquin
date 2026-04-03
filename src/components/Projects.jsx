import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { HiCode, HiChevronDown, HiChevronUp } from 'react-icons/hi'
import { projects } from '../data/content'

const projectImages = import.meta.glob('../assets/proyecto-*.webp', { eager: true, import: 'default' })

function getProjectImage(filename) {
  const key = `../assets/${filename}`
  return projectImages[key] || null
}

function ProjectCard({ project, index }) {
  const [showArch, setShowArch] = useState(false)
  const [imgError, setImgError] = useState(false)
  const imageSrc = getProjectImage(project.image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#1A1A1A] bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#0A0A0A]">
        {imageSrc && !imgError ? (
          <img
            src={imageSrc}
            alt={project.title}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#9CA3AF]">
            <HiCode className="text-3xl" />
            <span className="text-sm">Screenshot aquí</span>
          </div>
        )}

        {/* Status badge */}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${
            project.status === 'Completado'
              ? 'bg-green-900/60 text-green-400'
              : 'bg-yellow-900/60 text-yellow-400'
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-[#F5F5F5]">{project.title}</h3>
        <p className="mb-4 text-sm leading-relaxed text-[#9CA3AF]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-[#1A1A1A] px-2 py-1 text-xs text-[#9CA3AF]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Architecture toggle */}
        <button
          onClick={() => setShowArch(!showArch)}
          className="mb-4 flex items-center gap-1 text-sm text-[#DC2626] transition-colors hover:text-[#EF4444]"
        >
          {showArch ? <HiChevronUp /> : <HiChevronDown />}
          {showArch ? 'Ocultar arquitectura' : 'Ver arquitectura'}
        </button>

        {showArch && (
          <div className="mb-4 overflow-x-auto rounded-lg bg-[#0A0A0A] p-4">
            <pre className="font-mono text-xs leading-relaxed text-[#9CA3AF]">
              {project.architecture}
            </pre>
          </div>
        )}

        {/* GitHub button */}
        <div className="mt-auto">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] transition-colors hover:text-[#DC2626]"
            >
              <FaGithub className="text-lg" />
              Ver en GitHub
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-[#9CA3AF]/50">
              <FaGithub className="text-lg" />
              Próximamente
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="proyectos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-[#F5F5F5] md:text-4xl">
            Proyectos
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-[#DC2626]" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
