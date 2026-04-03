import CircuitBackground from './components/CircuitBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import TechStack from './components/TechStack'
import Metrics from './components/Metrics'
import Contact from './components/Contact'

function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5F5F5]">
      <CircuitBackground />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Metrics />
        <Contact />
      </div>
    </div>
  )
}

export default App
