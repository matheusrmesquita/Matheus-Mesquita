import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X, LayoutGrid, ChevronLeft, ChevronRight } from 'lucide-react';
import figmaLogo from '../assets/Figma.png';
import framerLogo from '../assets/framer_logo_icon_169149.webp';
import heroPortrait from '../assets/ChatGPT Image 7 de set. de 2026, 17_54_27.png';
import { EtheralShadow } from '@/components/ui/EtheralShadow';
import { useLanguage } from '@/context/LanguageContext';
import { projects } from '@/data/projects';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import ArticlesSection from '@/components/sections/ArticlesSection';
import ProjectCard from '@/components/ui/ProjectCard';
import TypewriterTitle from '@/components/ui/TypewriterTitle';

// Revelação por índice ao rolar — mesmo padrão usado no resto do site (Sobre, ArticlesSection)
const reveal = (i = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay: i * 0.08 },
});

// Slides da Hero — efeito de digitação da Hero da Brand, com nosso conteúdo (UX em primeiro plano)
const heroSlides = {
    pt: [
        {
            eyebrow: 'UX Design & Estratégia',
            lines: ['Design que resolve', 'problemas reais de', 'produto.'],
            description: 'Arquitetura de informação, fluxos e decisões de UX pensadas para reduzir fricção e aumentar conversão real.',
        },
        {
            eyebrow: 'Front-end Ágil',
            lines: ['Interfaces rápidas,', 'acessíveis e', 'bem construídas.'],
            description: 'React, Design Systems e componentização para transformar o design em produto funcional sem perder qualidade.',
        },
        {
            eyebrow: 'IA Aplicada a Produtos',
            lines: ['Tecnologia a serviço da', 'melhor experiência.'],
            description: 'Uso a Inteligência Artificial para acelerar prototipagem e decisões, sem nunca perder o foco na experiência do usuário.',
        },
    ],
    en: [
        {
            eyebrow: 'UX Design & Strategy',
            lines: ['Design that solves', 'real product', 'problems.'],
            description: 'Information architecture, flows and UX decisions built to reduce friction and increase real conversion.',
        },
        {
            eyebrow: 'Agile Front-end',
            lines: ['Fast, accessible', 'and well-built', 'interfaces.'],
            description: 'React, Design Systems and componentization to turn design into a working product without losing quality.',
        },
        {
            eyebrow: 'AI Applied to Products',
            lines: ['Technology serving the', 'best experience.'],
            description: 'I use Artificial Intelligence to speed up prototyping and decisions, without ever losing focus on user experience.',
        },
    ],
};

