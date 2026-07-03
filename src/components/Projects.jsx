import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiCode, HiArrowRight } from 'react-icons/hi'
import { caseStudies } from '../data/projects'
import { getAsset } from '../utils/assets'

function ProjectCard({ project, index }) {
  const imageSrc = getAsset(project.cardImage)

  return (
    <m.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Link
        to={`/proyectos/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#1A1A1A] bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-[#DC2626] hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]"
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-[#0A0A0A]">
          {imageSrc ? (
            <img src={imageSrc} alt={project.titulo} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#9CA3AF]">
              <HiCode className="text-3xl" />
              <span className="text-sm">Screenshot aquí</span>
            </div>
          )}
          <span className="absolute right-3 top-3 rounded-full bg-green-900/60 px-3 py-1 text-xs font-medium text-green-400">
            {project.estado}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="mb-1 text-xl font-bold text-[#F5F5F5]">{project.titulo}</h3>
          <p className="mb-3 font-mono text-xs text-[#DC2626]">{project.subtitulo}</p>
          <p className="mb-4 text-sm leading-relaxed text-[#9CA3AF]">{project.resumen}</p>

          {/* Main stack chips */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.stackPrincipal.map((tag) => (
              <span key={tag} className="rounded-md bg-[#1A1A1A] px-2 py-1 text-xs text-[#9CA3AF]">
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-[#DC2626] transition-colors group-hover:text-[#EF4444]">
            Ver case study
            <HiArrowRight className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </m.div>
  )
}

export default function Projects() {
  return (
    <section id="proyectos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-[#F5F5F5] md:text-4xl">Proyectos</h2>
          <div className="mx-auto h-1 w-16 rounded bg-[#DC2626]" />
        </m.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
