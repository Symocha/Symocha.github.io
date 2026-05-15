import { useEffect, useState } from 'react'
import {
  IconHome,
  IconBrandGithub,
  IconMail,
  IconSchool,
  IconTrophy,
} from '@tabler/icons-react'
import './App.css'
import { BackgroundPathsBackdrop } from './components/background-paths'
import { ProjectCard } from './components/ProjectCard'
import { FloatingDock } from './components/ui/floating-dock'
import { TextHoverEffect } from './components/ui/text-hover-effect'
import type { Project } from './components/ProjectCard'

const PROJECTS_EN: Project[] = [
  {
    title: <><i className="fa-solid fa-trophy"></i> Thornmail · AI Alert Prioritization</>,

    meta: '24h · Team of 4',
    summary: 'AI-assisted SOC alert prioritization platform built at ConUHacks 2026.',
    details: [
      'Python backend to aggregate, score, and deduplicate alerts based on severity, entity correlation, and time windows',
      'React frontend for visualizing prioritized alerts and analyst workflows',
      'Integrated a locally hosted LLM (Ollama) for context-aware security incident reasoning using structured SOC event data',
      'Won 1st Place in the D3 Security Sponsored Challenge',
      'Thornmail project was financed by the FAEE (Université de Sherbrooke)',
    ],
    tags: ['Python', 'React', 'Ollama', 'LLM', 'Cybersecurity'],
    link: '#/thornmail',
  },
  {
    title: 'Online Multiplayer Card Game',
    meta: '3 months · Team of 4',
    summary: 'Turn-based card game with real-time multiplayer using Angular + ASP.NET.',
    details: [
      'Client-server architecture using Angular and ASP.NET (MVC + Web API)',
      'Real-time role management using SignalR',
      'Secure user registration and login system',
      'In-game shop system with item management',
      'Unit testing suite for backend logic',
      'Task planning and project management using Azure DevOps',
    ],
    tags: ['Angular', 'ASP.NET', 'SignalR', 'Azure DevOps', 'C#'],
    link: 'https://github.com/Symocha/SuperCartesInfinies_Front',
  },
  {
    title: 'Mobile Task Manager',
    meta: '1 month',
    summary: 'Android Flutter app to create and manage tasks with cloud sync.',
    details: [
      'Android Flutter application to create and manage a list of tasks',
      'Backend initially developed with Spring Boot, later migrated to Google Firebase',
      'Secure user authentication',
      'Image management functionality for task attachments',
    ],
    tags: ['Flutter', 'Dart', 'Spring Boot', 'Firebase'],
    link: 'https://github.com/Symocha/App_Mobile_Taches',
  },
]

const PROJECTS_FR: Project[] = [
  {
    title: <><i className="fa-solid fa-trophy"></i> Thornmail · Priorisation d'alertes IA</>,
    meta: '24h · Equipe de 4',
    summary: 'Plateforme de priorisation d\'alertes SOC assistee par IA, concue a ConUHacks 2026.',
    details: [
      'Backend Python pour aggreger, noter et dedoublonner les alertes selon la severite, la correlation d\'entites et des fenetres temporelles',
      'Frontend React pour visualiser les alertes priorisees et les flux de travail des analystes',
      'Integration d un LLM local (Ollama) pour le raisonnement contextualise des incidents en securite à partir de donnees SOC structurees',
      '1re place au defi commandite par D3 Security',
      'Le projet Thornmail à été financé par la FAEE (Universite de Sherbrooke)',
    ],
    tags: ['Python', 'React', 'Ollama', 'LLM', 'Cybersecurite'],
    link: 'https://devpost.com/software/sentinel-2sjz9f',
  },
  {
    title: 'Jeu de cartes multijoueur en ligne',
    meta: '3 mois · Equipe de 4',
    summary: 'Jeu de cartes tour par tour avec multijoueur en temps reel via Angular + ASP.NET.',
    details: [
      'Architecture client-serveur avec Angular et ASP.NET (MVC + Web API)',
      'Gestion des roles en temps reel avec SignalR',
      'Systeme securise d inscription et de connexion',
      'Boutique en jeu avec gestion d items',
      'Suite de tests unitaires pour la logique backend',
      'Planification et gestion de projet via Azure DevOps',
    ],
    tags: ['Angular', 'ASP.NET', 'SignalR', 'Azure DevOps', 'C#'],
    link: 'https://github.com/Symocha/SuperCartesInfinies_Front',
  },
  {
    title: 'Gestionnaire de taches mobile',
    meta: '1 mois',
    summary: 'Application Flutter Android pour creer et gerer des taches avec synchro cloud.',
    details: [
      'Application Flutter Android pour creer et gerer une liste de taches',
      'Backend d abord en Spring Boot, puis migre vers Google Firebase',
      'Authentification utilisateur securisee',
      'Gestion d images pour les pieces jointes de taches',
    ],
    tags: ['Flutter', 'Dart', 'Spring Boot', 'Firebase'],
    link: 'https://github.com/Symocha/App_Mobile_Taches',
  },
]

