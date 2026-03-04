import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowRight, Mail, X, LayoutGrid } from 'lucide-react';
import profileImage from '../assets/1758815017641.png';
import figmaLogo from '../assets/Figma.png';
import framerLogo from '../assets/framer_logo_icon_169149.webp';
import { EtheralShadow } from '@/components/ui/EtheralShadow';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

const Home = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const { t, language } = useLanguage();

    const openModal = (project) => {
        setSelectedProject(project);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    useEffect(() => {
        if (selectedProject !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedProject]);

    return (
        <div className="animate-in fade-in duration-700 pb-24">

            {/* SEÇÃO HERO - ESTILO REFERÊNCIA (Feixe de Luz + Grid + Avatar na Base) */}
            <section className="relative mt-20 md:mt-24 mx-4 md:mx-8 lg:mx-[150px] mb-16 md:mb-24 min-h-[85vh] flex flex-col items-center justify-start overflow-hidden bg-zinc-950 dark:bg-black rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-white/5 pt-24 md:pt-32">

                {/* 1. O Grid de Fundo (Subtle Lines) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_100%)] z-10"></div>

                {/* Etheral Shadow Background */}
                <EtheralShadow
                    sizing="fill"
                    color="rgba(56, 136, 159, 0.4)"
                    animation={{ scale: 100, speed: 90 }}
                    noise={{ opacity: 1, scale: 1.2 }}
                />

                {/* Layout Principal da Hero (Imagem Superior, Texto Inferior) */}
                <div className="relative z-10 w-full flex flex-col items-center mt-12 mb-12">

                    {/* 1. Avatar na Parte Superior */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-64 md:w-80 lg:w-[350px] aspect-square flex items-center justify-center mb-10"
                    >
                        {/* Facho de Luz Teal Centrado (Atrás do Avatar) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[160%] bg-gradient-to-t from-[#38889F] to-transparent opacity-30 blur-[60px] z-0 pointer-events-none rounded-full"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-[#38889F] opacity-40 blur-[80px] z-0 rounded-full pointer-events-none mix-blend-screen"></div>

                        {/* Avatar com Bordas Arredondadas (Estilo Portfólio Moderno) */}
                        <img
                            src={profileImage}
                            alt="Matheus Mesquita"
                            className="w-full h-full object-cover rounded-full border border-white/10 relative z-10 shadow-2xl bg-zinc-900 pointer-events-none"
                        />

                        {/* Ícones Orbitais Flutuantes (Estilo Glass Escuro Minimalista) */}
                        {/* Figma */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                            className="absolute top-[10%] left-[-10%] md:left-[-15%] z-20"
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-[1.3rem] bg-[#2C2D2E]/80 backdrop-blur-md border border-white/10 shadow-2xl transform -rotate-12 animate-bounce" style={{ animationDuration: '4.5s' }}>
                                <img src={figmaLogo} alt="Figma Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md" />
                            </div>
                        </motion.div>

                        {/* Framer Oficial */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                            className="absolute bottom-[10%] left-[-5%] md:left-[-10%] z-20 flex"
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-[1.3rem] bg-[#F5F5F5] backdrop-blur-md border border-white/10 shadow-2xl transform rotate-6 animate-bounce" style={{ animationDuration: '4s' }}>
                                <img src={framerLogo} alt="Framer Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md scale-110" />
                            </div>
                        </motion.div>

                        {/* Adobe Photoshop (Ps) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
                            className="absolute top-[20%] right-[-10%] md:right-[-15%] z-20 flex"
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-3xl bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl transform rotate-[15deg] animate-bounce" style={{ animationDuration: '3.8s' }}>
                                <span className="text-[#31A8FF] text-2xl font-bold tracking-tighter" style={{ fontFamily: 'sans-serif' }}>Ps</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* 2. Texto Inferior Centralizado */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 space-y-6 md:space-y-8 flex flex-col items-center text-center mt-2"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] text-white">
                            {t('hero.greeting')}<br className="hidden md:block" />
                            <span className="md:hidden"> </span>
                            {t('hero.role')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">{t('hero.roleHighlight')}</span>
                        </h1>

                        <p className="text-base md:text-lg lg:text-xl text-slate-400 font-medium max-w-3xl lg:max-w-4xl leading-relaxed text-pretty">
                            {t('hero.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto items-center">
                            <a href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer">
                                <InteractiveHoverButton text={t('hero.ctaWork')} className="bg-[#38889F] border-[#38889F] text-white" />
                            </a>
                            <a href="#projects">
                                <InteractiveHoverButton text={t('hero.ctaPortfolio')} className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Seção de Projetos - Master Grid */}
            <section id="projects" className="scroll-mt-32 mx-4 md:mx-8 lg:mx-[150px]">
                <div className="grid grid-cols-12 gap-6 mb-12">
                    <div className="col-span-12 md:col-span-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">{t('projects.title')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">{t('projects.subtitle')}</p>
                    </div>
                </div>

                {/* Sub-grid para os cards dentro das 12 colunas mestre */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {projects.map((project, index) => {
                        const title = language === 'en' ? project.title_en : project.title;

                        // Shared card style format
                        const cardContent = (
                            <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[16px] p-4 h-full flex flex-col transition-all duration-500 hover:border-[#38889F] hover:shadow-2xl hover:shadow-[#38889F]/10 group/card relative overflow-hidden">
                                {/* Imagem Cover Tumb */}
                                <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden mb-5 relative bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
                                    <img
                                        src={project.image}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />
                                    {/* Overlay sutil na imagem */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                <div className="flex-grow flex flex-col">
                                    <div className="mb-6">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover/card:text-[#38889F] transition-colors leading-tight mb-4">
                                            {title}
                                        </h3>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags?.slice(0, 3).map((tag, i) => (
                                                <span key={i} className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags?.length > 3 && (
                                                <span className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase bg-slate-50 dark:bg-zinc-900/50 text-slate-500 dark:text-slate-500 rounded-full border border-slate-200 dark:border-white/5">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <InteractiveHoverButton
                                            text={t('projects.cardBtn')}
                                            className="w-full bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white group-hover/card:bg-[#38889F] group-hover/card:border-[#38889F] group-hover/card:text-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        );

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <Link to={`/projetos/${project.id}`} className="group block h-full w-full outline-none focus-visible:ring-4 focus-visible:ring-[#38889F] rounded-[16px]">
                                    {cardContent}
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section (Footer CTA) - Master Grid wrapper */}
            <section className="mx-4 md:mx-8 lg:mx-[150px] mt-24">
                <div className="relative overflow-hidden rounded-[16px] bg-gradient-to-br from-slate-100 to-white dark:from-zinc-900 dark:to-black border border-slate-200 dark:border-white/5 shadow-2xl">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="p-10 md:p-20 relative z-10 flex flex-col col-span-12 items-center text-center">
                        <div className="w-20 h-20 bg-orange-100 dark:bg-orange-500/10 rounded-3xl flex items-center justify-center mb-8 rotate-3">
                            <Mail className="w-10 h-10 text-orange-500 -rotate-3" />
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white" dangerouslySetInnerHTML={{ __html: t('cta.title') }}></h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl font-medium">
                            {t('cta.description')}
                        </p>
                        <a href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer">
                            <InteractiveHoverButton
                                text={t('cta.button')}
                                className="bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-none px-10 py-5 text-lg"
                            />
                        </a>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Home;
