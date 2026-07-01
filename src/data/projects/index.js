import opsropz from './opsropz'
import kruStore from './kru-store'
import dashboardGuardian from './dashboard-guardian'

/**
 * Modelo de un case study (todos los campos en español, alineado con el brief):
 * @typedef {Object} CaseStudy
 * @property {string} slug          - identificador para la URL /proyectos/:slug
 * @property {string} titulo
 * @property {string} subtitulo
 * @property {string} estado        - ej. "En producción"
 * @property {string} resumen       - 1-2 líneas para la card del home
 * @property {string[]} stackPrincipal - subconjunto de tecnologías para chips de la card
 * @property {string} cardImage     - imagen de la card (puede no existir → placeholder)
 * @property {string} [logo]        - logo del proyecto junto al título (opcional, sin placeholder si falta)
 * @property {string} problema
 * @property {string} solucion
 * @property {{imagen:string, placeholder:string, descripcion:string, ascii:string}} arquitectura
 * @property {string[]} stack
 * @property {{label:string, valor:string}[]} metricas
 * @property {{src:string, alt:string, placeholder:string}[]} galeria
 * @property {?string} video        - URL de YouTube/Loom o null
 * @property {{github:string, demo:string, adrs:{label:string, url:string}[]}} enlaces
 * @property {string} aprendizajes
 */

// El orden define la navegación "anterior / siguiente"
export const caseStudies = [opsropz, kruStore, dashboardGuardian]

export function getCaseStudyBySlug(slug) {
  return caseStudies.find((p) => p.slug === slug) || null
}

/** Devuelve { anterior, siguiente } como objetos {slug, titulo} o null. */
export function getAdjacentCaseStudies(slug) {
  const i = caseStudies.findIndex((p) => p.slug === slug)
  if (i === -1) return { anterior: null, siguiente: null }
  const pick = (p) => (p ? { slug: p.slug, titulo: p.titulo } : null)
  return {
    anterior: pick(caseStudies[i - 1]),
    siguiente: pick(caseStudies[i + 1]),
  }
}
