import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ConferencePage from './pages/ConferencePage.tsx'
import ThornmailPage from './pages/ThornmailPage.tsx'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname, location.hash])

  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/conference" element={<ConferencePage />} />
        <Route path="/thornmail" element={<ThornmailPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
