import { useEffect, useState } from 'react'
// Link not used in this page
import {
  IconHome,
  IconSchool,
  IconBrandGithub,
  IconMail,
} from '@tabler/icons-react'
import { IconTrophy } from '@tabler/icons-react'
import { BackgroundPathsBackdrop } from '../components/background-paths'
import { FloatingDock } from '../components/ui/floating-dock'
import { TextHoverEffect } from '../components/ui/text-hover-effect'
import AppleCardsCarouselDemo from '../components/ui/AppleCardsCarouselDemo'

const conferencePics = [
  new URL('../assets/pictures/DSCF1634.JPG', import.meta.url).href,
  new URL('../assets/pictures/DSCF1759.JPG', import.meta.url).href,
  new URL('../assets/pictures/DSCF1769.JPG', import.meta.url).href,
  new URL('../assets/pictures/DSCF1835.JPG', import.meta.url).href,
  new URL('../assets/pictures/IMG_2550.JPG', import.meta.url).href,
  new URL('../assets/pictures/IMG_9673.JPG', import.meta.url).href,
  new URL('../assets/pictures/DSCF1571.JPG', import.meta.url).href,
]

export default function ConferencePage() {
  const [lang, setLang] = useState<'en' | 'fr'>('en')
  const isFr = lang === 'fr'
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800)

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 800)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const dockLinks = [
    {
      title: isFr ? 'Accueil' : 'Home',
      icon: <IconHome className="h-full w-full" />,
      href: '#/',
    },    
    {
      title: isFr ? 'Thornmail' : 'Thornmail',
      icon: <IconTrophy className="h-full w-full" />,
      href: '#/thornmail',
    },
    {
      title: isFr ? 'Conference' : 'Conference',
      icon: <IconSchool className="h-full w-full" />,
      href: '#/conference',
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

  return (
    <div className="page-shell pb-28">
      <div
        aria-hidden="true"
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      >
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
          <p className="kicker text-center">{isFr ? 'Conference' : 'Conference'}</p>
            <TextHoverEffect text={isSmallScreen ? "RSAC 26" : "RSAC 26"} size={isSmallScreen ? 'text-5xl' : 'text-6xl'} />
          <div className="w-full flex justify-center">
            <p className="subtitle text-center">
              {isFr
                ? 'Participation, apprentissages cles et retombees techniques de mon experience a San Francisco.'
                : 'Participation, key learnings, and technical outcomes from my experience in San Francisco.'}
            </p>
          </div>
          
        </section>

        <section className="content-section bento-container">
          <div className="bento-grid">

            <div className="bento-card col-span-3 row-span-2 dark:bg-slate-900 bg-slate-800 p-6 hidden md:block">
              <p className="section-title">{isFr ? 'Galerie' : 'Photo Gallery'}</p>
              <AppleCardsCarouselDemo
                heading={isFr ? 'Photos de conference' : 'Conference Photos'}
                category={isFr ? 'San Francisco, 2026' : 'San Francisco, 2026'}
                description={isFr ? 'Photo des moments forts de la conference.' : 'Photo from conference highlights and networking.'}
                images={conferencePics}
              />
            </div>
            <div className="bento-card col-span-1 row-span-2">
              <p className="section-title">{isFr ? 'Evenement' : 'Event'}</p>
              <h3>RSA Conference 2026</h3>
              <p className="exp-meta">San Francisco, CA</p>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-200/90">
                <p className="font-medium text-blue-100/90">
                  {isFr
                    ? 'Un remerciement special a D3 Security et à la FAEE de l\'Universite de Sherbrooke.'
                    : 'A special thanks to D3 Security and to the FAEE of the University of Sherbrooke.'}
                </p>
                <p>
                  {isFr
                    ? 'Dans le cadre du projet Thornmail, nous avons participé à la RSAC Conference 2026 à San Francisco, un des plus grands événements en cybersécurité au monde. Cette activité nous a permis de découvrir les plus récentes technologies et tendances du domaine, notamment en intelligence artificielle, en sécurité des systèmes et en gestion des menaces informatiques.'
                    : 'As part of the Thornmail project, we attended the RSAC Conference 2026 in San Francisco, one of the largest cybersecurity events in the world. This experience allowed us to discover the latest technologies and trends in the field, especially in artificial intelligence, systems security, and cyber threat management.'}
                </p>
                <p>
                  {isFr
                    ? 'Durant la conférence, il y avait plus de 600 kiosques d’entreprises spécialisées en cybersécurité et avons assisté à plusieurs présentations offertes par des entreprises reconnues comme CrowdStrike, IBM et D3 Security, qui nous a invités à participer à l’événement. Cette expérience nous a permis d’échanger avec des professionnels du milieu et d’approfondir nos connaissances techniques.'
                    : 'During the conference, there were more than 600 booths from companies specializing in cybersecurity to visit and attended several talks offered by well-known companies such as CrowdStrike, IBM, and D3 Security, which invited us to take part in the event. This experience allowed us to connect with industry professionals and deepen our technical knowledge.'}
                </p>
              </div>
            </div>

            <div className="bento-card col-span-2">
              <p className="section-title">{isFr ? 'Themes suivis' : 'Tracks Followed'}</p>
              <div className="tag-list">
                {[
                  isFr ? 'Operations SOC' : 'SOC Operations',
                  isFr ? 'Securite Cloud' : 'Cloud Security',
                  isFr ? 'Detection et reponse' : 'Detection and Response',
                  isFr ? 'Menaces emergentes' : 'Emerging Threats',
                  isFr ? 'Gouvernance IA' : 'AI Governance',
                ].map(topic => (
                  <span className="tag accent" key={topic}>{topic}</span>
                ))}
              </div>
            </div>

            <div className="bento-card col-span-2 row-span-2" onMouseLeave={() => undefined}>
              <p className="section-title">{isFr ? 'Sessions marquantes' : 'Notable Sessions'}</p>
              <div className="ongoing-list">
                <div className="ongoing-item">
                  <h4>{isFr ? 'Triage SOC assiste par IA' : 'AI-assisted SOC Triage'}</h4>
                  <p>
                    {isFr
                      ? 'Approches de reduction du bruit dalertes, priorisation contextuelle et acceleration des investigations.'
                      : 'Approaches to reduce alert noise, improve contextual prioritization, and speed up investigations.'}
                  </p>
                </div>
                <div className="ongoing-item">
                  <h4>{isFr ? 'Securite Cloud en production' : 'Production Cloud Security'}</h4>
                  <p>
                    {isFr
                      ? 'Controles pragmatiques pour la posture cloud, gestion des identites et detection multi-comptes.'
                      : 'Pragmatic controls for cloud posture, identity management, and multi-account detection.'}
                  </p>
                </div>
                <div className="ongoing-item">
                  <h4>{isFr ? 'Playbooks et reponse incident' : 'Playbooks and Incident Response'}</h4>
                  <p>
                    {isFr
                      ? 'Modeles operationnels pour standardiser le traitement des incidents a grande echelle.'
                      : 'Operational patterns to standardize incident handling at scale.'}
                  </p>
                </div>
              </div>
            </div>

            

            

            <div className="bento-card col-span-2 timeline-card minimal-card">
              <p className="section-title">{isFr ? 'Retombees concretes' : 'Practical Outcomes'}</p>
              <ol className="timeline-list">
                <li>
                  <strong>{isFr ? 'Technique' : 'Technical'}</strong>
                  <span>
                    {isFr
                      ? 'Amelioration de mes idees de correlation et scoring pour des alertes SOC.'
                      : 'Improved my approach to alert correlation and scoring for SOC use cases.'}
                  </span>
                </li>
                <li>
                  <strong>{isFr ? 'Produit' : 'Product'}</strong>
                  <span>
                    {isFr
                      ? 'Meilleure comprehension des besoins reels des equipes de securite en production.'
                      : 'Stronger understanding of real production needs from security operations teams.'}
                  </span>
                </li>
                <li>
                  <strong>{isFr ? 'Carriere' : 'Career'}</strong>
                  <span>
                    {isFr
                      ? 'Nouvelles connexions et opportunites de collaboration pour mes prochains projets.'
                      : 'New connections and collaboration opportunities for upcoming projects.'}
                  </span>
                </li>
              </ol>
            </div>
            <div className="bento-card experience">
              <p className="section-title">{isFr ? 'Networking' : 'Networking'}</p>
              <p>
                {isFr
                  ? 'Echanges avec des analystes SOC, des equipes blue-team et des ingenieurs detection de plusieurs organisations.'
                  : 'Conversations with SOC analysts, blue-team practitioners, and detection engineers across organizations.'}
              </p>
            </div>
          </div>
        </section>
      </div>
      <FloatingDock items={dockLinks} mobileClassName="md:translate-y-0" />
    </div>
  )
}
