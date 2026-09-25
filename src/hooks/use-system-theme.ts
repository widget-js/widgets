import { useEffect } from 'react'

// Application appearance is independent of the desktop widget theme and storage.
export function useSystemTheme() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const root = document.documentElement
    const sync = () => {
      root.classList.toggle('dark', media.matches)
      root.classList.toggle('light', !media.matches)
      root.style.colorScheme = media.matches ? 'dark' : 'light'
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])
}
