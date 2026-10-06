import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { ArrowLeft, ExternalLink, LayoutTemplate, Zap, MonitorSmartphone, MonitorPlay, Sparkles, Lightbulb, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

const ProjectDetails = () => {
    const { id } = useParams();
    const { t, language } = useLanguage();
    const project = projects.find(p => p.id === parseInt(id));

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-zinc-950 text-slate-900 dark:text-white">
                <h2 className="text-3xl font-bold mb-6 text-center">{t('projectDetails.notFound')}</h2>
                <Link to="/#projects" className="w-full sm:w-auto">
                    <InteractiveHoverButton text={t('projectDetails.backToPortfolio')} className="w-full sm:w-auto bg-[#38889F] border-[#38889F] text-white" />
                </Link>
            </div>
        );
    }

    const title = language === 'en' ? (project.title_en || project.title) : project.title;
    const role = language === 'en' ? (project.role_en || project.role) : project.role;
    const context = language === 'en' ? (project.context_en || project.context) : project.context;
    const process = language === 'en' ? (project.process_en || project.process) : project.process;
    const technique = language === 'en' ? (project.technique_en || project.technique) : project.technique;
    const highlight = language === 'en' ? (project.highlight_en || project.highlight) : project.highlight;
    const solution = language === 'en' ? (project.solution_en || project.solution) : project.solution;
    const aesthetics = language === 'en' ? (project.aesthetics_en || project.aesthetics) : project.aesthetics;

    return (
        <>
        <article className="min-h-screen bg-white dark:bg-[#0f0f11] text-slate-600 dark:text-slate-400 font-sans selection:bg-[#38889F]/30 pb-24">

            {/* Nav Auxiliar - Voltar */}
            <div className="max-w-5xl mx-auto px-6 pt-12">
                <Link to="/#projects" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium group text-lg">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t('projectDetails.back')}
                </Link>
            </div>

            {/* HEADER GIGANTE (TITLE & TAGS) */}
            <header className="pt-16 pb-20 px-6 max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {project.tags?.filter(t => t !== "Landing Page").map((tag, idx) => (
                            <span key={idx} className="px-5 py-2 bg-[#38889F]/10 text-[#38889F] rounded-full text-sm font-bold border border-[#38889F]/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8 leading-[1.1]">{title}</h1>
                    {role && (
                        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">{role}</p>
                    )}
                </motion.div>
            </header>

            {/* MAIN CONTENT BLOCK (TEXTS) */}
            <section className="px-6 pb-24 max-w-4xl mx-auto space-y-16">

                {context && (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-t border-slate-100 dark:border-white/5 pt-12">
                        <h3 className="text-slate-900 dark:text-white text-2xl font-bold w-full md:w-1/3 flex items-center gap-3"><LayoutTemplate className="text-[#38889F]" /> {t('projectDetails.context')}</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:w-2/3">{context}</p>
                    </div>
                )}

                {highlight && (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-t border-slate-100 dark:border-white/5 pt-12">
                        <h3 className="text-slate-900 dark:text-white text-2xl font-bold w-full md:w-1/3 flex items-center gap-3"><Sparkles className="text-[#38889F]" /> {language === 'en' ? 'Highlight' : 'O Destaque'}</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:w-2/3">{highlight}</p>
                    </div>
                )}

                {solution && (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-t border-slate-100 dark:border-white/5 pt-12">
                        <h3 className="text-slate-900 dark:text-white text-2xl font-bold w-full md:w-1/3 flex items-center gap-3"><Lightbulb className="text-[#38889F]" /> {language === 'en' ? 'The Solution' : 'A Solução'}</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:w-2/3">{solution}</p>
                    </div>
                )}

                {process && (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-t border-slate-100 dark:border-white/5 pt-12">
                        <h3 className="text-slate-900 dark:text-white text-2xl font-bold w-full md:w-1/3 flex items-center gap-3"><Zap className="text-[#38889F]" /> {t('projectDetails.process')}</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:w-2/3">{process}</p>
                    </div>
                )}

                {aesthetics && (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-t border-slate-100 dark:border-white/5 pt-12">
                        <h3 className="text-slate-900 dark:text-white text-2xl font-bold w-full md:w-1/3 flex items-center gap-3"><Palette className="text-[#38889F]" /> {language === 'en' ? 'The Aesthetics' : 'A Estética'}</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:w-2/3">{aesthetics}</p>
                    </div>
                )}

                {technique && (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start border-t border-slate-100 dark:border-white/5 pt-12">
                        <h3 className="text-slate-900 dark:text-white text-2xl font-bold w-full md:w-1/3 flex items-center gap-3"><MonitorSmartphone className="text-[#38889F]" /> {t('projectDetails.technique')}</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:w-2/3">{technique}</p>
                    </div>
                )}

            </section>

            {/* GALLERY & MEDIA PRESENTATION AREA */}
            <section className="w-full bg-slate-50 dark:bg-[#0a0a0c] pt-20 border-t border-slate-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-24 pb-24">

                    {/* Vídeo de apresentação com o botão do site por cima */}
                    {project.showcaseVideo && project.siteLink ? (
                        <div className="w-full relative rounded-[16px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-black">
                            <video
                                src={project.showcaseVideo}
                                poster={project.showcasePoster}
                                controls
                                playsInline
                                preload="metadata"
                                className="w-full h-auto block"
                            />
                            <a
                                href={project.siteLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${language === 'en' ? 'Visit site' : 'Visitar site'} ${title}`}
                                className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 h-9 rounded-[10px] bg-black/40 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium transition-colors duration-300 hover:bg-[#38889F] hover:border-[#38889F] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                {language === 'en' ? 'Visit site' : 'Visitar site'}
                                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            </a>
                        </div>
                    ) : project.siteLink ? (
                        <a
                            href={project.siteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${language === 'en' ? 'Visit site' : 'Visitar site'} ${title}`}
                            className="w-full relative group block rounded-[16px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#1e1e1e] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-[#38889F] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#38889F]"
                        >
                            <div className="flex items-center gap-3 px-4 h-11 border-b border-slate-200 dark:border-white/10">
                                <span className="flex gap-1.5" aria-hidden="true">
                                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                    <span className="w-3 h-3 rounded-full bg-green-400"></span>
                                </span>
                                <span className="flex-1 truncate text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 rounded-md px-3 py-1">
                                    {project.siteLink.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                </span>
                                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#38889F] transition-colors" aria-hidden="true" />
                            </div>
                            <div className="relative h-[70vh]">
                                {/* pointer-events-none: o clique vai para o link, não para o iframe */}
                                <iframe
                                    src={project.siteLink}
                                    title={title}
                                    loading="lazy"
                                    tabIndex={-1}
                                    className="w-full h-full pointer-events-none"
                                />
                                <div className="absolute inset-0 flex items-end md:items-center justify-center p-6 bg-black/0 group-hover:bg-black/40 transition-colors duration-300">
                                    <span className="inline-flex items-center gap-2 px-6 h-14 rounded-[16px] bg-[#38889F] text-white font-bold shadow-2xl transition-transform duration-300 group-hover:scale-105">
                                        {language === 'en' ? 'Visit site' : 'Visitar site'}
                                        <ExternalLink className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                        </a>
                    ) : project.gallery?.length > 0 ? (
                        project.gallery.map((media, idx) => (
                            <div key={idx} className="w-full relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-[#38889F]/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 -z-10 rounded-[16px]"></div>
                                <img
                                    src={media}
                                    alt={`${title} - ${language === 'en' ? 'View' : 'Visualização'} ${idx + 1}`}
                                    className="w-full h-auto rounded-[14px] shadow-2xl border border-slate-200 dark:border-white/10"
                                    loading={idx === 0 ? "eager" : "lazy"}
                                />
                            </div>
                        ))
                    ) : project.image ? (
                        <div className="w-full relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#38889F]/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-1000 -z-10 rounded-[16px]"></div>
                            <img
                                src={project.image}
                                alt={`Capa ${title}`}
                                className="w-full h-auto rounded-[14px] shadow-2xl border border-slate-200 dark:border-white/10"
                            />
                        </div>
                    ) : null}

                    {/* FIGMA / PROTOTYPE IFRAME */}
                    {project.figmaLink && (
                        <div className="w-full pt-12 border-t border-slate-100 dark:border-white/5 mx-6 max-w-6xl">
                            <div className="mb-12 text-center">
                                <h3 className="text-3xl text-slate-900 dark:text-white font-bold flex items-center justify-center gap-3"><MonitorPlay className="text-[#38889F]" /> {t('projectDetails.prototype')}</h3>
                                <p className="text-slate-600 dark:text-slate-500 mt-4 font-medium">{t('projectDetails.prototypeDesc')}</p>
                            </div>
                            <div className="w-full h-[80vh] bg-white dark:bg-[#1e1e1e] rounded-[16px] overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl p-2 md:p-4">
                                <iframe
                                    style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
                                    width="100%"
                                    height="100%"
                                    className="w-full h-full rounded-[14px]"
                                    src={project.figmaLink}
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* FOOTER CTA */}
            <section className="mt-32 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl text-slate-900 dark:text-white font-bold mb-6">{t('projectDetails.ctaTitle')}</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 font-medium">{t('projectDetails.ctaDesc')}</p>
                <Link to="/contato" className="w-full sm:w-auto inline-block">
                    <InteractiveHoverButton
                        text={t('projectDetails.ctaButton')}
                        className="w-full sm:w-auto bg-slate-900 text-white dark:bg-white dark:text-zinc-950 border-none px-10 py-5 text-lg"
                    />
                </Link>
            </section>

        </article>

        {/* Botão flutuante do link externo - Framer ou site publicado */}
        {(project.framerLink || project.siteLink) && (
            <div className="fixed bottom-6 right-24 z-[9998] flex items-center">
                <motion.a
                    href={project.framerLink || project.siteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 h-14 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 rounded-[16px] shadow-2xl hover:border-[#38889F] hover:text-[#38889F] text-slate-700 dark:text-white transition-colors font-bold"
                >
                    <ExternalLink className="w-5 h-5" />
                    <span>{language === 'en'
                        ? (project.framerLink ? 'View on Framer' : 'View website')
                        : (project.framerLink ? 'Ver no Framer' : 'Ver site')}
                    </span>
                </motion.a>
            </div>
        )}
        </>
    );
};

export default ProjectDetails;
