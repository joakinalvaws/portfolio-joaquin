import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { FaGithub, FaExternalLinkAlt, FaFileAlt } from 'react-icons/fa'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { getCaseStudyBySlug, getAdjacentCaseStudies } from '../data/projects'
import useDocumentMeta from '../hooks/useDocumentMeta'
import ProjectHero from '../components/case-study/ProjectHero'
import MetricsBar from '../components/case-study/MetricsBar'
import ContentSection from '../components/case-study/ContentSection'
import ArchitectureDiagram from '../components/case-study/ArchitectureDiagram'
import TechStackGrid from '../components/case-study/TechStackGrid'
import VideoEmbed from '../components/case-study/VideoEmbed'
import MediaGallery from '../components/case-study/MediaGallery'

export default function CaseStudy() {
  const { slug } = useParams()
  const proyecto = getCaseStudyBySlug(slug)

  useDocumentMeta({
    title: proyecto ? `${proyecto.titulo} — Caso de estudio | Joaquín Alva` : undefined,
    description: proyecto?.resumen,
  })

  // Scroll al inicio al cambiar de proyecto.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  // Slug inexistente → de vuelta al home.
  if (!proyecto) return <Navigate to="/" replace />

  const { anterior, siguiente } = getAdjacentCaseStudies(slug)
  const { enlaces } = proyecto

  return (
    <article>
      <ProjectHero proyecto={proyecto} />
      <MetricsBar metricas={proyecto.metricas} />
      <ContentSection eyebrow="El problema" titulo="El problema de negocio" texto={proyecto.problema} />
      <ContentSection eyebrow="La solución" titulo="La solución y las decisiones" texto={proyecto.solucion} />
      <ArchitectureDiagram arquitectura={proyecto.arquitectura} />
      <TechStackGrid stack={proyecto.stack} />
      {proyecto.video && <VideoEmbed video={proyecto.video} titulo={proyecto.titulo} />}
      <MediaGallery galeria={proyecto.galeria} />
      <ContentSection eyebrow="Aprendizajes" titulo="Aprendizajes" texto={proyecto.aprendizajes} />

      {/* Enlaces finales */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex flex-wrap gap-4">
          {enlaces.demo && (
            <a
              href={enlaces.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] px-5 py-2.5 font-medium text-white transition-colors duration-300 hover:bg-[#EF4444]"
            >
              <FaExternalLinkAlt className="text-sm" /> Demo en vivo
            </a>
          )}
          {enlaces.github && (
            <a
              href={enlaces.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#1A1A1A] px-5 py-2.5 font-medium text-[#F5F5F5] transition-colors duration-300 hover:border-[#DC2626]"
            >
              <FaGithub className="text-lg" /> GitHub
            </a>
          )}
          {enlaces.adrs?.map((adr) => (
            <a
              key={adr.url}
              href={adr.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[#1A1A1A] px-5 py-2.5 font-medium text-[#F5F5F5] transition-colors duration-300 hover:border-[#DC2626]"
            >
              <FaFileAlt className="text-sm" /> {adr.label}
            </a>
          ))}
        </div>
      </section>

      {/* Navegación anterior / siguiente */}
      <nav className="mx-auto flex max-w-3xl flex-col gap-4 border-t border-[#1A1A1A] px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        {anterior ? (
          <Link
            to={`/proyectos/${anterior.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-[#9CA3AF] transition-colors hover:text-[#DC2626]"
          >
            <HiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-xs text-[#6B7280]">Anterior</span>
              {anterior.titulo}
            </span>
          </Link>
        ) : (
          <span />
        )}

        <Link
          to="/#proyectos"
          className="text-sm text-[#9CA3AF] transition-colors hover:text-[#DC2626]"
        >
          Todos los proyectos
        </Link>

        {siguiente ? (
          <Link
            to={`/proyectos/${siguiente.slug}`}
            className="group inline-flex items-center gap-2 text-right text-sm text-[#9CA3AF] transition-colors hover:text-[#DC2626] sm:justify-end"
          >
            <span>
              <span className="block text-xs text-[#6B7280]">Siguiente</span>
              {siguiente.titulo}
            </span>
            <HiArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
