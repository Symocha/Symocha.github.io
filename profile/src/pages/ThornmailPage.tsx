import { useEffect, useState } from 'react'
import {
  IconHome,
  IconBrandGithub,
  IconMail,
  IconSchool,
  IconTrophy,
} from '@tabler/icons-react'
import { BackgroundPathsBackdrop } from '../components/background-paths'
import { FloatingDock } from '../components/ui/floating-dock'
import { TextHoverEffect } from '../components/ui/text-hover-effect'
import AppleCardsCarouselDemo from '../components/ui/AppleCardsCarouselDemo'

export default function ThornmailPage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en')
  const isFr = lang === 'fr'
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800)

  const dockLinks = [
    {
      title: isFr ? 'Accueil' : 'Home',
      icon: <IconHome className="h-full w-full" />,
      href: '#/',
    },
    {
      title: isFr ? 'Conference' : 'Conference',
      icon: <IconSchool className="h-full w-full" />,
      href: '#/conference',
    },
    {
      title: isFr ? 'Thornmail' : 'Thornmail',
      icon: <IconTrophy className="h-full w-full" />,
      href: '#/thornmail',
    },
    {
      title: isFr ? 'GitHub' : 'GitHub',
      icon: <IconBrandGithub className="h-full w-full" />,
      href: 'https://github.com/Symocha',
    },
    {
      title: isFr ? 'Contact' : 'Contact',
      icon: <IconMail className="h-full w-full" />,
      href: 'mailto:Olivier.Tran@USherbrooke.ca',
    },
  ]

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 800)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="page-shell pb-28">
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <BackgroundPathsBackdrop />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="lang-switch" aria-label="Language switch">
          <button
            type="button"
            className={`lang-btn ${lang === 'fr' ? 'active' : ''}`}
            onClick={() => setLang('fr')}
          >
            FR
          </button>
          <span className="lang-sep">|</span>
          <button
            type="button"
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => setLang('en')}
          >
            EN
          </button>
        </div>

        <section className="landing-section">
          <p className="kicker text-center">{isFr ? 'Projet' : 'Project'}</p>
          <TextHoverEffect text={isSmallScreen ? 'THORNMAIL' : 'THORNMAIL'} size={isSmallScreen ? 'text-4xl' : 'text-5xl'} />
          <div className="w-full flex justify-center">
            <p className="subtitle text-center">
              {isFr
                ? 'Priorisation d alertes SOC assistee par IA — prototype ConUHacks 2026.'
                : 'AI-assisted SOC alert prioritization — ConUHacks 2026 prototype.'}
            </p>
          </div>
          <div className="hero-cta justify-center">
            <a href="https://devpost.com/software/sentinel-2sjz9f" className="cta-secondary" target="_blank" rel="noopener noreferrer">{isFr ? 'Voir sur Devpost' : 'View on Devpost'}</a>
          </div>
        </section>

        <section className="content-section bento-container">
          <div className="bento-grid">
            <div className="bento-card col-span-2">
              <p className="section-title">{isFr ? 'Apercu' : 'Overview'}</p>
              <h3>{isFr ? 'Thornmail' : 'Thornmail'}</h3>
              <p className="exp-meta">ConUHacks 2026</p>
              <p>
                {isFr
                  ? 'Thornmail combine des heuristiques, correlation d entites et un LLM local pour prioriser et contextualiser les alertes SOC.'
                  : 'Thornmail combines heuristics, entity correlation, and a local LLM to prioritize and contextualize SOC alerts.'}
              </p>
            </div>

            <div className="bento-card col-span-2">
              <p className="section-title">{isFr ? 'Technologies' : 'Technologies'}</p>
              <div className="tag-list">
                {['Python', 'React', 'Ollama', 'LLM', 'Cybersecurity'].map(t => (
                  <span className="tag accent" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="bento-card col-span-3 row-span-2 dark:bg-slate-900 bg-slate-800 p-6">
              <p className="section-title">{isFr ? 'Demonstration' : 'Demo'}</p>
              <AppleCardsCarouselDemo />
            </div>

            <div className="bento-card experience">
              <p className="section-title">{isFr ? 'Resultats' : 'Outcomes'}</p>
              <p>
                {isFr
                  ? 'Prototype fonctionnel et 1re place au defi D3 Security.'
                  : 'Working prototype and 1st place in the D3 Security challenge.'}
              </p>
            </div>

            <div className="bento-card col-span-2 timeline-card minimal-card">
              <p className="section-title">{isFr ? 'Retombees concretes' : 'Practical Outcomes'}</p>
              <ol className="timeline-list">
                <li>
                  <strong>{isFr ? 'Technique' : 'Technical'}</strong>
                  <span>
                    {isFr
                      ? 'Amelioration des strategies de correlation et scoring des alertes.'
                      : 'Improved alert correlation and scoring strategies.'}
                  </span>
                </li>
                <li>
                  <strong>{isFr ? 'Produit' : 'Product'}</strong>
                  <span>
                    {isFr
                      ? 'Prototype permettant des flux analytiques pour les equipes SOC.'
                      : 'Prototype enabling analyst workflows for SOC teams.'}
                  </span>
                </li>
              </ol>
            </div>
          </div>
        </section>
      </div>

      <FloatingDock items={dockLinks} mobileClassName="md:translate-y-0" />
    </div>
  )
}
