import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import ReplayPrompt from './ReplayPrompt'
import { GALLERY_PHOTOS, PROPOSE_TEXT_1, PROPOSE_TEXT_2 } from '../data/photos'
import { useTimeline } from '../timeline/TimelineContext'

const cinematic = [0.22, 1, 0.36, 1]
const PROPOSE_SRCS = [PROPOSE_TEXT_1, PROPOSE_TEXT_2]

function DriftCard({ src, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index % 2 === 0 ? 20 : 10, index % 2 === 0 ? -14 : -6],
  )

  const isScreenshot = PROPOSE_SRCS.includes(src)

  return (
    <motion.figure
      ref={ref}
      style={{ y }}
      className={`gallery-card photo-vignette mb-3 break-inside-avoid overflow-hidden rounded-xl bg-bg-alt ${
        isScreenshot ? 'screenshot-card mx-auto' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.9, ease: cinematic, delay: (index % 6) * 0.08 }}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="block w-full object-cover"
      />
    </motion.figure>
  )
}

export default function DriftGallery() {
  const { replay } = useTimeline()

  return (
    <section className="relative min-h-dvh bg-bg px-3 pb-[max(3rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
      <header className="mb-8 flex flex-col items-center gap-3 pt-6 text-center">
        <motion.h2
          className="font-display text-3xl text-text"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: cinematic }}
        >
          All of Us
        </motion.h2>
        <ReplayPrompt onReplay={replay} />
      </header>

      <div className="columns-2 gap-3 sm:columns-3">
        {GALLERY_PHOTOS.map((src, index) => (
          <DriftCard key={src} src={src} index={index} />
        ))}
      </div>
    </section>
  )
}
