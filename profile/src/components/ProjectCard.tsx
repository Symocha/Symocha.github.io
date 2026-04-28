import type { ReactNode } from 'react'

export interface Project {
  title: ReactNode
  meta: string
  summary: string
  details: string[]
  tags: string[]
  link?: string
}

interface ProjectCardProps {
  project: Project
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  expandHint?: string
  viewProjectLabel?: string
}

export function ProjectCard({
  project,
  isOpen,
  onOpen,
  onClose,
  expandHint = 'Click to expand →',
  viewProjectLabel = 'View Project →',
}: ProjectCardProps) {
  return (
    <>
      <div className="project" onClick={onOpen} role="button" tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onOpen()}>
        <div className="project-header">
          <h3>{project.title}</h3>
          <span className="meta">{project.meta}</span>
        </div>
        <p>{project.summary}</p>
        <div className="project-tags">
          {project.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
        <span className="project-expand-hint">{expandHint}</span>
      </div>

      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>✕</button>

            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-meta">{project.meta}</p>

            <ul className="modal-details">
              {project.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>

            <div className="tag-list" style={{ marginTop: '1rem' }}>
              {project.tags.map(t => <span className="tag accent" key={t}>{t}</span>)}
            </div>

            {project.link && (
              <a className="modal-link" href={project.link} target="_blank" rel="noreferrer">
                {viewProjectLabel}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  )
}
