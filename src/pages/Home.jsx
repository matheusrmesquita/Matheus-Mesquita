import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import ArticlesSection from '@/components/common/ArticlesSection';
import { ProjectCover } from '@/utils/projectCovers';
import { useSupabaseProjects } from '@/hooks/useSupabaseProjects';

const revealViewport = { once: true, margin: '-80px' };
const revealTransition = { duration: 0.72, ease: [0.22, 1, 0.36, 1] };
const revealUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0 }
};

/* ─── Componente de Contador Animado ─── */
const AnimatedCounter = ({ value, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const inView = useInView(countRef, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView) {
            let startTimestamp = null;
            const endValue = parseInt(value);
            
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
                setCount(Math.floor(progress * endValue));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            
            window.requestAnimationFrame(step);
        }
    }, [inView, value, duration]);

    return <span ref={countRef}>{String(count).padStart(2, '0')}</span>;
};

const getProjectData = (project) => {
    const coverClass = project.cover_type || 'cover-orbita';
    const letter = project.cover_letter || project.title?.charAt(0).toUpperCase() || 'P';
    const year = (project.tags || []).find(t => /^\d{4}$/.test(t)) || project.created_at?.split('-')[0] || '2025';
    const tags = (project.tags || []).filter(t => !/^\d{4}$/.test(t)).slice(0, 2);
    const description = project.description || '';
    return { coverClass, letter, year, tags, description };
};

