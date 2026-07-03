import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import CircuitBackground from './components/CircuitBackground'
import Navbar from './components/Navbar'
import Home from './pages/Home'

// El case study se carga bajo demanda: no forma parte del bundle inicial del home.
const CaseStudy = lazy(() => import('./pages/CaseStudy'))

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
        <CircuitBackground />
        <div className="relative z-10">
          <Navbar />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/proyectos/:slug" element={<CaseStudy />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </LazyMotion>
  )
}

export default App
