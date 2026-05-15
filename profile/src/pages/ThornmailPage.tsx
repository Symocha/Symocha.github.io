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

const thornmailPics = [
  new URL('../assets/thornmailPic/image.jpg', import.meta.url).href,  
  new URL('../assets/thornmailPic/image4.jpg', import.meta.url).href,
  new URL('../assets/thornmailPic/image1.jpg', import.meta.url).href,
  new URL('../assets/thornmailPic/image2.jpg', import.meta.url).href,
  new URL('../assets/thornmailPic/image3.jpg', import.meta.url).href,
]

const thornmailHeroPic = new URL('../assets/thornmailPic/Thornmail2.png', import.meta.url).href

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
            <div className="bento-card col-span-3 p-6 border border-blue-500/20 bg-slate-900/70 shadow-2xl backdrop-blur-xl">
              <p className="section-title">{isFr ? 'Apercu' : 'Overview'}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Thornmail</h3>
              <p className="exp-meta text-blue-200/80">ConUHacks 2026</p>
              <p className="mt-3 max-w-3xl text-sm md:text-base leading-7 text-slate-200/90">
                {isFr
                  ? 'Thornmail a été inspiré par la frustration de voir de vraies menaces de sécurité noyées dans des milliers d alertes bruyantes. Plutôt que de traiter chaque journal comme un incident séparé, nous voulions créer un système qui pense comme un analyste humain en organisant l activité en histoires claires et reliées, au lieu d évènements éparpillés.'
                  : 'Thornmail was inspired by the frustration of seeing real security threats buried under thousands of noisy alerts. Instead of treating every log as a separate issue, we wanted to build a system that thinks the way human analysts do by organizing activity into clear, connected stories rather than scattered events.'}
              </p>
              <p className="mt-3 max-w-3xl text-sm md:text-base leading-7 text-slate-300/90">
                {isFr
                  ? 'Le projet nous a appris à concevoir des algorithmes fiables de clustering et de scoring du risque, tout en utilisant l IA comme outil d aide pour mettre en évidence les points clés et les patterns importants des données, et non comme décision finale.'
                  : 'Through this project, we learned how to design reliable security algorithms for clustering and risk scoring, while using AI as a support tool for highlighting key points and important patterns in the data, not as the final decision maker.'}
              </p>
              
            </div>

            <div className="bento-card col-span-1">
              <p className="section-title">{isFr ? 'Technologies' : 'Technologies'}</p>
              <div className="tag-list">
                {['FastAPI', 'Next.js', 'NumPy', 'Ollama + Llama 3', 'Pandas', 'Python 3.11+', 'React', 'Tailwind CSS 4', 'TypeScript 5', 'Uvicorn'].map(t => (
                  <span className="tag accent" key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="bento-card col-span-4 overflow-hidden border border-blue-500/20 bg-slate-900/70 p-4 shadow-2xl backdrop-blur-xl">
              <p className="section-title">{isFr ? 'Image principale' : 'Hero Image'}</p>
              <div className="mt-3 overflow-hidden rounded-2xl border border-blue-500/10 bg-slate-950/60">
                <img
                  src={thornmailHeroPic}
                  alt={isFr ? 'Image principale du projet Thornmail' : 'Thornmail project hero image'}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="bento-card col-span-4 row-span-2 dark:bg-slate-900 bg-slate-800 p-6">
              <p className="section-title">{isFr ? 'Photos' : 'Photos'}</p>
              <AppleCardsCarouselDemo
                heading={isFr ? 'Photos Thornmail' : 'Thornmail Photos'}
                category={isFr ? 'ConUHacks 2026' : 'ConUHacks 2026'}
                description={isFr ? 'Moments forts du hackathon Thornmail.' : 'Thornmail hackathon moments and project snapshots.'}
                images={thornmailPics}
              />
            </div>

            <div className="bento-card experience">
              <p className="section-title">{isFr ? 'Resultats' : 'Outcomes'}</p>
              <p>
                {isFr
                  ? 'Prototype fonctionnel et 1re place au defi D3 Security, ce qui a ensuite mené à la conférence RSAC.'
                  : 'Working prototype and 1st place in the D3 Security challenge, which then led to the RSAC conference.'}
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
