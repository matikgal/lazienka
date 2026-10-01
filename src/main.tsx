import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

registerSW({
  immediate: true,
  onRegisteredSW(_swUrl, registration) {
    // Odśwież cache przy kolejnej wizycie z internetem
    if (registration) {
      registration.update().catch(() => {})
      setInterval(() => {
        registration.update().catch(() => {})
      }, 60 * 60 * 1000)
    }
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
