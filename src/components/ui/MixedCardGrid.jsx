import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import { ArrowRight } from 'lucide-react';
import { getProjectCoverData, getArticleCoverData, ProjectCover } from '@/utils/projectCovers';

const MixedCardGrid = ({ items, language, t }) => {
    if (!items || items.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-slate-500 dark:text-slate-400">
                    Nenhum resultado encontrado com os filtros atuais.
                </p>
            </div>
        );
    }

    return (
        <div className="brand-card-grid">
            {items.map((item, index) => {
                if (item.type === 'project') {
                    const projectTitle = language === 'en' && item.title_en ? item.title_en : item.title;

                    // Obter dados conceituais específicos do projeto real
                    const { coverClass, letter, description, year, tags } = getProjectCoverData(item, language);

                    return (
                        <motion.div
                            key={`project-${item.id}`}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.62, delay: Math.min(index * 0.04, 0.18), ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            <Link
                                to={`/projetos/${item.id}`}
                                className="proj-card group block h-full w-full outline-none focus-visible:ring-4 focus-visible:ring-[#FF5A1F] rounded overflow-hidden"
                                role="article"
                                aria-label={`Projeto ${projectTitle}`}
                            >
                                {/* Badge identificador delicado */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-black/65 backdrop-blur-md text-[#FF5A1F] text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded border border-[#FF5A1F]/25 shadow-lg">
                                        {language === 'en' ? 'Project' : 'Projeto'}
                                    </span>
                                </div>

                                <ProjectCover coverClass={coverClass} letter={letter} />
                                <div className="proj-overlay">
                                    <div className="proj-detail">
                                        <p className="proj-desc">{description}</p>
                                        <span className="proj-cta">
                                            {language === 'en' ? 'View project' : 'Ver projeto'}
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="proj-meta">
                                        <div className="proj-info">
                                            <h3 className="proj-name">{projectTitle}</h3>
                                            <div className="proj-tags">
                                                {tags.map((tag, i) => (
                                                    <span key={i} className="proj-tag">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="proj-year">{year}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                } else {
                    return (
                        <motion.div
                            key={`article-${item.id}`}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.62, delay: Math.min(index * 0.04, 0.18), ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            <Link
                                to={item.slug}
                                className="proj-card group block h-full w-full outline-none focus-visible:ring-4 focus-visible:ring-brand-glow rounded overflow-hidden relative"
                                role="article"
                                aria-label={`Artigo ${item.title}`}
                            >
                                {/* Badge identificador delicado */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="bg-black/65 backdrop-blur-md text-brand-glow text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded border border-brand-glow/25 shadow-lg">
                                        Artigo
                                    </span>
                                </div>

                                <ProjectCover coverClass={getArticleCoverData(item).coverClass} letter={getArticleCoverData(item).letter} />
                                <div className="proj-overlay">
                                    <div className="proj-detail">
                                        <p className="proj-desc">{item.excerpt}</p>
                                        <span className="proj-cta">
                                            {t('articles.readMore') || 'Ler artigo completo'}
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="proj-meta">
                                        <div className="proj-info">
                                            <h3 className="proj-name">{item.title}</h3>
                                            <div className="proj-tags">
                                                {getArticleCoverData(item).tags.map((tag, i) => (
                                                    <span key={i} className="proj-tag">{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <span className="proj-year">{getArticleCoverData(item).year}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                }
            })}
        </div>
    );
};

export default MixedCardGrid;
