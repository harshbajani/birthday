import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTimeline } from '../timeline/TimelineContext'
import { TIMELINE_PHOTOS } from '../data/photos'
import SectionShell from './SectionShell'

const cinematic = [0.22, 1, 0.36, 1]

const PRESENCE_COUNT = Math.ceil(TIMELINE_PHOTOS.length * 0.55)
const PRESENCE_PHOTOS = TIMELINE_PHOTOS.slice(0, PRESENCE_COUNT)
const CONSTANCY_PHOTOS = TIMELINE_PHOTOS.slice(PRESENCE_COUNT)

function indexInRange(localTime, duration, count) {
  if (count <= 0) return 0
  const hold = duration / count
  return Math.min(count - 1, Math.floor(Math.max(0, localTime) / hold))
}

/** Per-photo hold time in seconds (for the progress indicator) */
function holdTime(duration, count) {
  return count > 0 ? duration / count : duration
}

export default function TimelineSequencer() {
  const { currentTime } = useTimeline()
  const inConstancy = currentTime >= 191
  const photos = inConstancy ? CONSTANCY_PHOTOS : PRESENCE_PHOTOS
  const local = inConstancy ? currentTime - 191 : currentTime - 163
  const duration = inConstancy ? 29 : 28
  const index = indexInRange(local, duration, photos.length)
  const current = photos[index]
  const hold = holdTime(duration, photos.length)

  // Progress within the current photo's hold window (0 → 1)
  const photoLocal = local - index * hold
  const progress = Math.min(1, Math.max(0, photoLocal / hold))

  // Preload next photo for seamless transition
  const nextIndex = Math.min(photos.length - 1, index + 1)
  const nextPhoto = photos[nextIndex]
  useEffect(() => {
    if (nextPhoto && nextPhoto !== current) {
      const img = new Image()
      img.src = nextPhoto
    }
  }, [nextPhoto, current])

  return (
    <SectionShell className="bg-bg">
      {/* Subtle warm overlay shift for constancy half */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] bg-accent/5"
        animate={{ opacity: inConstancy ? 1 : 0 }}
        transition={{ duration: 2.5, ease: cinematic }}
      />

      {/* Photo display — contained frame, centered */}
      <div className="relative z-[2] flex h-full w-full items-center justify-center px-4 py-4">
        <div
          className="photo-frame relative mx-auto overflow-hidden rounded-2xl border border-accent/20 bg-bg-alt shadow-[0_12px_48px_rgba(0,0,0,0.6)]"
          style={{
            width: 'min(88vw, 380px)',
            height: 'min(68vh, 520px)',
          }}
        >
          <AnimatePresence>
            <motion.div
              key={current}
              className="absolute inset-0 h-full w-full overflow-hidden"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-25%', opacity: 0, scale: 0.95 }}
              transition={{
                y: { duration: 1.3, ease: cinematic },
                opacity: { duration: 0.9, ease: cinematic },
                scale: { duration: 1.3, ease: cinematic },
              }}
            >
              <motion.img
                src={current}
                alt=""
                className="h-full w-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: hold, ease: 'linear' }}
                loading="eager"
              />
              <div className="photo-vignette pointer-events-none absolute inset-0" />
            </motion.div>
          </AnimatePresence>

          {/* Thin progress bar at bottom of photo frame */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-1 overflow-hidden bg-black/40">
            <motion.div
              className="h-full bg-accent/80"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
