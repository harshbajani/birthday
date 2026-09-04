import { motion } from 'framer-motion'
import { useTimeline } from '../timeline/TimelineContext'
import { useThemeColor } from '../hooks/useThemeStops'
import LightRays from './LightRays'
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

export default function DeclarationSection() {
  const { currentTime } = useTimeline()
  const raysColor = useThemeColor('--color-accent') || '#e8a0b4'

  // Spoken sentence timeline within Section 5 (220s – 266s):
  // 1: Building a life together (220–231s)
  const isLine1Current = currentTime >= 220 && currentTime < 231
  const isLine1Past = currentTime >= 231

  // 2: Keys, shared mornings, wanting all of it (231–241s)
  const isLine2Current = currentTime >= 231 && currentTime < 241
  const isLine2Past = currentTime >= 241

  // 3: With you specifically (241–251s)
  const isLine3Current = currentTime >= 241 && currentTime < 251
  const isLine3Past = currentTime >= 251

  // 4: The Climax declaration (251–266s)
  const isClimaxCurrent = currentTime >= 251

  return (
    <SectionShell className="bg-bg overflow-hidden">
      {/* Background light rays */}
      <div className="absolute inset-0 opacity-60">
        <LightRays
          raysOrigin="top-center"
          raysColor={raysColor}
          raysSpeed={0.35}
          lightSpread={1.4}
          rayLength={2.2}
          followMouse={false}
          noiseAmount={0.08}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-4">
        <div className="relative flex w-full max-w-xl flex-col items-center">
          {/* Floating aesthetic stickers that sit above the text box */}
          <FloatingSticker
            src="/gifs/baPXC3RsDe8yKD6y3U.gif"
            className="-top-7 -left-3 sm:-top-9 sm:-left-5"
            floatDelay={0}
          />
          <FloatingSticker
            src="/gifs/igJG6snZqV8uEE7wQv.gif"
            className="-top-6 -right-3 sm:-top-8 sm:-right-5"
            floatDelay={0.3}
          />
          <FloatingSticker
            src="/gifs/XkaVIJRdYIZk5wS4AU.gif"
            className="-bottom-7 -left-3 sm:-bottom-9 sm:-left-5"
            floatDelay={0.6}
            size="w-16 sm:w-22"
          />
          <FloatingSticker
            src="/gifs/3Wfu0DiAC2BYK50lFF.gif"
            className="-bottom-7 -right-3 sm:-bottom-9 sm:-right-5"
            floatDelay={0.9}
            size="w-16 sm:w-22"
          />

          {/* Single permanent paragraph card — text highlights live as spoken, never closing early! */}
          <div className="relative z-20 w-full rounded-3xl border border-accent/25 bg-bg/60 p-6 sm:p-9 backdrop-blur-md shadow-[0_12px_48px_rgba(0,0,0,0.5)] text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5">
              <span className="text-xs">💖</span>
              <span className="font-body text-xs uppercase tracking-[0.25em] text-accent-light">
                Our Future
              </span>
              <span className="text-xs">✨</span>
            </div>

            <div className="flex flex-col gap-4 font-display leading-relaxed">
              {/* Line 1 */}
              <p
                className={`transition-all duration-700 text-lg sm:text-xl ${
                  isLine1Current
                    ? 'glow-text font-medium text-accent scale-[1.02]'
                    : isLine1Past
                    ? 'text-text/90 font-normal'
                    : 'text-text/35 font-light'
                }`}
              >
                “I know I’m already picturing things that haven’t happened yet... like us building an actual life together 🏡🔑”
              </p>

              {/* Line 2 */}
              <p
                className={`transition-all duration-700 text-lg sm:text-xl ${
                  isLine2Current
                    ? 'glow-text font-medium text-accent scale-[1.02]'
                    : isLine2Past
                    ? 'text-text/90 font-normal'
                    : 'text-text/35 font-light'
                }`}
              >
                “The kind with keys and shared mornings and arguments about nothing... and a future I get to keep choosing over and over for real. I want all of it baby, I really want all of it ☕✨”
              </p>

              {/* Line 3 */}
              <p
                className={`transition-all duration-700 text-lg sm:text-xl ${
                  isLine3Current
                    ? 'glow-text font-medium text-accent scale-[1.02]'
                    : isLine3Past
                    ? 'text-text/90 font-normal'
                    : 'text-text/35 font-light'
                }`}
              >
                “With you specifically. Not as an abstract idea of a future... whatever my future is, I just want it with you 🌸💫”
              </p>

              {/* Climax Line: Always present or highlighted at the peak */}
              <div
                className={`mt-3 pt-4 border-t border-accent/20 transition-all duration-700 ${
                  isClimaxCurrent
                    ? 'opacity-100 scale-100'
                    : 'opacity-40 scale-95'
                }`}
              >
                <p className="font-body text-xs uppercase tracking-[0.25em] text-accent-light/80 mb-2">
                  What I want you to keep forever
                </p>
                <h2 className="glow-text font-display text-2xl font-medium sm:text-3xl leading-snug">
                  I am endlessly, stupidly, completely certain about you. 💖✨
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
