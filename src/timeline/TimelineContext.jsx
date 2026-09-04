import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AUDIO_SRC, SONG_SRC, AUDIO_DURATION, getSectionForTime, SECTION_WINDOWS } from './windows'

const TimelineContext = createContext(null)

/** Volume level for the voice note (0–1). Kept gentle for earphone listening. */
const VOICE_VOLUME = 0.65
/** Volume level for the background song (0–1). Kept lower so it doesn't fight with the voice note. */
const SONG_VOLUME = 0.10
/** Seconds over which the song fades out when the voice note ends. */
const SONG_FADE_DURATION = 3

export function useTimeline() {
  const value = useContext(TimelineContext)
  if (!value) throw new Error('useTimeline must be used within TimelineProvider')
  return value
}

export function TimelineProvider({ children }) {
  const audioRef = useRef(null)
  const songRef = useRef(null)
  const frameRef = useRef(0)
  const songFadeRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  const section = useMemo(
    () => getSectionForTime(currentTime, { started, ended }),
    [currentTime, started, ended],
  )

  /** Fade the song volume to 0 over SONG_FADE_DURATION seconds. */
  const fadeSongOut = useCallback(() => {
    const song = songRef.current
    if (!song) return
    const startVol = song.volume
    const startMs = performance.now()
    const durationMs = SONG_FADE_DURATION * 1000

    const step = () => {
      const elapsed = performance.now() - startMs
      const progress = Math.min(elapsed / durationMs, 1)
      song.volume = Math.max(0, startVol * (1 - progress))
      if (progress < 1) {
        songFadeRef.current = requestAnimationFrame(step)
      } else {
        song.pause()
      }
    }
    if (songFadeRef.current) cancelAnimationFrame(songFadeRef.current)
    songFadeRef.current = requestAnimationFrame(step)
  }, [])

  const begin = useCallback(async () => {
    const audio = audioRef.current
    const song = songRef.current
    if (!audio) return

    audio.currentTime = 0
    audio.volume = VOICE_VOLUME
    await audio.play()

    // Start background song alongside voice note
    if (song) {
      if (songFadeRef.current) cancelAnimationFrame(songFadeRef.current)
      song.currentTime = 0
      song.volume = SONG_VOLUME
      song.play().catch(() => {})
    }

    setEnded(false)
    setStarted(true)
  }, [])

  const replay = useCallback(async () => {
    const audio = audioRef.current
    const song = songRef.current
    if (!audio) return

    audio.currentTime = 0
    audio.volume = VOICE_VOLUME
    setEnded(false)
    setCurrentTime(0)
    setStarted(true)
    await audio.play()

    // Restart background song
    if (song) {
      if (songFadeRef.current) cancelAnimationFrame(songFadeRef.current)
      song.currentTime = 0
      song.volume = SONG_VOLUME
      song.play().catch(() => {})
    }
  }, [])

  const seekToSection = useCallback((id) => {
    const audio = audioRef.current
    if (id >= 7) {
      if (audio) audio.currentTime = AUDIO_DURATION
      setEnded(true)
      setCurrentTime(AUDIO_DURATION)
      return
    }
    const window = SECTION_WINDOWS.find((item) => item.id === id)
    if (!audio || !window || !started || ended) return
    audio.currentTime = window.start + 0.05
    setCurrentTime(audio.currentTime)
  }, [ended, started])

  useEffect(() => {
    const tick = () => {
      const audio = audioRef.current
      if (audio && started && !ended) {
        setCurrentTime(audio.currentTime)
      }
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [started, ended])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = VOICE_VOLUME
    if (songRef.current) songRef.current.volume = SONG_VOLUME
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-cinematic', !ended && section.key !== 'gallery')
    document.body.classList.toggle('is-gallery', ended || section.key === 'gallery')
  }, [ended, section.key])

  const onEnded = useCallback(() => {
    setEnded(true)
    setCurrentTime(audioRef.current?.duration ?? currentTime)
    // Song continues playing on loop into the gallery as requested
  }, [currentTime])

  const value = useMemo(
    () => ({
      audioRef,
      started,
      ended,
      currentTime,
      section,
      begin,
      replay,
      seekToSection,
    }),
    [begin, currentTime, ended, replay, section, seekToSection, started],
  )

  return (
    <TimelineContext.Provider value={value}>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="auto"
        playsInline
        onEnded={onEnded}
      />
      <audio
        ref={songRef}
        src={SONG_SRC}
        preload="auto"
        playsInline
        loop
      />
      {children}
    </TimelineContext.Provider>
  )
}