function App() {
  const [openProject, setOpenProject] = useState<number | null>(null)
  const [lang, setLang] = useState<'en' | 'fr'>('en')
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 800)

  const isFr = lang === 'fr'
  const projects = isFr ? PROJECTS_FR : PROJECTS_EN
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
      href: 'https://github.com/Symocha' ,
    },
    {
      title: isFr ? 'Contact' : 'Contact',
      icon: <IconMail className="h-full w-full" />,
      href: 'mailto:Olivier.Tran@USherbrooke.ca',
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 800)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.bento-grid .bento-card'))
    const shapes = Array.from(document.querySelectorAll<HTMLElement>('.parallax-shape'))

    // Section-header one-shot fade
    const revealObserver = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      }),
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )
    if (reduceMotion) {
      revealEls.forEach(el => el.classList.add('is-visible'))
    } else {
      revealEls.forEach(el => revealObserver.observe(el))
    }

    if (reduceMotion || !cards.length) return () => revealObserver.disconnect()

    // Initialise cards hidden; JS will drive them from here
    cards.forEach(card => {
      card.style.opacity = '0'
      card.style.willChange = 'opacity, transform'
    })

    function updateCards() {
      const winH = window.innerHeight
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect()
        // progress: 0 when card top hits bottom of screen, 1 when card is 45% into view
        const progress = Math.max(0, Math.min(1, (winH - rect.top) / (winH * 0.45)))
        if (progress >= 1) {
          // Fully in — hand back to CSS so hover still works
          card.style.opacity = ''
          card.style.transform = ''
          card.style.willChange = ''
        } else {
          const dir = i % 2 === 0 ? -1 : 1
          const inv = 1 - progress
          card.style.opacity = progress.toFixed(3)
          card.style.transform =
            `translateY(${(inv * 36).toFixed(1)}px) ` +
            `translateX(${(inv * 22 * dir).toFixed(1)}px) ` +
            `scale(${(0.9 + progress * 0.1).toFixed(3)})`
        }
      })
    }

    function updateParallax() {
      const scrollY = window.scrollY
      shapes.forEach(shape => {
        const speed = parseFloat(getComputedStyle(shape).getPropertyValue('--speed')) || 0
        shape.style.setProperty('--parallax-offset', `${(scrollY * speed).toFixed(1)}px`)
      })
    }

    // Mouse-move parallax — each shape drifts to a depth-scaled mouse offset
    let mouseX = 0
    let mouseY = 0
    const lerpX = shapes.map(() => 0)
    const lerpY = shapes.map(() => 0)
    let mouseRaf: number | null = null

    function runMouseLerp() {
      let settled = true
      shapes.forEach((shape, idx) => {
        const depth = parseFloat(getComputedStyle(shape).getPropertyValue('--mouse-depth')) || 0
        const targetX = mouseX * depth
        const targetY = mouseY * depth
        const dx = targetX - lerpX[idx]
        const dy = targetY - lerpY[idx]
        lerpX[idx] += dx * 0.08
        lerpY[idx] += dy * 0.08
        shape.style.setProperty('--mouse-x', `${lerpX[idx].toFixed(2)}px`)
        shape.style.setProperty('--mouse-y', `${lerpY[idx].toFixed(2)}px`)
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) settled = false
      })
      mouseRaf = settled ? null : requestAnimationFrame(runMouseLerp)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - window.innerWidth / 2
      mouseY = e.clientY - window.innerHeight / 2
      if (mouseRaf === null) mouseRaf = requestAnimationFrame(runMouseLerp)
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    let raf: number | null = null
    const onScroll = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        updateCards()
        updateParallax()
        raf = null
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateCards()
    updateParallax()

    return () => {
      revealObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      if (raf !== null) cancelAnimationFrame(raf)
      if (mouseRaf !== null) cancelAnimationFrame(mouseRaf)
    }
  }, [])

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
        <p className="kicker text-center">{isFr ? 'Profil' : 'Profile'}</p>
        <div className="h-32 w-full flex justify-start">
          <TextHoverEffect text={isSmallScreen ? "OLIVIER" : "OLIVIER TRAN"} />
        </div>
        <div className="w-full flex justify-center">
          <p className="subtitle text-center">{isFr ? 'Étudiant en informatique' : 'Computer Science Student'}</p>
        </div>

        {/* <div className="hero-cta justify-center">
          <a href="#projects" className="cta-primary">{isFr ? 'Voir les projets' : 'View Projects'}</a>
          <a href="mailto:Olivier.Tran@USherbrooke.ca" className="cta-secondary">{isFr ? 'Me contacter' : 'Contact Me'}</a>
          <Link to="/conference" className="cta-secondary">{isFr ? 'Page conference' : 'Conference Page'}</Link>
        </div> */}

        <a href="#" className="scroll-cue" aria-label={isFr ? 'Defiler vers les sections du portfolio' : 'Scroll to portfolio sections'}>
          
          <span className="scroll-arrow"><i className="fa-solid fa-arrow-down"></i></span>
        </a>
      </section>

      <section id="snapshot" className="content-section bento-container">
        <div className="section-header reveal snapreveal">
          <p className="section-kicker"></p>
        </div>

        <div className="bento-grid">

        {/* ── Hero ── */}
        <div className="bento-card hero-card col-span-3">
          <div className="h-20 w-full mb-2">
            <h1>Olivier Tran</h1>
          </div>
          <p className="subtitle">{isFr ? 'Étudiant en informatique · Recherche un stage 1' : 'Computer Science Student · Seeking Stage 1 Internship'}</p>
          <div className="links">
            <a href="mailto:Olivier.Tran@USherbrooke.ca">Olivier.Tran@USherbrooke.ca</a>
            <span>|</span>
            <a href="https://github.com/Symocha" target="_blank" rel="noreferrer">github.com/Symocha</a>
            <span>|</span>
            <span>514 467-4683</span>
          </div>
        </div>

        {/* ── Education ── */}
        <div className="bento-card education">
          <p className="section-title">{isFr ? 'Formation' : 'Education'}</p>
          <h3>DEC-BAC {isFr ? 'Informatique' : 'Computer Science'}</h3>
          <span className="edu-status">{isFr ? 'En cours' : 'In Progress'}</span>
          <p>Université de Sherbrooke</p>
          <p>Cégep Édouard-Montpetit</p>
        </div>

        {/* ── Programming Languages ── */}
        <div className="bento-card col-span-2">
          <p className="section-title">{isFr ? 'Langages de programmation' : 'Programming Languages'}</p>
          <div className="tag-list">
            {['C++','C#','.NET','Python','Java','JavaScript','Kotlin','Dart','ARMv8','Lua'].map(t => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Web / Frameworks ── */}
        <div className="bento-card col-span-2">
          <p className="section-title">{isFr ? 'Web et frameworks' : 'Web & Frameworks'}</p>
          <div className="tag-list">
            {['Angular','React','Vue.js','ASP.NET','Spring Boot','Firebase','SignalR'].map(t => (
              <span className="tag accent" key={t}>{t}</span>
            ))}
          </div>
        </div>        

        {/* ── Hackathon ── */}
        <div className="bento-card hackathon">
          <p className="section-title">{isFr ? 'Hackathons' : 'Hackathons'}</p>
          <h3> ConUHacks 2026</h3>
          <p>{isFr ? 'Defi commandite par D3 Security ' : 'D3 Security Sponsored Challenge '}<div className='hack-position'>{isFr ? '1re place' : '1st Place'}</div></p>
          <p>{isFr ? 'Plateforme de priorisation d\'alertes SOC assistee par IA' : 'AI-assisted SOC alert prioritization platform'}</p>
          <a href="https://devpost.com/software/sentinel-2sjz9f" target="_blank" rel="noreferrer">{isFr ? 'Voir sur Devpost' : 'View on Devpost'} &rarr;</a>
        </div>

        {/* ── Conference ── */}
        <div className="bento-card experience">
          <p className="section-title">{isFr ? 'Conference' : 'Conference'}</p>
          <h3>RSAC</h3>
          <p className="exp-meta">San Francisco 2026</p>
          <p>{isFr ? 'Participant. Presence a des sessions sur les operations de cybersecurite, la securite cloud et les menaces emergentes. La participation à la conference à été financé par D3 Security et par le FAEE de l\'Université de Sherbrooke.' : 'Attendee. Participated in industry sessions on cybersecurity operations, cloud security, and emerging threats. Conference attendance financed by D3 Security and by the FAEE of the University of Sherbrooke.'}</p>
        </div>
            

        {/* ── Tools & DB ── */}
        <div className="bento-card col-span-2">
          <p className="section-title">{isFr ? 'Outils et bases de donnees' : 'Tools & Databases'}</p>
          <div className="tag-list">
            {['SQL Server','SSMS','Git','Azure DevOps','Figma','OrCAD','Oracle Cloud','Postman','Linux','Ollama'].map(t => (<span className="tag" key={t}>{t}</span>))}
          </div>
        </div>


        {/* ── Projects ── */}
        <div className="bento-card col-span-3 row-span-2" id="projects" onMouseLeave={() => setOpenProject(null)}>
          <p className="section-title">{isFr ? 'Projets' : 'Projects'}</p>
          {projects.map((p, i) => (
            <ProjectCard
              project={p}
              key={`${p.meta}-${i}`}
              isOpen={openProject === i}
              onOpen={() => setOpenProject(i)}
              onClose={() => setOpenProject(null)}
              expandHint={isFr ? 'Cliquer pour ouvrir →' : 'Click to expand →'}
              viewProjectLabel={isFr ? 'Voir le projet →' : 'View Project →'}
            />
          ))}
        </div>
            {/* ── Languages ── */}
        <div className="bento-card">
          <p className="section-title">{isFr ? 'Langues' : 'Languages'}</p>
          <div className="tag-list">
            {(isFr ? ['Anglais', 'Francais', 'Vietnamien'] : ['English', 'French', 'Vietnamese']).map(t => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── Work Experience ── */}
        <div className="bento-card experience">
          <p className="section-title">{isFr ? 'Experience' : 'Experience'}</p>
          <h3>{isFr ? 'Préposé à la salubrite et à l\'hygiene' : 'Sanitation & Hygiene Attendant'}</h3>
          <p className="exp-meta">2021 – 2023</p>
          <p>{isFr ? 'Hopital Pierre-Boucher et Centre Jeunesse de la Monteregie. Protocoles stricts pour blocs operatoires, URDM et salles IRM.' : 'Hôpital Pierre-Boucher & Centre Jeunesse de la Montérégie. Strict protocols for ORs, URDM, MRI rooms.'}</p>
        </div>
        
       
        {/* ── Ongoing Projects ── */}
        <div className="bento-card col-span-2 ongoing-card minimal-card">
          <p className="section-title">{isFr ? 'Projets en cours' : 'Ongoing Projects'}</p>
          <div className="ongoing-list">
            <div className="ongoing-item">
              <h4>{isFr ? 'Agent de triage SOC' : 'SOC Triage Agent'}</h4>
              <span className="status-pill">{isFr ? 'En cours' : 'In Progress'}</span>
              <p>{isFr ? 'Analyse les alertes reliees et suggere une priorite analyste selon le contexte.' : 'Analyzes related alerts and suggests analyst priority based on context.'}</p>
            </div>
            <div className="ongoing-item">
              <h4>The Listening Room</h4>
              <span className="status-pill">{isFr ? 'En cours' : 'In Progress'}</span>
              <p>{isFr ? 'Application de discussion et de notation K-pop.' : 'Kpop discussion and rating app.'}</p>
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="bento-card col-span-2 timeline-card minimal-card">
          <p className="section-title">{isFr ? 'Parcours' : 'Timeline'}</p>
          <ol className="timeline-list">
            
            <li>
              <strong>{isFr ? 'Janvier 2026' : 'January 2026'}</strong>
              <span>{isFr ? 'ConUHacks 1re place - defi D3 Security' : 'ConUHacks 1st Place - D3 Security Challenge'}</span>
            </li>
            <li>
              <strong>{isFr ? 'Mars 2026' : 'March 2026'}</strong>
              <span>{isFr ? 'Participant RSAC Conference, San Francisco' : 'RSAC Conference Attendee, San Francisco'}</span>
            </li>
            <li>
              <strong>{isFr ? 'Automne 2026' : 'Fall 2026'}</strong>
              <span>{isFr ? 'Stage - 12 semaines' : 'Internship - 12 weeks'}</span>
            </li>
            <li>
              <strong>{isFr ? 'Hiver 2026' : 'Winter 2026'}</strong>
              <span>{isFr ? 'Trimestre de cours' : 'Course Term'}</span>
            </li>
          </ol>
        </div>

        {/* ── Contact / Internship CTA ── */}
        <div className="bento-card col-span-2 cta-card minimal-card" id="contact">
          <p className="section-title">{isFr ? 'Contact' : 'Contact'}</p>
          <div className="contact-footer">
            <p>{isFr ? 'Je recherche un stage 1 en developpement logiciel.' : 'Looking for a Stage 1 internship in software.'}</p>
            <div className="hero-cta">
              <a href="mailto:Olivier.Tran@USherbrooke.ca" className="cta-primary">{isFr ? 'Me contacter' : 'Email Me'}</a>
              <a href="https://github.com/Symocha" target="_blank" rel="noreferrer" className="cta-secondary">{isFr ? 'Profil GitHub' : 'GitHub Profile'}</a>
            </div>
          </div>
        </div>

        {/* ── Currently Learning ── */}
        <div className="bento-card col-span-2 learning-card minimal-card">
          <p className="section-title">{isFr ? 'Apprentissage actuel' : 'Currently Learning'}</p>
          <div className="tag-list learning-chips">
            {(isFr
              ? [
                  'Techniques et outils de développement',
                  'Conception orientée objet',
                  'Sécurité et cryptographie',
                  'Algorithmes et structures de données',
                ]
              : [
                  'Development Tools & Practices',
                  'Object-Oriented Design',
                  'Security & Cryptography',
                  'Algorithms & Data Structures',
                ]
            ).map(t => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </div>
        
        {/* ── Interests ── */}
        <div className="bento-card col-span-4 interests-card minimal-card">
          <p className="section-title">{isFr ? 'Interets' : 'Interests'}</p>
          <div className="interests-grid">
            <div className="interest-item">
              <span className="interest-icon"><i className="fa-solid fa-hill-rockslide"></i></span>
              {isFr ? 'Bloc' : 'Bouldering'}
            </div>
            <div className="interest-item">
              <span className="interest-icon"><i className="fa-solid fa-gamepad"></i></span>
              {isFr ? 'Jeux video' : 'Video Games'}
            </div>
            <div className="interest-item">
              <span className="interest-icon"><i className="fa-solid fa-keyboard"></i></span>
              {isFr ? 'Claviers mecaniques' : 'Mech Keyboards'}
            </div>
            <div className="interest-item">
              <span className="interest-icon"><i className="fa-solid fa-flag"></i></span>
              F1
            </div>
            <div className="interest-item">
              <span className="interest-icon"><i className="fa-solid fa-hockey-puck"></i></span>
              {isFr ? 'Canadiens de Montréal' : 'Montreal Canadiens'}
            </div>
            <div className="interest-item">
              <span className="interest-icon"><i className="fa-solid fa-microchip"></i></span>
              {isFr ? 'Electronique' : 'Electronics'}
            </div>
            <div className="interest-item">
              <span className="interest-icon"><i className="fa-solid fa-paint-brush"></i></span>
              {isFr ? 'Art Digital' : 'Digital Art'}
            </div>
          </div>
        </div>

      </div>
      </section>
      </div>
      <FloatingDock items={dockLinks} mobileClassName="md:translate-y-0" />
    </div>
  )
}

export default App
