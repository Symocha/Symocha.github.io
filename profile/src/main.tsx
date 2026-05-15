import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ConferencePage from './pages/ConferencePage.tsx'
import ThornmailPage from './pages/ThornmailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/conference" element={<ConferencePage />} />
        <Route path="/thornmail" element={<ThornmailPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
