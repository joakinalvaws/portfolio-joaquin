import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import TechStack from '../components/TechStack'
import Metrics from '../components/Metrics'
import Contact from '../components/Contact'

export default function Home() {
  const { hash } = useLocation()

  // Al volver a "/" con un hash (ej. desde un case study → "/#proyectos"),
  // hacer scroll a la sección correspondiente una vez montado.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const el = document.querySelector(hash)
    if (el) {
      // pequeño delay para asegurar que las secciones ya estén en el DOM
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [hash])

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Metrics />
      <Contact />
    </>
  )
}
