import { Routes, Route } from 'react-router-dom'
import CircuitBackground from './components/CircuitBackground'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'

function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      <CircuitBackground />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos/:slug" element={<CaseStudy />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
