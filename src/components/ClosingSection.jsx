import { motion } from 'framer-motion'
import Aurora from './Aurora'
import { useTimeline } from '../timeline/TimelineContext'
import { useThemeStops } from '../hooks/useThemeStops'
import SectionShell from './SectionShell'

const cinematic = [0.22, 1, 0.36, 1]

function FloatingSticker({ src, className = '', floatDelay = 0, size = 'w-14 sm:w-20 md:w-24' }) {
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

export default function ClosingSection() {
  const { currentTime } = useTimeline()
  const colorStops = useThemeStops()

  // Section 6 starts at 266s and ends at 282.18s
  const isLine1Current = currentTime >= 266 && currentTime < 274
  const isLine2Current = currentTime >= 274

  return (
    <SectionShell className="bg-bg overflow-hidden">
      <div className="absolute inset-0 opacity-80">
        <Aurora colorStops={colorStops} amplitude={0.85} blend={0.65} speed={0.35} />
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-4 text-center">
        <div className="relative flex w-full max-w-lg flex-col items-center">
          {/* Floating aesthetic stickers sitting above the text box */}
          <FloatingSticker
            src="/gifs/BP2w6PP1waA5xa07gp.gif"
            className="-top-7 -left-3 sm:-top-9 sm:-left-5"
            floatDelay={0}
          />
          <FloatingSticker
            src="/gifs/PHM51znzsAYLMJ3vKm.gif"
            className="-top-6 -right-3 sm:-top-8 sm:-right-5"
            floatDelay={0.3}
          />
          <FloatingSticker
            src="/gifs/Kb3rmGKyyov27n0fFl.gif"
            className="-bottom-7 -right-3 sm:-bottom-9 sm:-right-5"
            floatDelay={0.6}
            size="w-16 sm:w-22"
          />
          <FloatingSticker
            src="/gifs/ZVuxepYHKdxy0b02PJ.gif"
            className="-bottom-7 -left-3 sm:-bottom-9 sm:-left-5"
            floatDelay={0.9}
            size="w-16 sm:w-22"
          />

          {/* Unified permanent paragraph card with live highlights */}
          <div className="relative z-20 w-full rounded-3xl border border-accent/25 bg-bg/60 p-6 sm:p-10 backdrop-blur-md shadow-[0_12px_48px_rgba(0,0,0,0.5)]">
            <span className="mb-4 inline-block font-body text-xs uppercase tracking-[0.3em] text-accent-light">
              Happy Birthday, My Love 🎂🌷
            </span>

            <div className="flex flex-col gap-6 font-display leading-relaxed">
              <p
                className={`transition-all duration-700 text-2xl sm:text-3xl ${
                  isLine1Current
                    ? 'glow-text font-medium text-accent scale-[1.02]'
                    : 'text-text/90 font-normal'
                }`}
              >
                “Happy birthday my love. Whatever comes next, I already want you to know that I will be standing next to you for it.”
              </p>

              <div
                className={`pt-5 border-t border-accent/20 transition-all duration-700 ${
                  isLine2Current
                    ? 'opacity-100 scale-100'
                    : 'opacity-40 scale-95'
                }`}
              >
                <p className="glow-text text-3xl font-medium sm:text-4xl">
                  Now and then. Always and forever.
                </p>
                <p className="mt-4 font-display text-2xl font-light text-accent-light sm:text-3xl">
                  I love you so much 🤍✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