const Home = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const { t, language } = useLanguage();

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

    // Efeito de digitação da Hero (mesma lógica da Hero da Brand)
    const [heroSlideIndex, setHeroSlideIndex] = useState(0);
    const [heroTypedCount, setHeroTypedCount] = useState(0);
    const activeHeroSlides = heroSlides[language] || heroSlides.pt;
    const activeHeroSlide = activeHeroSlides[heroSlideIndex % activeHeroSlides.length];
    const activeHeroTotalChars = activeHeroSlide.lines.reduce((total, line) => total + line.length, 0);

    useEffect(() => {
        queueMicrotask(() => {
            setHeroSlideIndex(0);
            setHeroTypedCount(0);
        });
    }, [language]);

    useEffect(() => {
        let delay = 45;
        let nextAction = () => setHeroTypedCount(prev => prev + 1);

        if (heroTypedCount >= activeHeroTotalChars) {
            delay = 4600;
            nextAction = () => {
                setHeroSlideIndex(prev => (prev + 1) % activeHeroSlides.length);
                setHeroTypedCount(0);
            };
        }

        const timeout = window.setTimeout(nextAction, delay);
        return () => window.clearTimeout(timeout);
    }, [activeHeroTotalChars, language, activeHeroSlides.length, heroTypedCount]);

    return (
        <div className="animate-in fade-in duration-700">

            {/* SEÇÃO HERO — Mesclada: composição autoral (avatar + órbitas) em atmosfera full-bleed
                incorporada da estrutura da Brand (grão, feixes de luz respirando, eyebrow, scroll cue) */}
            <section id="hero" className="relative min-h-[90vh] md:min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black hero-grain pt-16 md:pt-32 pb-0 md:pb-28">

                {/* 1. O Grid de Fundo (Subtle Lines) — só no lado esquerdo, do topo até o fim do texto */}
                <div className="absolute left-0 top-0 w-full sm:w-[65%] md:w-[55%] h-[78%] sm:h-[72%] md:h-[68%] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_0%_0%,#000_55%,transparent_100%)] z-0"></div>

                {/* Foto de fundo — atrás dos ícones flutuantes e atrás da luz de fundo, proporcional à Hero
                    (largura E altura explícitas, sem "auto", pra não colapsar em nenhum navegador) */}
                <div className="hidden lg:block absolute right-0 sm:right-2 md:right-6 lg:right-[40px] xl:right-[80px] top-0 bottom-0 w-[85vw] sm:w-[68vw] md:w-[56vw] lg:w-[34vw] xl:w-[42vw] 2xl:w-[46vw] max-w-[780px] z-0 pointer-events-none select-none">
                    <img
                        src={heroPortrait}
                        alt=""
                        aria-hidden="true"
                        draggable={false}
                        className="absolute inset-0 w-full h-full object-cover object-[center_45%] opacity-90"
                    />
                    {/* Fade no topo pra se misturar com o fundo escuro — só nos ~15% finais, pra não "apagar" a cabeça */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent from-0% via-transparent via-85% to-black to-100%"></div>

                    {/* Ícones Orbitais Flutuantes — ancorados nos pontos do corpo medidos na foto (tamanhos variados) */}
                    {/* Figma — na altura da cabeça, ao lado esquerdo, sem tocar no cabelo/corpo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                        className="absolute top-[30%] left-[9%] z-20"
                    >
                        <div className="w-[70px] h-[70px] md:w-[84px] md:h-[84px] flex items-center justify-center rounded-[1.3rem] bg-[#2C2D2E]/80 backdrop-blur-md border border-white/10 shadow-2xl transform -rotate-12 animate-bounce" style={{ animationDuration: '4.5s' }}>
                            <img src={figmaLogo} alt="Figma Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-md" />
                        </div>
                    </motion.div>

                    {/* Framer — na borda entre o ombro/braço e o fundo, à esquerda */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                        className="absolute top-[72%] left-[22%] z-20 flex"
                    >
                        <div className="w-[56px] h-[56px] md:w-[68px] md:h-[68px] flex items-center justify-center rounded-[1.1rem] bg-[#F5F5F5] backdrop-blur-md border border-white/10 shadow-2xl transform rotate-6 animate-bounce" style={{ animationDuration: '4s' }}>
                            <img src={framerLogo} alt="Framer Logo" className="w-7 h-7 md:w-9 md:h-9 object-contain drop-shadow-md scale-110" />
                        </div>
                    </motion.div>

                    {/* Adobe Photoshop (Ps) — na borda entre as costas (trapézio) e o fundo, à direita */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
                        className="absolute top-[62%] right-[23%] z-20 flex"
                    >
                        <div className="w-[88px] h-[88px] md:w-[104px] md:h-[104px] flex items-center justify-center rounded-3xl bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl transform rotate-[15deg] animate-bounce" style={{ animationDuration: '3.8s' }}>
                            <span className="text-[#38889F] text-3xl md:text-4xl font-bold tracking-tighter" style={{ fontFamily: 'sans-serif' }}>Ps</span>
                        </div>
                    </motion.div>
                </div>

                {/* Feixes de luz atmosféricos respirando (estrutura da Brand, cores do portfólio: teal)
                    z-[5]: fica acima da foto mobile (z-0) e abaixo do texto/scroll (z-10) */}
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] h-[55%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(56,136,159,0.28)_0%,rgba(56,136,159,0.12)_30%,transparent_70%)] pointer-events-none animate-glow-breath z-[5]"></div>
                <div className="absolute bottom-[15%] right-[8%] w-[28%] h-[38%] bg-[radial-gradient(ellipse,rgba(56,136,159,0.10)_0%,transparent_65%)] pointer-events-none animate-glow-breath-accent z-[5]"></div>

                {/* Layout Principal da Hero (Chapéu + Ícones Flutuantes + Texto) — tudo alinhado à esquerda */}
                <div className="relative z-10 self-stretch flex flex-col items-start mx-4 md:mx-8 lg:mx-[150px] mt-4 mb-12">

                    {/* Chapéu (eyebrow) */}
                    <p className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-slate-400 mb-6 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38889F]"></span>
                        {t('hero.eyebrow')}
                    </p>

                    {/* Linha: Texto (esquerda) + Ícones Flutuantes (direita, centralizados ao texto) */}
                    <div className="w-full flex flex-col lg:flex-row items-center lg:items-center justify-between gap-10 lg:gap-6">

                        {/* 2. Texto — alinhado à esquerda */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative z-10 w-full max-w-md lg:max-w-sm xl:max-w-xl 2xl:max-w-4xl space-y-3 md:space-y-5 flex flex-col items-start text-left"
                        >
                            <motion.h1
                                key={`hero-headline-${language}-${heroSlideIndex}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.2] text-white text-left"
                            >
                                <TypewriterTitle lines={activeHeroSlide.lines} typedCount={heroTypedCount} />
                            </motion.h1>

                            <p className="text-base md:text-lg text-slate-400 font-medium max-w-2xl leading-relaxed text-pretty text-left">
                                {activeHeroSlide.description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto items-start sm:items-center">
                                <a href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                    <InteractiveHoverButton text={t('hero.ctaWork')} className="w-full sm:w-auto bg-[#38889F] border-[#38889F] text-white" />
                                </a>
                                <a href="#projects" className="w-full sm:w-auto flex sm:inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium text-slate-400 hover:text-white border-b border-zinc-800 hover:border-zinc-500 pb-1 transition-colors">
                                    {t('hero.ctaPortfolio')}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Foto + ícones — versão mobile/tablet, abaixo do texto, no fluxo normal (a versão de cima é só lg+).
                    Fica fora do grupo de texto (z-10) e em z-0, pra ficar ATRÁS do glow (z-5) e do scroll (z-10). */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="lg:hidden self-stretch relative z-0 mx-4 sm:mx-6 h-[78vh] sm:h-[82vh] mt-4 mb-0 rounded-2xl overflow-hidden"
                >
                        <img
                            src={heroPortrait}
                            alt=""
                            aria-hidden="true"
                            draggable={false}
                            className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent from-0% via-transparent via-85% to-black to-100%"></div>

                        {/* Figma — na altura da cabeça, à esquerda */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                            className="absolute top-[18%] left-[8%] z-20"
                        >
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-[1rem] bg-[#2C2D2E]/80 backdrop-blur-md border border-white/10 shadow-2xl transform -rotate-12 animate-bounce" style={{ animationDuration: '4.5s' }}>
                                <img src={figmaLogo} alt="Figma Logo" className="w-6 h-6 sm:w-7 sm:h-7 object-contain drop-shadow-md" />
                            </div>
                        </motion.div>

                        {/* Framer — borda ombro/braço e fundo, à esquerda */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                            className="absolute top-[58%] left-[20%] z-20 flex"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-[0.9rem] bg-[#F5F5F5] backdrop-blur-md border border-white/10 shadow-2xl transform rotate-6 animate-bounce" style={{ animationDuration: '4s' }}>
                                <img src={framerLogo} alt="Framer Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain drop-shadow-md scale-110" />
                            </div>
                        </motion.div>

                        {/* Ps — borda costas/trapézio e fundo, à direita */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}
                            className="absolute top-[48%] right-[20%] z-20 flex"
                        >
                            <div className="w-16 h-16 sm:w-[70px] sm:h-[70px] flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 shadow-2xl transform rotate-[15deg] animate-bounce" style={{ animationDuration: '3.8s' }}>
                                <span className="text-[#38889F] text-2xl font-bold tracking-tighter" style={{ fontFamily: 'sans-serif' }}>Ps</span>
                            </div>
                        </motion.div>
                    </motion.div>

                {/* Scroll cue (estrutura incorporada da Brand) */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none select-none" aria-hidden="true">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500 rotate-180" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
                    <span className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"></span>
                </div>
            </section>

            {/* Faixa de Marquee — estrutura incorporada da Brand, conteúdo próprio (competências) */}
            <div className="w-full border-t border-b border-slate-200 dark:border-white/10 py-4 md:py-5 overflow-hidden bg-slate-50 dark:bg-zinc-950 mb-16 md:mb-24" aria-hidden="true">
                <div className="marquee-track-scroll">
                    {[...Array(2)].map((_, i) => (
                        <React.Fragment key={i}>
                            {["UX Engineering", "Front-end Ágil", "IA Aplicada", "Design Systems", "Figma", "Framer", "React"].map((skill, index) => (
                                <div key={`${i}-${index}`} className="flex items-center gap-6 md:gap-14 pr-6 md:pr-14 text-sm font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-600 whitespace-nowrap">
                                    {skill}
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#38889F] flex-shrink-0"></div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Seção de Projetos - Grid Simples (6 projetos mais recentes) */}
            <section id="projects" className="scroll-mt-32 mx-4 md:mx-8 lg:mx-[150px]">
                <div className="grid grid-cols-12 gap-6 mb-8 md:mb-12 items-end">
                    <div className="col-span-12 md:col-span-8">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900 dark:text-white">{t('projects.title')}</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">{t('projects.subtitle')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.slice(0, 6).map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <ProjectCard project={project} language={language} ctaLabel={t('projects.cardBtn')} />
                        </motion.div>
                    ))}
                </div>

                {/* Ver todos os projetos Button */}
                {projects.length > 6 && (
                    <div className="mt-12 flex justify-center">
                        <Link to="/projetos" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-zinc-800 hover:bg-[#38889F] hover:text-white text-slate-900 dark:text-white font-bold rounded transition-all duration-300 border border-slate-200 dark:border-white/10 hover:border-[#38889F] group/btn">
                            {t('projects.viewAll')}
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )}
            </section>

            {/* Seção de Artigos */}
            <ArticlesSection />

            {/* CTA Section (Footer CTA) — atmosfera da Brand (grão, glow, EtheralShadow),
                cores do portfólio. Conteúdo estático por enquanto — a ser reestruturada. */}
            <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex flex-col justify-center overflow-hidden bg-black hero-grain mt-24 py-20 md:py-28">

                {/* Grid de fundo sutil (igual à Hero) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] z-0"></div>

                {/* Feixes de luz atmosféricos respirando (mesma paleta teal da Hero) */}
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] h-[55%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(56,136,159,0.24)_0%,rgba(56,136,159,0.12)_30%,transparent_75%)] pointer-events-none animate-glow-breath z-0"></div>
                <div className="absolute bottom-[20%] left-[15%] w-[30%] h-[40%] bg-[radial-gradient(ellipse,rgba(56,136,159,0.09)_0%,transparent_65%)] pointer-events-none animate-glow-breath-accent z-0"></div>

                {/* Etheral Shadow Background (movido da Hero) */}
                <EtheralShadow
                    sizing="fill"
                    color="rgba(56, 136, 159, 0.4)"
                    animation={{ scale: 100, speed: 90 }}
                    noise={{ opacity: 1, scale: 1.2 }}
                />

                <div className="relative z-10 w-full mx-4 md:mx-8 lg:mx-[150px]">
                    <motion.p {...reveal(0)} className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-slate-400 mb-6 select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38889F]"></span>
                        {t('hero.eyebrow')}
                    </motion.p>

                    <motion.h2 {...reveal(1)} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1] text-white" dangerouslySetInnerHTML={{ __html: t('cta.title') }}></motion.h2>
                    <motion.p {...reveal(2)} className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl font-medium leading-relaxed">
                        {t('cta.description')}
                    </motion.p>

                    <motion.div {...reveal(3)} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <a href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <InteractiveHoverButton text={t('cta.button')} className="w-full sm:w-auto bg-[#38889F] border-[#38889F] text-white text-sm sm:text-base px-5 sm:px-8 py-4" />
                        </a>
                        <a href="#projects" className="w-full sm:w-auto flex sm:inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-medium text-slate-400 hover:text-white border-b border-zinc-800 hover:border-zinc-500 pb-1 transition-colors">
                            {t('hero.ctaPortfolio')}
                        </a>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};

export default Home;
