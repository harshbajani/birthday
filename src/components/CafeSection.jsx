import { motion } from 'framer-motion'
import { useTimeline } from '../timeline/TimelineContext'
import { CAFE_MIRROR_1 } from '../data/photos'
import SectionShell from './SectionShell'

const cinematic = [0.22, 1, 0.36, 1]

function FloatingSticker({ src, className = '', floatDelay = 0, size = 'w-14 sm:w-20' }) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-30 ${className}`}
      initial={{ opacity: 0, scale: 0.6, y: 15 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
        rotate: [-2, 2, -2],
      }}
      exit={{ opacity: 0, scale: 0.6, y: -10 }}
      transition={{
        opacity: { duration: 0.8, ease: cinematic },
        scale: { duration: 0.8, ease: cinematic },
        y: { repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: floatDelay },
        rotate: { repeat: Infinity, duration: 4.8, ease: 'easeInOut', delay: floatDelay },
      }}
    >
      <img
        src={src}
        alt=""
        className={`${size} object-contain filter drop-shadow-[0_6px_20px_rgba(232,160,180,0.35)]`}
        loading="eager"
      />
    </motion.div>
  )
}

export default function CafeSection() {
  const { currentTime } = useTimeline()

  // Spoken beats within Cafe section (28s – 95s)
  const isBeat1Current = currentTime >= 28 && currentTime < 55
  const isBeat1Past = currentTime >= 55

  const isBeat2Current = currentTime >= 55 && currentTime < 75
  const isBeat2Past = currentTime >= 75

  const isBeat3Current = currentTime >= 75

  return (
    <SectionShell className="bg-bg overflow-hidden">
      {/* Hero photo — bright, clear, and visible */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: cinematic }}
      >
        <img
          src={CAFE_MIRROR_1}
          alt=""
          className="h-full w-full object-cover filter brightness-[1.12] contrast-[1.04]"
          loading="eager"
        />
        <div className="photo-vignette absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-bg/30" />
      </motion.div>

      {/* Unified paragraph card — text highlights live, never closes early! */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-end px-4 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[max(2rem,env(safe-area-inset-top))] text-center">
        <div className="relative flex w-full max-w-lg flex-col items-center">
          <FloatingSticker
            src="/gifs/DpH0qXpLOsb7oAgbpi.gif"
            className="-top-7 -left-3 sm:-top-8 sm:-left-5"
            floatDelay={0}
          />
          <FloatingSticker
            src="/gifs/8huoRKZFKV6EodgObp.gif"
            className="-top-6 -right-3 sm:-top-7 sm:-right-5"
            floatDelay={0.4}
          />

          <div className="relative z-20 w-full rounded-3xl border border-accent/20 bg-bg/65 p-5 sm:p-8 backdrop-blur-md shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
            <span className="mb-3 inline-block font-body text-xs uppercase tracking-[0.25em] text-accent-light">
              Where It All Began ☕✨
            </span>

            <div className="flex flex-col gap-4 font-display leading-relaxed">
              <p
                className={`transition-all duration-700 text-lg sm:text-xl ${
                  isBeat1Current
                    ? 'glow-text font-medium text-accent scale-[1.02]'
                    : isBeat1Past
                    ? 'text-text/90 font-normal'
                    : 'text-text/35 font-light'
                }`}
              >
                “That’s not an exaggeration... go back with me for a second to that café, where we only meant to introduce each other, nothing more.”
              </p>

              <p
                className={`transition-all duration-700 text-lg sm:text-xl ${
                  isBeat2Current
                    ? 'glow-text font-medium text-accent scale-[1.02]'
                    : isBeat2Past
                    ? 'text-text/90 font-normal'
                    : 'text-text/35 font-light'
                }`}
              >
                “I asked you to go to the party... you said no initially, but then you agreed. And instead of that being the end of anything, it became the actual beginning of everything.”
              </p>

              <p
                className={`transition-all duration-700 text-lg sm:text-xl ${
                  isBeat3Current
                    ? 'glow-text font-medium text-accent scale-[1.02]'
                    : 'text-text/35 font-light'
                }`}
              >
                “We just kept talking hours and hours like they were minutes... One day. Already knowing each other’s scars 🤍”
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
