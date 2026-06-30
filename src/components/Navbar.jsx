import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { navLinks } from '../data/content'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#inicio')
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    // El scroll-spy solo aplica en el home (las secciones solo existen ahí).
    if (!isHome) return

    const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
    const observers = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`)
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [isHome])

  const handleClick = (href) => {
    setIsOpen(false)
    if (isHome) {
      // Ya estamos en el home: scroll directo a la sección.
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Estamos en un case study: volver al home con el hash de destino.
      navigate(`/${href}`)
    }
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#DC2626] bg-[#0A0A0A]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleClick('#inicio') }}
          className="font-mono text-xl font-bold text-[#DC2626]"
        >
          &lt;JA/&gt;
        </a>

        {/* Desktop links */}
        <ul className="hidden gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                className={`text-sm transition-colors duration-300 ${
                  activeSection === link.href
                    ? 'text-[#DC2626]'
                    : 'text-[#9CA3AF] hover:text-[#DC2626]'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl text-[#9CA3AF] md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-[65px] z-50 flex h-[calc(100vh-65px)] w-64 flex-col gap-6 border-l border-[#1A1A1A] bg-[#111111] px-8 pt-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                className={`text-lg transition-colors duration-300 ${
                  activeSection === link.href
                    ? 'text-[#DC2626]'
                    : 'text-[#9CA3AF] hover:text-[#DC2626]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