const Home = () => {
    const { t, language } = useLanguage();
    const { projects: supabaseProjects } = useSupabaseProjects();
    const totalProjects = supabaseProjects.length;

    return (
        <div className="w-full bg-[#050505] text-[#F5F5F5] font-sans overflow-hidden">

            {/* ─── SEÇÃO HERO (Atmospheric Visual) ─── */}
            <section className="brand-section relative w-full min-h-[100svh] flex flex-col justify-end pt-32 pb-16 md:pb-24 overflow-hidden hero-grain" id="hero">
                {/* Feixes de Luz Atmosféricos */}
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] h-[55%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,90,31,0.24)_0%,rgba(255,107,0,0.12)_30%,rgba(204,74,0,0.05)_60%,transparent_75%)] pointer-events-none animate-glow-breath z-0"></div>
                <div className="absolute bottom-[20%] left-[15%] w-[30%] h-[40%] bg-[radial-gradient(ellipse,rgba(255,90,31,0.09)_0%,transparent_65%)] pointer-events-none animate-glow-breath-accent z-0"></div>

                <div className="brand-container relative z-10 w-full flex flex-col justify-end">
                    <p className="inline-flex items-center gap-3 text-xs tracking-[0.18em] uppercase text-zinc-500 mb-6 select-none">
                        {language === 'en' ? 'Performance & Growth' : 'Performance & Crescimento'}
                    </p>

                    <motion.h1
                        initial={{ opacity: 0, y: 26 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...revealTransition, duration: 0.82 }}
                        className="brand-hero-title text-[3.5rem] md:text-[6.5rem] lg:text-[7.5rem] xl:text-[9rem] font-black tracking-tight leading-[0.9] text-white text-left select-none mb-12"
                    >
                        {language === 'en' ? (
                            <>Strategies<br />oriented for<br />growth and<br /><em className="headline-stroke">performance.</em></>
                        ) : (
                            <>Estratégias<br />orientadas para<br />crescimento e<br /><em className="headline-stroke">performance.</em></>
                        )}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ...revealTransition, delay: 0.12 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end w-full"
                    >
                        <p className="brand-body-text text-zinc-400 text-base md:text-lg max-w-[400px] leading-relaxed">
                            {t('hero.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-start md:justify-end items-start md:items-center">
                            <a href="#projects" className="brand-button-text inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#FF5A1F] hover:bg-[#FF6B00] px-6 py-3.5 rounded transition-all duration-300 hover:-translate-y-0.5 group">
                                {t('hero.ctaPortfolio')}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" className="brand-button-text inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white border-b border-zinc-800 hover:border-zinc-500 pb-1 transition-colors">
                                {language === 'en' ? 'Talk to a Specialist' : 'Falar com Especialista'}
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Indicador de Scroll Cue */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none select-none" aria-hidden="true">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 rotate-180" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
                </div>
            </section>

            {/* ─── SEÇÃO MARQUEE INFINITO (Habilidades) ─── */}
            <div className="w-full border-t border-b border-white/5 py-4 md:py-5 overflow-hidden bg-zinc-950/20" aria-hidden="true">
                <div className="marquee-track-scroll">
                    {[...Array(2)].map((_, i) => (
                        <React.Fragment key={i}>
                            {["Mídia Paga", "Social Media", "Meta Ads", "Google Ads", "Growth", "Performance", "Estratégia Digital", "Conversão"].map((skill, index) => (
                                <div key={`${i}-${index}`} className="flex items-center gap-6 md:gap-14 pr-6 md:pr-14 text-sm font-semibold tracking-widest uppercase text-zinc-500 whitespace-nowrap">
                                    {skill}
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] flex-shrink-0"></div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* ─── SEÇÃO PROJETOS (Selected Work) ─── */}
            <motion.section
                id="projects"
                className="brand-section brand-section-block scroll-mt-24"
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                transition={revealTransition}
            >
                <div className="brand-container">
                <div className="flex flex-row justify-between gap-6 mb-16 items-end flex-wrap">
                    <div>
                        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#FF5A1F] mb-3">
                            {language === 'en' ? 'Selected outcomes' : 'Resultados selecionados'}
                        </p>
                        <h2 className="brand-section-title text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">{t('projects.title')}</h2>
                    </div>
                    <Link to="/projetos" className="text-zinc-500 hover:text-white border-b border-zinc-800 hover:border-zinc-500 pb-1 text-sm font-medium transition-colors">
                        {t('projects.viewAll')} →
                    </Link>
                </div>

                {/* Grade de Cards — 3 projetos mais recentes */}
                <div className="work-grid-stitch">
                    {supabaseProjects.slice(0, 3).map((project, index) => {
                        const isFeatured = index === 0;
                        const projectTitle = language === 'en' && project.title_en ? project.title_en : project.title;
                        const { coverClass, letter, description, year, tags } = getProjectData(project);
                        const projectLink = `/projetos/${project.slug}`;

                        return (
                            <Link
                                key={project.id}
                                to={projectLink}
                                className={`proj-card ${isFeatured ? 'work-card-stitch-featured' : ''} group`}
                                role="article"
                                aria-label={`Projeto ${projectTitle}`}
                            >
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
                        );
                    })}
                </div>
                </div>
            </motion.section>

            {/* ─── SEÇÃO ESTATÍSTICAS (Stats Block) ─── */}
            <motion.div
                className="brand-section"
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                transition={revealTransition}
            >
                <div className="brand-container">
                <div className="stats-stitch">
                    {[
                        { val: totalProjects, label: language === 'en' ? "Projects on site" : "Projetos no site" },
                        { val: "06", label: language === 'en' ? "Years of operations" : "Anos de atuação" },
                        { val: "32", label: language === 'en' ? "Active clients" : "Clientes atendidos" }
                    ].map((stat, i) => (
                        <div key={i} className="stat-item-stitch text-center flex flex-col items-center justify-center">
                            <p className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none">
                                <AnimatedCounter value={stat.val} /><span className="text-[#FF5A1F] ml-1">+</span>
                            </p>
                            <p className="text-zinc-500 text-xs md:text-sm font-bold tracking-wide mt-4 uppercase">{stat.label}</p>
                        </div>
                    ))}
                </div>
                </div>
            </motion.div>

            {/* ─── SEÇÃO ESPECIALIDADES (Serviços) ─── */}
            <motion.section
                id="services"
                className="brand-section brand-section-block scroll-mt-24 bg-zinc-950/20"
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                transition={revealTransition}
            >
                <div className="brand-container">
                <div className="flex flex-col md:flex-row justify-between gap-6 mb-16 items-start md:items-end">
                    <div>
                        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#FF5A1F] mb-3">
                            {language === 'en' ? 'Core Expertise' : 'Nossas Frentes'}
                        </p>
                        <h2 className="brand-section-title text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">{t('about.backgroundTitle')}</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 border border-white/5">
                    {[
                        { num: "01", title: t('about.methodologyItem1Label'), desc: t('about.methodologyItem1') },
                        { num: "02", title: t('about.methodologyItem3Label'), desc: t('about.methodologyItem3') },
                        { num: "03", title: t('about.methodologyItem2Label'), desc: t('about.methodologyItem2') },
                        { num: "04", title: t('about.methodologyItem4Label'), desc: t('about.methodologyItem4') }
                    ].map((serv, i) => (
                        <div key={i} className="service-item-stitch p-6 md:p-10 border-b border-r border-white/5 last:border-b-0 md:even:border-r-0">
                            <p className="text-[10px] font-mono text-[#FF5A1F] tracking-widest mb-5">{serv.num}</p>
                            <h3 className="brand-card-title text-lg md:text-xl font-bold text-white mb-3 tracking-tight">{serv.title}</h3>
                            <p className="brand-body-text text-zinc-400 text-sm leading-relaxed">{serv.desc}</p>
                        </div>
                    ))}
                </div>
                </div>
            </motion.section>

            {/* ─── SEÇÃO DE ARTIGOS ─── */}
            <ArticlesSection />

            {/* ─── SEÇÃO CTA FINAL ─── */}
            <motion.section
                id="contact"
                className="brand-section brand-section-block relative overflow-hidden text-center border-t border-white/5"
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={revealViewport}
                transition={revealTransition}
            >
                <div className="brand-container">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] h-[80%] bg-[radial-gradient(ellipse_at_center,rgba(255,90,31,0.11)_0%,transparent_70%)] pointer-events-none" aria-hidden="true"></div>
                
                <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#FF5A1F] mb-6 justify-center">
                    {language === 'en' ? 'Next steps' : 'Próximos passos'}
                </p>
                
                <h2 className="brand-section-title text-4xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none mb-12 max-w-[14ch] mx-auto select-none">
                    {language === 'en' ? (
                        <>Let's amplify your <em className="text-[#FF5A1F] not-italic">presence.</em></>
                    ) : (
                        <>Vamos ampliar a sua <em className="text-[#FF5A1F] not-italic">presença.</em></>
                    )}
                </h2>

                <div className="flex justify-center items-center gap-4 flex-wrap">
                    <a href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" className="brand-button-text inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#FF5A1F] hover:bg-[#FF6B00] px-8 py-4 rounded transition-all duration-300 hover:-translate-y-0.5 group">
                        {t('cta.button')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <Link to="/sobre" className="brand-button-text inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white border-b border-zinc-800 hover:border-zinc-500 pb-1 transition-colors">
                        {language === 'en' ? 'Learn about Brand' : 'Conhecer a Brand'}
                    </Link>
                </div>
                </div>
            </motion.section>

        </div>
    );
};

export default Home;
