import { useEffect } from 'react'

const DEFAULT_TITLE = 'Joaquín Alva | Automation Engineer'

// SEO básico por página: actualiza <title> y <meta name="description">.
// Limitación conocida (SPA sin SSR): el unfurling de links en redes sociales/WhatsApp
// no ejecuta JS, así que og:image dinámico no se refleja ahí. Ver ADR-001.
function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export default function useDocumentMeta({ title, description }) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE
    if (description) setMeta('description', description)
    return () => {
      document.title = DEFAULT_TITLE
    }
  }, [title, description])
}
