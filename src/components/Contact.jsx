import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa'
import { HiMail, HiLocationMarker, HiDownload } from 'react-icons/hi'
import { personalInfo } from '../data/content'

// Solo dígitos + código de país, como lo pide wa.me (sin "+" ni espacios).
const whatsappNumber = personalInfo.phone.replace(/\D/g, '')

const contactItems = [
  {
    icon: HiMail,
    label: personalInfo.email,
    // Abre el compositor web de Gmail directo (en vez de depender de un
    // cliente de correo local configurado, que muchos visitantes no tienen).
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`,
    external: true,
  },
  {
    icon: FaWhatsapp,
    label: personalInfo.phone,
    href: `https://wa.me/${whatsappNumber}`,
    external: true,
  },
  {
    icon: HiLocationMarker,
    label: personalInfo.location,
    href: null,
  },
]

const socialLinks = [
  { icon: FaLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
  { icon: FaGithub, href: personalInfo.social.github, label: 'GitHub' },
]

export default function Contact() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="contacto" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-[#F5F5F5] md:text-4xl">
            Contacto
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-[#DC2626]" />
        </motion.div>

        {/* CTA phrase */}
        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 text-center text-xl text-[#9CA3AF] md:text-2xl"
        >
          ¿Tienes un proceso que necesita automatización?{' '}
          <span className="text-[#F5F5F5]">Hablemos.</span>
        </motion.p>

        {/* Contact grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1 }}
          className="mb-12 grid gap-6 md:grid-cols-3"
        >
          {contactItems.map((item) => {
            const Icon = item.icon
            const content = (
              <div className="flex items-center gap-3 rounded-xl border border-[#1A1A1A] bg-[#111111] p-5 transition-all duration-300 hover:border-[#DC2626]">
                <Icon className="text-2xl text-[#DC2626]" />
                <span className="text-sm text-[#9CA3AF]">{item.label}</span>
              </div>
            )

            return (
              <motion.div key={item.label} variants={fadeIn}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="block"
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            )
          })}
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 flex items-center justify-center gap-6"
        >
          {socialLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-3xl text-[#9CA3AF] transition-all duration-300 hover:scale-115 hover:text-[#DC2626]"
              >
                <Icon />
              </a>
            )
          })}
        </motion.div>

        {/* Download CV button */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href={personalInfo.cvFile}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] px-8 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-[#EF4444] hover:shadow-[0_0_25px_rgba(220,38,38,0.4)]"
          >
            <HiDownload className="text-xl" />
            Descargar CV
          </a>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 border-t border-[#DC2626]/20 pt-8 text-center">
          <p className="text-sm text-[#6B7280]">
            Diseñado y construido por Joaquín Alva · 2025
          </p>
        </div>
      </div>
    </section>
  )
}
