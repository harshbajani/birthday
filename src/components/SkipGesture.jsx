import { useEffect } from 'react'
import { useTimeline } from '../timeline/TimelineContext'

export default function SkipGesture() {
  const { started, ended, section, seekToSection } = useTimeline()

  useEffect(() => {
    if (!started || ended || section.key === 'gallery') return undefined

    let startY = 0
    let lastSeek = 0

    const maybeSeek = (direction) => {
      const now = Date.now()
      if (now - lastSeek < 900) return
      lastSeek = now
      const currentId = section.id
      if (direction > 0 && currentId <= 6) seekToSection(currentId + 1)
      if (direction < 0 && currentId > 1) seekToSection(currentId - 1)
    }

    const onStart = (event) => {
      startY = event.changedTouches?.[0]?.clientY ?? 0
    }

    const onEnd = (event) => {
      const endY = event.changedTouches?.[0]?.clientY ?? startY
      const delta = startY - endY
      if (Math.abs(delta) < 80) return
      maybeSeek(delta > 0 ? 1 : -1)
    }

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) < 50) return
      maybeSeek(event.deltaY > 0 ? 1 : -1)
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('wheel', onWheel)
    }
  }, [ended, section.id, section.key, seekToSection, started])

  return null
}
