import { AnimatePresence, motion } from 'framer-motion'
import { TimelineProvider, useTimeline } from './timeline/TimelineContext'
import FilmGrainOverlay, { DustMotes } from './components/FilmGrainOverlay'
import AudioGate from './components/AudioGate'
import CafeSection from './components/CafeSection'
import FallingSection from './components/FallingSection'
import TimelineSequencer from './components/TimelineSequencer'
import DeclarationSection from './components/DeclarationSection'
import ClosingSection from './components/ClosingSection'
import DriftGallery from './components/DriftGallery'
import SkipGesture from './components/SkipGesture'

const SECTIONS = {
  opening: AudioGate,
  cafe: CafeSection,
  falling: FallingSection,
  timeline: TimelineSequencer,
  declaration: DeclarationSection,
  closing: ClosingSection,
  gallery: DriftGallery,
}

const cinematic = [0.22, 1, 0.36, 1]

function Experience() {
  const { section } = useTimeline()
  const Current = SECTIONS[section.key] ?? AudioGate
  const isGallery = section.key === 'gallery'

  return (
    <main className={`relative bg-bg text-text ${isGallery ? 'min-h-dvh overflow-y-auto' : 'h-dvh overflow-hidden'}`}>
      <DustMotes />
      <SkipGesture />

      {/* Gallery is in normal scroll flow; playback sections are smooth crossfade layers */}
      {isGallery ? (
        <div className="relative w-full">
          <DriftGallery />
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            key={section.key}
            className="absolute inset-0 z-10 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: cinematic }}
          >
            <Current />
          </motion.div>
        </AnimatePresence>
      )}

      <FilmGrainOverlay />
    </main>
  )
}

export default function App() {
  return (
    <TimelineProvider>
      <Experience />
    </TimelineProvider>
  )
}
