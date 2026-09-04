import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Aurora from './Aurora'
import { useTimeline } from '../timeline/TimelineContext'
import { useThemeStops } from '../hooks/useThemeStops'
import SectionShell from './SectionShell'

const cinematic = [0.22, 1, 0.36, 1]

function FloatingSticker({ src, className = '', floatDelay = 0, size = 'w-16 sm:w-22 md:w-26' }) {
  return (
    <motion.div
      className={`pointer-events-none absolute z-10 ${className}`}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
        rotate: [-3, 3, -3],
      }}
      exit={{ opacity: 0, scale: 0.5, y: -15 }}
      transition={{
        opacity: { duration: 1, ease: cinematic },
        scale: { duration: 1, ease: cinematic },
        y: { repeat: Infinity, duration: 4, ease: 'easeInOut', delay: floatDelay },
        rotate: { repeat: Infinity, duration: 5, ease: 'easeInOut', delay: floatDelay },
      }}
    >
      <img
        src={src}
        alt=""
        className={`${size} object-contain filter drop-shadow-[0_8px_24px_rgba(232,160,180,0.45)]`}
        loading="eager"
      />
    </motion.div>
  )
}

export default function AudioGate() {
  const { started, begin, currentTime } = useTimeline()
  const colorStops = useThemeStops()
  const [clicked, setClicked] = useState(false)

  // Floating background romantic particles (hearts, petals, sparkles)
  const particles = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      emoji: ['✨', '💖', '🌷', '🌸', '🤍', '💫', '🎂', '💌'][i % 8],
      x: 6 + (i * 6) + (Math.sin(i) * 3),
      delay: (i * 0.45) % 4,
      duration: 7 + (i % 5),
      size: 14 + (i % 4) * 4,
    }))
  }, [])

  const handleBegin = () => {
    if (!started) {
      setClicked(true)
      begin()
    }
  }

  // Active audio timeline beat for Section 1 (0–32s)
  const showIntroLine = currentTime >= 2 && currentTime < 14
  const showRepeatLine = currentTime >= 14

  return (
    <SectionShell className="bg-bg overflow-hidden">
      {/* Aurora backdrop */}
      <div className="absolute inset-0 opacity-85">
        <Aurora colorStops={colorStops} amplitude={0.9} blend={0.7} speed={0.4} />
      </div>

      {/* Radial warmth glow in center */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,160,180,0.18)_0%,transparent_70%)]" />

      {/* Floating romantic ambient particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute select-none opacity-60"
            style={{ left: `${p.x}%`, bottom: '-30px', fontSize: `${p.size}px` }}
            animate={{
              y: [0, -900],
              x: [0, p.id % 2 === 0 ? 30 : -30, 0],
              opacity: [0, 0.75, 0.75, 0],
              rotate: [0, p.id % 2 === 0 ? 45 : -45],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </div>

      {/* Aesthetic Floating GIF Stickers in outer margins */}
      <FloatingSticker
        src="/gifs/baPXC3RsDe8yKD6y3U.gif"
        className="top-6 left-4 sm:top-12 sm:left-12"
        floatDelay={0}
      />
      <FloatingSticker
        src="/gifs/BP2w6PP1waA5xa07gp.gif"
        className="top-8 right-4 sm:top-14 sm:right-14"
        floatDelay={0.4}
      />
      <FloatingSticker
        src="/gifs/DpH0qXpLOsb7oAgbpi.gif"
        className="bottom-16 left-5 sm:bottom-20 sm:left-16"
        floatDelay={0.8}
      />
      <FloatingSticker
        src="/gifs/Kb3rmGKyyov27n0fFl.gif"
        className="bottom-14 right-5 sm:bottom-18 sm:right-16"
        floatDelay={1.2}
      />

      {/* Main Content Area */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-5 py-8 text-center">
        <AnimatePresence mode="wait">
          {!started ? (
            /* ============================================================ */
            /* ENTRANCE / INVITATION STATE (Dramatic Birthday Opening)       */
            /* ============================================================ */
            <motion.div
              key="entrance-gate"
              className="relative flex w-full max-w-xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -25 }}
              transition={{ duration: 1.4, ease: cinematic }}
            >
              {/* Little love badge */}
              <motion.div
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 backdrop-blur-md shadow-[0_0_20px_rgba(232,160,180,0.2)]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="text-sm">💌</span>
                <span className="font-body text-xs uppercase tracking-[0.28em] text-accent-light">
                  A Love Letter For My Wife
                </span>
                <span className="text-sm">✨</span>
              </motion.div>

              {/* Main dramatic Hero Title */}
              <motion.div
                className="relative my-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.35, ease: cinematic }}
              >
                <h1 className="glow-text font-display text-6xl font-medium tracking-tight sm:text-7xl md:text-8xl">
                  Yashvi <span className="inline-block animate-bounce">🌷</span>
                </h1>
                <p className="mt-4 font-display text-2xl font-light tracking-wide text-text-muted sm:text-3xl">
                  Happy Birthday, My Whole World 🤍
                </p>
              </motion.div>

              {/* Romantic subtext & headphone note */}
              <motion.p
                className="mt-2 font-body text-sm text-text-muted/80 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                🎧 Turn up your volume for the best experience
              </motion.p>

              {/* Dramatic Pulsing CTA Button */}
              <motion.div
                className="relative mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {/* Concentric pulsing glow rings */}
                <span className="pointer-events-none absolute -inset-3 rounded-full bg-accent/20 blur-lg animate-ping opacity-50" />
                <span className="pointer-events-none absolute -inset-1 rounded-full bg-accent/30 blur-md animate-pulse" />

                <motion.button
                  type="button"
                  onClick={handleBegin}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative z-10 flex cursor-pointer items-center gap-3 rounded-full border border-accent/40 bg-gradient-to-r from-accent/25 via-accent/35 to-accent/25 px-8 py-4 backdrop-blur-xl shadow-[0_8px_32px_rgba(232,160,180,0.35)] transition-all hover:border-accent hover:shadow-[0_8px_40px_rgba(232,160,180,0.55)]"
                  aria-label="Tap to open your birthday surprise"
                >
                  <span className="text-xl">🎁</span>
                  <span className="font-body text-sm font-semibold uppercase tracking-[0.25em] text-text">
                    Open Your Birthday Story
                  </span>
                  <span className="text-xl">✨</span>
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* AUDIO PLAYING STATE (0s to 32s — synchronized voice text)   */
            /* ============================================================ */
            <motion.div
              key="playing-opening"
              className="relative flex w-full max-w-xl flex-col items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: cinematic }}
            >
              {/* Celebratory burst indicator */}
              <motion.div
                className="pointer-events-none absolute -inset-16 rounded-full bg-accent/15 blur-3xl"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.3, 1], opacity: [0, 0.6, 0.2] }}
                transition={{ duration: 3 }}
              />

              <div className="relative z-20 rounded-3xl border border-accent/20 bg-bg/55 px-6 py-10 backdrop-blur-md sm:px-12 sm:py-14 shadow-[0_12px_48px_rgba(232,160,180,0.2)]">
                <h1 className="glow-text font-display text-4xl font-medium sm:text-5xl">
                  Yashvi 🌷
                </h1>

                {/* Subtitle beats synced to the voice note */}
                <div className="mt-6 min-h-[90px] flex flex-col items-center justify-center">
                  <AnimatePresence mode="wait">
                    {showIntroLine && (
                      <motion.div
                        key="opening-intro"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 1, ease: cinematic }}
                      >
                        <p className="font-display text-2xl font-light leading-relaxed text-text sm:text-3xl">
                          Happy Birthday, my baby 🎂🌷
                        </p>
                        <p className="mt-2 font-display text-lg text-accent-light">
                          I am really happy for your birthday.
                        </p>
                      </motion.div>
                    )}

                    {showRepeatLine && (
                      <motion.div
                        key="opening-repeat"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 1, ease: cinematic }}
                      >
                        <p className="font-display text-xl leading-relaxed text-text sm:text-2xl">
                          “Your name lives in my head... on repeat, running under everything else I do.”
                        </p>
                        <p className="mt-3 font-body text-xs uppercase tracking-[0.25em] text-accent-light/80">
                          Now & always 🤍✨
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  )
}
