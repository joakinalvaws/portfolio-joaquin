import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiDownload } from 'react-icons/hi'
import { personalInfo, terminalLines } from '../data/content'

function TerminalTypewriter() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentChar, setCurrentChar] = useState(0)
  const [currentLine, setCurrentLine] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    if (currentLine >= terminalLines.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines([])
        setCurrentLine(0)
        setCurrentChar(0)
      }, 3000)
      return () => clearTimeout(timeout)
    }

    const line = terminalLines[currentLine]

    if (line.type === 'blank') {
      setDisplayedLines((prev) => [...prev, { ...line, displayed: '' }])
      setCurrentLine((prev) => prev + 1)
      setCurrentChar(0)
      return
    }

    if (currentChar < line.text.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev]
          const idx = updated.length - 1
          if (idx >= 0 && updated[idx].lineIndex === currentLine) {
            updated[idx] = {
              ...updated[idx],
              displayed: line.text.slice(0, currentChar + 1),
            }
          } else {
            updated.push({
              ...line,
              displayed: line.text.slice(0, currentChar + 1),
              lineIndex: currentLine,
            })
          }
          return updated
        })
        setCurrentChar((prev) => prev + 1)
      }, line.type === 'command' ? 50 : 25)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + 1)
        setCurrentChar(0)
      }, 800)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar])

  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#1A1A1A] bg-[#111111]">
      {/* Window bar */}
      <div className="flex items-center gap-2 border-b border-[#1A1A1A] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
        <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
        <span className="h-3 w-3 rounded-full bg-[#22C55E]" />
        <span className="ml-2 font-mono text-xs text-[#9CA3AF]">terminal</span>
      </div>

      {/* Terminal content */}
      <div className="p-4 font-mono text-sm leading-relaxed">
        {displayedLines.map((line, i) => (
          <div key={i} className={line.type === 'blank' ? 'h-4' : ''}>
            <span
              className={
                line.type === 'command'
                  ? 'text-[#F5F5F5]'
                  : line.type === 'success'
                    ? 'text-[#22C55E]'
                    : 'text-[#9CA3AF]'
              }
            >
              {line.displayed}
            </span>
          </div>
        ))}
        <span
          className={`inline-block h-4 w-2 bg-[#DC2626] ${
            showCursor ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-100`}
        />
      </div>
    </div>
  )
}

export default function Hero() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
    }),
  }

  return (
    <section
      id="inicio"
      className="flex min-h-screen items-center justify-center px-6 py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left column */}
        <div>
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-2 text-sm text-[#9CA3AF]"
          >
            Hola, soy
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-2 text-4xl font-bold text-[#F5F5F5] md:text-5xl"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 font-mono text-xl text-[#DC2626] md:text-2xl"
          >
            {personalInfo.title}
          </motion.p>

          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8 max-w-md text-[#9CA3AF]"
          >
            {personalInfo.description}
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <a
              href={personalInfo.cvFile}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-[#EF4444]"
            >
              <HiDownload className="text-lg" />
              Descargar CV
            </a>
            <a
              href="#proyectos"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#proyectos')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-[#DC2626] px-6 py-3 font-medium text-[#DC2626] transition-colors duration-300 hover:bg-[#DC2626]/10"
            >
              Ver Proyectos
            </a>
          </motion.div>
        </div>

        {/* Right column — Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TerminalTypewriter />

          {/* Pipeline line */}
          <div className="relative mt-4 h-[2px] w-full overflow-hidden bg-[#1A1A1A]">
            <div className="animate-pipeline absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent via-[#DC2626] to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
