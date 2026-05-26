import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { AlertCircle, Target, Users, Activity, Landmark, Award, BookOpen, Compass, Cpu, ClipboardList } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProjectCover } from '@/utils/projectCovers';

const ICON_MAP = { Target, Users, Activity, Landmark, Award, BookOpen, Compass, AlertCircle, Cpu, ClipboardList };

const FadeUp = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

const ArticleCover = ({ type, letter }) => (
    <ProjectCover coverClass={type || 'cover-orbita'} letter={letter || 'B'} />
);

const Callout = ({ callout }) => {
    if (!callout) return null;
    const colorMap = {
        amber: { border: 'rgba(245,158,11,0.2)', bg: 'rgba(245,158,11,0.05)', color: '#F59E0B' },
        accent: { border: 'rgba(255,90,31,0.2)', bg: 'rgba(255,90,31,0.05)', color: '#FF5A1F' },
        final: { border: 'rgba(255,255,255,0.1)', bg: 'rgba(255,255,255,0.03)', color: '#a1a1aa' },
    };
    const style = colorMap[callout.type] || colorMap.amber;
    return (
        <div className="ar-callout" style={{ borderColor: style.border, background: style.bg }}>
            {callout.label && (
                <div className="ar-callout-header">
                    <AlertCircle size={18} style={{ color: style.color }} />
                    <span className="ar-callout-label" style={{ color: style.color }}>{callout.label}</span>
                </div>
            )}
            <p className="ar-callout-body ar-callout-italic">{callout.text}</p>
        </div>
    );
};

const ArticleTemplate = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        supabase.from('articles').select('*').eq('slug', slug).eq('status', 'published').single()
            .then(({ data }) => { setArticle(data); setLoading(false); });
    }, [slug]);

    if (loading) return null;
    if (!article) return <Navigate to="/artigos" replace />;

    return (
        <article className="pd-article">
            <section className="pd-hero">
                <ArticleCover type={article.cover_type} letter={article.cover_letter} />
                <div className="pd-hero-overlay" />
                <div className="pd-hero-glow" />
                <div className="pd-hero-content">
                    <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
                        <Link to="/artigos" className="pd-hero-back">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Todos os artigos
                        </Link>
                    </motion.div>
                    <motion.span className="pd-label" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                        {article.category}
                    </motion.span>
                    <motion.h1 className="pd-hero-title" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
                        {article.title}
                    </motion.h1>
                    <motion.div className="pd-hero-tags" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}>
                        {(article.tags || []).map((tag, i) => <span key={i} className="pd-hero-tag">{tag}</span>)}
                    </motion.div>
                    {article.author && (
                        <motion.p
                            className="text-zinc-500 text-xs mt-4 tracking-wide"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.44 }}
                        >
                            Por <span className="text-zinc-300 font-medium">{article.author}</span>
                        </motion.p>
                    )}
                </div>
            </section>

            <div className="brand-section">
                <div className="ar-article-container">
                    {(article.intro_highlight || article.intro_sub) && (
                        <FadeUp delay={0.05}>
                            <div className="ar-intro-block">
                                {article.intro_highlight && <p className="ar-intro-highlight">{article.intro_highlight}</p>}
                                {article.intro_sub && <p className="ar-intro-sub">{article.intro_sub}</p>}
                            </div>
                        </FadeUp>
                    )}

                    {(article.sections || []).map((section, idx) => {
                        const Icon = ICON_MAP[section.icon] || Target;
                        return (
                            <FadeUp key={idx}>
                                <section className="ar-section">
                                    <div className="ar-section-header">
                                        <span className="ar-section-icon"><Icon size={20} /></span>
                                        <h2 className="ar-section-title">{section.title}</h2>
                                    </div>
                                    {(section.paragraphs || []).filter(Boolean).map((p, pIdx) => (
                                        <p key={pIdx} className="ar-body">{p}</p>
                                    ))}
                                    <Callout callout={section.callout} />
                                </section>
                            </FadeUp>
                        );
                    })}
                </div>
            </div>

            <FadeUp>
                <div className="pd-cta-strip">
                    <div className="pd-cta-text">
                        <span className="pd-cta-label">Iniciar um Projeto</span>
                        <h2 className="pd-cta-title">Pronto para transformar sua experiência digital?</h2>
                        <p className="pd-cta-sub">Conte-nos sobre seu próximo desafio.</p>
                    </div>
                    <Link to="/contato" className="pd-btn-primary">
                        Vamos conversar
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </div>
            </FadeUp>
        </article>
    );
};

export default ArticleTemplate;
