import { useEffect, useState } from 'react'

export function useThemeStops() {
  const [stops, setStops] = useState(['#e8a0b4', '#f2c0d0', '#c9849e'])

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement)
    setStops([
      styles.getPropertyValue('--color-accent').trim(),
      styles.getPropertyValue('--color-accent-light').trim(),
      styles.getPropertyValue('--color-secondary').trim(),
    ])
  }, [])

  return stops
}

export function useThemeColor(token) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(token).trim())
  }, [token])

  return value
}
