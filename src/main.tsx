import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './app.tsx'
import './index.css'
import './i18n/config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
)

const rootLoading = document.querySelector('.root-loading')
if (rootLoading) {
  rootLoading.addEventListener('transitionend', () => rootLoading.remove())
  requestAnimationFrame(() => {
    ;(rootLoading as HTMLElement).style.transition = 'opacity 0.25s ease-out'
    ;(rootLoading as HTMLElement).style.opacity = '0'
    ;(rootLoading as HTMLElement).style.pointerEvents = 'none'
  })
  setTimeout(() => rootLoading.remove(), 500)
}
