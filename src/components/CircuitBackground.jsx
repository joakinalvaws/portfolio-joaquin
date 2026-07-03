import { useEffect, useRef } from 'react'

export default function CircuitBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Sin animación para quienes piden movimiento reducido (y ahorra batería).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const CONNECTION_DISTANCE = 150
    const SPEED = 0.3

    // Densidad proporcional al área: ~70 en desktop, ~20-25 en un móvil,
    // para no quemar CPU/batería en pantallas chicas.
    const particleCount = () =>
      Math.min(70, Math.max(18, Math.round((window.innerWidth * window.innerHeight) / 28000)))

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    function createParticles() {
      particles = []
      const count = particleCount()
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * SPEED * 2,
          vy: (Math.random() - 0.5) * SPEED * 2,
          radius: Math.random() * 2 + 1,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function draw(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Pulsing opacity
        const opacity = 0.3 + 0.4 * Math.sin(time * 0.001 + p.phase)

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 38, 38, ${opacity})`
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(220, 38, 38, ${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    // Debounce: recrear partículas solo cuando el resize termina (en móvil
    // la barra del navegador dispara resize constantemente al hacer scroll).
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        createParticles()
      }, 150)
    }

    resize()
    createParticles()
    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}
