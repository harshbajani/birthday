export const AUDIO_SRC = '/audio/Voice 001.m4a'
export const SONG_SRC = '/audio/Aarzu.mp3'
export const AUDIO_DURATION = 282.18

/**
 * Master timeline windows from design.md
 * "Audio Timeline & Section Mapping"
 */
export const SECTION_WINDOWS = [
  { id: 1, key: 'opening', start: 0, end: 28 },
  { id: 2, key: 'cafe', start: 28, end: 95 },
  { id: 3, key: 'falling', start: 95, end: 163 },
  { id: 4, key: 'timeline', start: 163, end: 220, midpoint: 191 },
  { id: 5, key: 'declaration', start: 220, end: 266 },
  { id: 6, key: 'closing', start: 266, end: AUDIO_DURATION },
]

export function getSectionForTime(currentTime, { started, ended }) {
  if (!started) {
    return { id: 1, key: 'opening', start: 0, end: 32, phase: 'gate' }
  }
  if (ended || currentTime >= AUDIO_DURATION) {
    return { id: 7, key: 'gallery', start: AUDIO_DURATION, end: Infinity, phase: 'gallery' }
  }

  const window = SECTION_WINDOWS.find(
    (section) => currentTime >= section.start && currentTime < section.end,
  ) ?? SECTION_WINDOWS[SECTION_WINDOWS.length - 1]

  return { ...window, phase: 'playback' }
}
