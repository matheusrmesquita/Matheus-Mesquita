import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProjectCover } from '@/utils/projectCovers';
import { useSupabaseArticles } from '@/hooks/useSupabaseArticles';

const getCoverData = (article, index) => {
    const covers = ['cover-orbita','cover-nexus','cover-lumina','cover-veritas','cover-fluxo','cover-kairos','cover-meridian','cover-apex'];
    const coverClass = article.cover_type || covers[(index + 3) % 8];
    const letter = article.cover_letter || article.title?.charAt(0).toUpperCase() || 'A';
    const yearTag = (article.tags || []).find(t => !isNaN(t) && t.length === 4);
    const year = yearTag || (article.created_at ? article.created_at.split('-')[0] : '2026');
    const tags = (article.tags || []).filter(t => t !== year).slice(0, 2);
    return { coverClass, letter, year, tags };
};

const ArticlesSection = () => {
    const { articles: supabaseArticles } = useSupabaseArticles();

    const allArticles = supabaseArticles
        .map(a => ({ ...a, slug: `/artigos/${a.slug}` }))
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        .slice(0, 3);

    return (
        <section className="brand-section brand-section-block scroll-mt-32" id="artigos">
            <div className="brand-container">
            <div className="grid grid-cols-12 gap-6 mb-12">
                <div className="col-span-12 md:col-span-8">
                    <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#FF5A1F] mb-4">
                        Reflexões
                    </p>
                    <h2 className="brand-section-title text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">Artigos de Projetos</h2>
                </div>
            </div>

            <div className="brand-card-grid">
                {allArticles.map((article, index) => {
                    const { coverClass, letter, year, tags } = getCoverData(article, index);

                    return (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.62, delay: Math.min(index * 0.04, 0.18), ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            <Link
                                to={article.slug}
                                className="proj-card group block h-full w-full outline-none focus-visible:ring-4 focus-visible:ring-[#FF5A1F] rounded overflow-hidden"
                                role="article"
                                aria-label={`Artigo ${article.title}`}
                            >
                                <ProjectCover coverClass={coverClass} letter={letter} />
                                <div className="proj-overlay">
                                    <div className="proj-detail">
                                        <p className="proj-desc">{article.excerpt}</p>
                                        <span className="proj-cta">
                                            Ler artigo completo
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </span>
                                    </div>
                                    <div className="proj-meta">
                                        <div className="proj-info">
                                            <h3 className="proj-name">{article.title}</h3>
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
                })}
            </div>

            {/* Ver todos os artigos Button */}
            {supabaseArticles.length > 3 && (
                <div className="mt-12 flex justify-center">
                    <Link to="/artigos" className="brand-button-text inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 hover:bg-[#FF5A1F] hover:text-white text-white font-bold rounded-full transition-all duration-300 border border-white/10 hover:border-[#FF5A1F] group/btn">
                        Ver todos os artigos
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}
            </div>
        </section>
    );
};

export default ArticlesSection;
