import React from 'react';
import { Link } from 'react-router-dom';

// Card de projeto no estilo visual da Brand (cover + overlay + detalhe no hover),
// alimentado pelo conteúdo real do portfólio (imagem, título, tags e contexto do projeto).
const getYear = (project) => {
    const tagYear = (project.tags || []).find((tag) => /^\d{4}$/.test(tag));
    return tagYear || project.date?.split('-')[0] || '';
};

const getDisplayTags = (project) => {
    return (project.tags || []).filter((tag) => tag !== 'Landing Page' && !/^\d{4}$/.test(tag));
};

const ProjectCard = ({ project, language, ctaLabel = 'Ver projeto', className = '' }) => {
    const title = language === 'en' && project.title_en ? project.title_en : project.title;
    const description = language === 'en' && project.context_en ? project.context_en : project.context;
    const year = getYear(project);
    const displayTags = getDisplayTags(project).slice(0, 3);

    return (
        <Link
            to={`/projetos/${project.id}`}
            className={`proj-card group block outline-none focus-visible:ring-4 focus-visible:ring-[#38889F] ${className}`}
            role="article"
            aria-label={`Projeto ${title}`}
        >
            <div className="proj-cover">
                <img
                    src={project.image}
                    alt={title}
                    className="w-full h-full object-cover pointer-events-none"
                />
            </div>
            <div className="proj-cover-noise"></div>

            <div className="proj-overlay">
                <div className="proj-detail">
                    {description && <p className="proj-desc">{description}</p>}
                    <span className="proj-cta">
                        {ctaLabel}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
                <div className="proj-meta">
                    <div className="proj-info">
                        <h3 className="proj-name">{title}</h3>
                        <div className="proj-tags">
                            {displayTags.map((tag, i) => (
                                <span key={i} className="proj-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                    {year && <span className="proj-year">{year}</span>}
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
