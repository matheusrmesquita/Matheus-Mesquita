import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import SocialLinks from '@/components/ui/SocialLinks';
import { ClaudeIcon, OpenAiIcon, GeminiIcon } from '@/components/ui/AiToolIcons';
import sobreFoto from '../assets/sobre-foto.png';

// Revelação por índice — mesmo padrão usado no resto do site (ArticlesSection, grade de Projetos)
const reveal = (i = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.5, delay: i * 0.08 },
});

const Sobre = () => {
    const { t } = useLanguage();

    return (
        // Site é sempre escuro agora (sem toggle de tema) — página segue a mesma identidade
        // overflow-hidden aqui é a trava de segurança: o topo desta div já cai exatamente onde
        // o padding-top do <main> (App.jsx) termina, ou seja, na linha de baixo da navbar fixa.
        // Então nada que suba (ex: a foto com -top negativo) consegue vazar por cima do header.
        <div className="relative w-full bg-black flex-1 flex flex-col overflow-hidden">

            {/* Grid de fundo sutil — mesma técnica da Hero, só no lado esquerdo, do topo até o fim do texto */}
            <div className="absolute left-0 top-0 w-full sm:w-[65%] md:w-[55%] h-[60%] sm:h-[55%] md:h-[50%] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_100%_100%_at_0%_0%,#000_55%,transparent_100%)] z-0 pointer-events-none"></div>

            <div className="relative z-10 mx-4 md:mx-8 lg:mx-[150px] pt-10 md:pt-14 flex-1 flex flex-col">
                <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-16 flex-1">

                    {/* Coluna esquerda — texto corrido, no espírito da referência */}
                    <div>
                        <motion.p {...reveal(0)} className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-slate-400 mb-4 select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#38889F]"></span>
                            {t('hero.eyebrow')}
                        </motion.p>
                        <motion.h1 {...reveal(1)} className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                            {t('about.title')}
                        </motion.h1>

                        <motion.div {...reveal(2)} className="space-y-4 text-slate-300 leading-relaxed max-w-xl">
                            <p>{t('about.intro')}</p>
                            <p>{t('about.daily')}</p>
                            <p>{t('about.closing')}</p>
                        </motion.div>

                        <motion.div {...reveal(3)} className="flex flex-wrap items-center gap-8 mt-10">
                            <a href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80" target="_blank" rel="noopener noreferrer">
                                <InteractiveHoverButton text={t('hero.ctaWork')} className="bg-[#38889F] border-[#38889F] text-white" />
                            </a>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">{t('about.connect')}</p>
                                <SocialLinks className="-ml-2" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Coluna direita — foto grande. Em lg, sai do fluxo do grid (absolute) para poder
                        subir mais perto do header mantendo o fundo sempre colado na mesma linha do rodapé.
                        O overflow-hidden da div raiz da página corta qualquer parte que suba além da navbar. */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full max-w-lg mx-auto lg:mx-0 aspect-[3/4] lg:aspect-auto lg:absolute lg:-top-16 xl:-top-24 lg:bottom-0 lg:right-8 xl:right-12 min-[1920px]:right-[calc(25%-17rem)] lg:w-[calc(50%-4rem)] lg:max-w-lg rounded-2xl overflow-hidden"
                    >
                        <img
                            src={sobreFoto}
                            alt="Matheus Mesquita"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />

                        {/* Badges das IAs usadas no fluxo de trabalho — mesma técnica de âncora da Hero,
                            posicionadas nos cantos "vazios" (fundo preto) da foto, sem cobrir o rosto */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                            className="absolute top-[18%] left-[6%] z-20"
                        >
                            <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 shadow-2xl transform -rotate-12 animate-bounce" style={{ animationDuration: '4.5s' }}>
                                <ClaudeIcon className="w-7 h-7 md:w-8 md:h-8 text-[#D97757]" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                            className="absolute top-[42%] right-[7%] z-20"
                        >
                            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-md border border-white/10 shadow-2xl transform rotate-6 animate-bounce" style={{ animationDuration: '4s' }}>
                                <GeminiIcon gradientId="gemini-grad-sobre" className="w-6 h-6 md:w-7 md:h-7" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }}
                            className="absolute bottom-[8%] left-[10%] z-20"
                        >
                            <div className="w-16 h-16 md:w-[72px] md:h-[72px] flex items-center justify-center rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl transform rotate-[14deg] animate-bounce" style={{ animationDuration: '3.8s' }}>
                                <OpenAiIcon className="w-8 h-8 md:w-9 md:h-9 text-white" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Sobre;
