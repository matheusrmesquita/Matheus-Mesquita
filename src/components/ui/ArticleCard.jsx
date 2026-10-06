import React from 'react';
import { Link } from 'react-router-dom';
import { CoverArt, getArticleCoverData } from '@/utils/coverArt';

// Card de artigo no estilo visual da Brand (capa conceitual + overlay + detalhe no hover),
// alimentado pelo conteúdo real dos seus artigos (título, resumo e tags).
const ArticleCard = ({ article, index = 0, language, ctaLabel, className = '' }) => {
    const { coverClass, letter, year, tags } = getArticleCoverData(article, index);
    const title = language === 'en' && article.title_en ? article.title_en : article.title;
    const excerpt = language === 'en' && article.excerpt_en ? article.excerpt_en : article.excerpt;

    return (
        <Link
            to={article.slug}
            className={`proj-card group block outline-none focus-visible:ring-4 focus-visible:ring-[#38889F] ${className}`}
            role="article"
            aria-label={`${language === 'en' ? 'Article' : 'Artigo'} ${title}`}
        >
            <CoverArt coverClass={coverClass} letter={letter} />

            <div className="proj-overlay">
                <div className="proj-detail">
                    {excerpt && <p className="proj-desc">{excerpt}</p>}
                    <span className="proj-cta">
                        {ctaLabel || (language === 'en' ? 'Read full article' : 'Ler artigo completo')}
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </div>
                <div className="proj-meta">
                    <div className="proj-info">
                        <h3 className="proj-name">{title}</h3>
                        <div className="proj-tags">
                            {tags.map((tag, i) => (
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

export default ArticleCard;
