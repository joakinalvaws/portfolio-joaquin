import { useState } from 'react'
import { m } from 'framer-motion'
import { HiLocationMarker, HiUser } from 'react-icons/hi'
import { personalInfo } from '../data/content'
import { getAsset } from '../utils/assets'

// Acepta cualquier extensión común (webp, png, jpg...), no solo .webp literal.
const profileImg = getAsset('foto-perfil.webp') || getAsset('foto-perfil.png') || getAsset('foto-perfil.jpg')

function ProfileImage() {
  const [imgError, setImgError] = useState(!profileImg)

  return (
    <div className="relative mx-auto w-64 lg:w-full lg:max-w-xs">
      <div className="aspect-square overflow-hidden rounded-2xl border-2 border-[#DC2626] bg-[#1A1A1A]">
        {!imgError && (
          <img
            src={profileImg}
            alt={personalInfo.fullName}
            loading="lazy"
            decoding="async"
            width="320"
            height="320"
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
        {imgError && (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-2 text-[#9CA3AF]"
        >
          <HiUser className="text-4xl" />
          <span className="text-sm">Foto aquí</span>
        </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold text-[#F5F5F5]">{personalInfo.fullName}</p>
        <p className="flex items-center justify-center gap-1 text-sm text-[#9CA3AF]">
          <HiLocationMarker className="text-[#DC2626]" />
          {personalInfo.location}
        </p>
      </div>
    </div>
  )
}

export default function About() {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="sobre-mi" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section title */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold text-[#F5F5F5] md:text-4xl">
            Sobre Mí
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-[#DC2626]" />
        </m.div>

        <m.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid items-start gap-12 lg:grid-cols-[auto_1fr]"
        >
          {/* Left — Photo */}
          <m.div variants={fadeIn}>
            <ProfileImage />
          </m.div>

          {/* Right — Bio */}
          <div className="space-y-6">
            {personalInfo.bio.map((paragraph, i) => (
              <m.p
                key={i}
                variants={fadeIn}
                className="leading-relaxed text-[#9CA3AF]"
              >
                {paragraph}
              </m.p>
            ))}

            {/* Highlights */}
            <m.div variants={fadeIn} className="flex flex-wrap gap-3 pt-4">
              {personalInfo.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#1A1A1A] bg-[#1A1A1A] px-4 py-2 text-sm text-[#9CA3AF]"
                >
                  {item}
                </span>
              ))}
            </m.div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
