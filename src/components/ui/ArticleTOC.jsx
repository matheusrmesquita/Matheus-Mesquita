import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Menu lateral (índice) dos artigos: sticky no desktop com indicador animado
// seguindo a seção visível (scrollspy via IntersectionObserver); no mobile vira
// um dropdown nativo (<details>), sem JS extra para abrir/fechar.
const ArticleTOC = ({ sections, label = 'Neste artigo' }) => {
    const [activeId, setActiveId] = useState(sections[0]?.id);

    useEffect(() => {
        const elements = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActiveId(visible[0].target.id);
            },
            { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const items = sections.map((s) => {
        const isActive = s.id === activeId;
        return (
            <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`relative w-full text-left text-sm py-2 pl-4 transition-colors ${
                    isActive
                        ? 'text-[#38889F] font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
                }`}
            >
                {isActive && (
                    <motion.span
                        layoutId="toc-active-indicator"
                        className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-[#38889F]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                )}
                {s.label}
            </button>
        );
    });

    return (
        <>
            {/* Mobile: índice recolhível nativo */}
            <details className="group lg:hidden mb-10 bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-2xl p-4">
                <summary className="cursor-pointer font-bold text-slate-900 dark:text-white flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
                    {label}
                    <span className="text-[#38889F] transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <nav className="mt-4 border-l border-slate-200 dark:border-slate-800">{items}</nav>
            </details>

            {/* Desktop: sidebar sticky */}
            <aside className="hidden xl:block sticky top-28 self-start w-56 shrink-0">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 block">
                    {label}
                </span>
                <nav className="border-l border-slate-200 dark:border-slate-800">{items}</nav>
            </aside>
        </>
    );
};

export default ArticleTOC;
