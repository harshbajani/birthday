import { AnimatePresence, motion } from 'framer-motion'
import { PROPOSE_TEXT_1, PROPOSE_TEXT_2 } from '../data/photos'
import { useTimeline } from '../timeline/TimelineContext'
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

export default function FallingSection() {
  const { currentTime } = useTimeline()

  // Section 3 runs 95s → 163s
  // Phase 1 (95s – 135s): Intimate reflection with live paragraph highlighting
  const inReflectionPhase = currentTime >= 95 && currentTime < 135
  const isLine1Current = currentTime >= 95 && currentTime < 118
  const isLine2Current = currentTime >= 118 && currentTime < 135

  // Phase 2 (135s – 163s): Proposal Screenshots right at 02:23 ("safe enough to hand you your heart")
  const inProposalPhase = currentTime >= 135 && currentTime < 163
  const isProposeStep2 = currentTime >= 149

  return (
    <SectionShell className="bg-bg overflow-hidden">
      {/* Intimate ambient background with soft warm glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg-alt/80 to-bg" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(232,160,180,0.16)_0%,transparent_65%)]" />

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 py-4 text-center">
        {/* ================================================================ */}
        {/* REFLECTION PHASE (95s – 135s): Live highlighted paragraph card   */}
        {/* ================================================================ */}
        {inReflectionPhase && (
          <motion.div
            key="reflection-card"
            className="relative flex w-full max-w-xl flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2, ease: cinematic }}
          >
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

            <div className="relative z-20 w-full rounded-3xl border border-accent/20 bg-bg/65 p-6 sm:p-9 backdrop-blur-md shadow-[0_12px_48px_rgba(0,0,0,0.45)]">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/15 px-4 py-1.5">
                <span className="size-2 rounded-full bg-secondary shadow-[0_0_12px_var(--color-secondary)]" />
                <span className="font-body text-xs uppercase tracking-[0.25em] text-secondary">
                  Five Days
                </span>
              </div>

              <div className="flex flex-col gap-5 font-display leading-relaxed">
                <p
                  className={`transition-all duration-700 text-lg sm:text-xl ${
                    isLine1Current
                      ? 'glow-text font-medium text-accent scale-[1.02]'
                      : 'text-text/90 font-normal'
                  }`}
                >
                  “Somewhere in those hours, you started letting me see the parts of you that still caused you pain... I didn’t want to fix you. I just wanted to sit close enough that it couldn’t hurt you anymore.”
                </p>

                <p
                  className={`transition-all duration-700 text-lg sm:text-xl ${
                    isLine2Current
                      ? 'glow-text font-medium text-accent scale-[1.02]'
                      : 'text-text/50 font-light'
                  }`}
                >
                  “It don’t make you feel alone. That’s the closest I can get to explaining what happened between us in those first five days.”
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/* PROPOSAL SCREENSHOTS (135s – 163s, perfectly centered)           */}
        {/* ================================================================ */}
        {inProposalPhase && (
          <motion.div
            key="propose-screenshot-stage"
            className="relative z-20 flex w-full flex-col items-center justify-center px-2"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 1.0, ease: cinematic }}
          >
            {/* Aesthetic GIF Stickers sitting above card */}
            <FloatingSticker
              src={isProposeStep2 ? '/gifs/lOaMPfXXuaw5PRSDZv.gif' : '/gifs/baPXC3RsDe8yKD6y3U.gif'}
              className="-top-6 -left-3 sm:-top-7 sm:-left-5"
              floatDelay={0}
            />
            <FloatingSticker
              src={isProposeStep2 ? '/gifs/ZVuxepYHKdxy0b02PJ.gif' : '/gifs/igJG6snZqV8uEE7wQv.gif'}
              className="-top-5 -right-3 sm:-top-6 sm:-right-5"
              floatDelay={0.3}
            />

            <div className="screenshot-card mx-auto">
              <AnimatePresence mode="wait">
                <motion.img
                  key={isProposeStep2 ? 'step2' : 'step1'}
                  src={isProposeStep2 ? PROPOSE_TEXT_2 : PROPOSE_TEXT_1}
                  alt={isProposeStep2 ? 'Proposal conversation 2' : 'Proposal conversation 1'}
                  className="w-auto h-auto max-h-[50vh] sm:max-h-[52vh] max-w-full object-contain rounded-2xl block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: cinematic }}
                  loading="eager"
                />
              </AnimatePresence>
            </div>

            <motion.p
              key={isProposeStep2 ? 'caption2' : 'caption1'}
              className="mt-3 max-w-md font-display text-sm sm:text-base font-medium text-accent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: cinematic }}
            >
              {isProposeStep2
                ? '“I still think about how much courage that must have taken... and I don’t take it lightly. 💌”'
                : '“You looked at me and decided I was safe enough to hand you your heart... 💌”'}
            </motion.p>
          </motion.div>
        )}
      </div>
    </SectionShell>
  )
}
