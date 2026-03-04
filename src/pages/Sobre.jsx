import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Zap } from 'lucide-react';

const Sobre = () => {
    const { t } = useLanguage();

    const backgroundItems = [
        { labelKey: 'about.backgroundItem1Label', textKey: 'about.backgroundItem1' },
        { labelKey: 'about.backgroundItem2Label', textKey: 'about.backgroundItem2' },
        { labelKey: 'about.backgroundItem3Label', textKey: 'about.backgroundItem3' },
    ];

    const methodologyItems = [
        { labelKey: 'about.methodologyItem1Label', textKey: 'about.methodologyItem1' },
        { labelKey: 'about.methodologyItem2Label', textKey: 'about.methodologyItem2' },
        { labelKey: 'about.methodologyItem3Label', textKey: 'about.methodologyItem3' },
        { labelKey: 'about.methodologyItem4Label', textKey: 'about.methodologyItem4' },
    ];

    return (
        <div className="py-16 mx-4 md:mx-8 lg:mx-[150px] animate-in fade-in duration-500">
            {/* Cabeçalho de Perfil */}
            <div className="mb-16 max-w-4xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                    {t('about.title')}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                        {t('about.titleHighlight')}
                    </span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    {t('about.description')}
                </p>
            </div>

            {/* Grid de Cards de Expertise */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* Card 1 — Background & Gestão */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-8 rounded-[16px] flex flex-col gap-6 hover:border-[#38889F]/40 hover:shadow-lg hover:shadow-[#38889F]/5 transition-all duration-300">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {t('about.backgroundTitle')}
                    </h2>
                    <ul className="flex flex-col gap-5">
                        {backgroundItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#38889F] mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm mb-0.5">
                                        {t(item.labelKey)}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {t(item.textKey)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Card 2 — Metodologia Técnica */}
                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 p-8 rounded-[16px] flex flex-col gap-6 hover:border-[#38889F]/40 hover:shadow-lg hover:shadow-[#38889F]/5 transition-all duration-300">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {t('about.methodologyTitle')}
                    </h2>
                    <ul className="flex flex-col gap-5">
                        {methodologyItems.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm mb-0.5">
                                        {t(item.labelKey)}
                                    </p>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                        {t(item.textKey)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sobre;
