import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, BookOpen, Layers, Target, Users, ClipboardList, AlertCircle,
    Eye, Palette, Cpu, ClipboardCheck, CheckCircle2, Rocket, Lightbulb, Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { articleCongressoContent } from '@/data/articleCongressoContent';
import ArticleTOC from '@/components/ui/ArticleTOC';

const ICONS = { Layers, Target, Users, ClipboardList, AlertCircle, Eye, Palette, Cpu, ClipboardCheck, CheckCircle2, Rocket, Lightbulb };

const PARA_CLASS = 'text-lg md:text-xl text-pretty font-medium opacity-90';

// Divide um texto em partes normais e em **negrito**, sem precisar de markdown completo.
const renderInline = (text) => {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
};

// Render genérico dos blocos de conteúdo (parágrafo, lista, subtítulos, chips de pergunta,
// citação em destaque) — evita repetir manualmente o JSX de cada um dos 12 tópicos do artigo.
const renderBlock = (block, i) => {
    switch (block.type) {
        case 'p':
            return <p key={i} className={PARA_CLASS}>{renderInline(block.text)}</p>;

        case 'list':
            return (
                <ul key={i} className="space-y-2 my-6">
                    {block.items.map((item, idx) => (
                        <li key={idx} className={`flex items-start gap-3 ${PARA_CLASS}`}>
                            <span className="mt-3 w-1.5 h-1.5 rounded-full bg-[#38889F] shrink-0" />
                            {renderInline(item)}
                        </li>
                    ))}
                </ul>
            );

        case 'subheads':
            return (
                <div key={i} className="space-y-4 my-8">
                    {block.items.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-5 rounded-xl">
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                            <p className="text-base text-slate-600 dark:text-slate-400 font-medium m-0">{item.desc}</p>
                        </div>
                    ))}
                </div>
            );

        case 'chips':
            return (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3 my-8">
                    {block.items.map((q, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 p-4 rounded-xl">
                            <span className="font-bold text-slate-950 dark:text-slate-100 leading-snug">{q}</span>
                        </div>
                    ))}
                </div>
            );

        case 'quote':
            return (
                <div key={i} className="bg-slate-50 dark:bg-slate-900/40 border-l-4 border-[#38889F] p-6 rounded-r-2xl my-8 space-y-1">
                    {block.lines.map((line, idx) => (
                        <p key={idx} className="text-lg md:text-xl font-bold text-slate-900 dark:text-white italic m-0 text-pretty">
                            {renderInline(line)}
                        </p>
                    ))}
                </div>
            );

        default:
            return null;
    }
};

const ArticleCongresso = () => {
    const { language } = useLanguage();
    const c = articleCongressoContent[language] || articleCongressoContent.pt;

    const tocLabel = language === 'en' ? 'In this article' : 'Neste artigo';
    const sections = c.sections.map((s) => ({ id: s.id, label: s.title }));

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-24 pb-24 mx-4 md:mx-8 lg:mx-[150px] min-h-screen"
        >
            <div className="max-w-6xl mx-auto">

                {/* Back Button */}
                <Link
                    to="/#artigos"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[#38889F] transition-colors mb-8 font-medium group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    {c.back}
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-start gap-x-12">
                    <ArticleTOC sections={sections} label={tocLabel} />
                    <div className="min-w-0 flex-1 max-w-4xl">

                        {/* Article Header */}
                        <header className="mb-12">
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#2B6D80] dark:text-[#5FB4CC] font-semibold text-sm tracking-wide uppercase w-max">
                                    <BookOpen className="w-4 h-4" />
                                    {c.tags[0]}
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#2B6D80] dark:text-[#5FB4CC] font-semibold text-sm tracking-wide uppercase w-max">
                                    {c.tags[1]}
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#2B6D80] dark:text-[#5FB4CC] font-semibold text-sm tracking-wide uppercase w-max">
                                    {c.tags[2]}
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#38889F]/10 text-[#2B6D80] dark:text-[#5FB4CC] font-semibold text-sm tracking-wide uppercase w-max">
                                    <Lock className="w-4 h-4" />
                                    {language === 'en' ? 'Confidential Client' : 'Cliente Confidencial'}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6 text-balance">
                                {c.title}
                            </h1>
                        </header>

                        {/* Article Body */}
                        <article className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-350 space-y-8 leading-[1.9]">
                            {c.intro.map(renderBlock)}

                            {c.sections.map((section) => {
                                const Icon = ICONS[section.icon];
                                return (
                                    <section key={section.id} id={section.id} className="space-y-7 pt-20 border-t border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-3">
                                            {Icon && <Icon className="w-7 h-7 text-[#38889F]" />}
                                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white m-0">
                                                {section.title}
                                            </h2>
                                        </div>
                                        {section.blocks.map(renderBlock)}
                                    </section>
                                );
                            })}
                        </article>

                    </div>
                </div>

            </div>
        </motion.div>
    );
};

export default ArticleCongresso;
