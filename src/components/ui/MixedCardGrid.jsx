import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import { ArrowRight } from 'lucide-react';

const MixedCardGrid = ({ items, language, t }) => {
    if (!items || items.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-slate-500 dark:text-slate-400">
                    Nenhum resultado encontrado com os filtros atuais.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => {
                if (item.type === 'project') {
                    const projectTitle = language === 'en' && item.title_en ? item.title_en : item.title;
                    const displayTags = item.tags?.filter(t => t !== "Landing Page") || [];

                    return (
                        <motion.div
                            key={`project-${item.id}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="h-full"
                        >
                            <Link to={`/projetos/${item.id}`} className="group block h-full w-full outline-none focus-visible:ring-4 focus-visible:ring-[#38889F] rounded-[16px]">
                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[16px] p-4 h-full flex flex-col transition-all duration-500 hover:border-[#38889F] hover:shadow-2xl hover:shadow-[#38889F]/10 group/card relative overflow-hidden">
                                    {/* Badge identificador */}
                                    <div className="absolute top-6 left-6 z-10">
                                        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                                            Projeto
                                        </span>
                                    </div>
                                    <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden mb-5 relative bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
                                        <img
                                            src={item.image}
                                            alt={projectTitle}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 pointer-events-none"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                    </div>

                                    <div className="flex-grow flex flex-col">
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover/card:text-[#38889F] transition-colors leading-tight mb-4">
                                                {projectTitle}
                                            </h3>

                                            <div className="flex flex-wrap gap-2">
                                                {displayTags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 rounded-full border border-slate-200 dark:border-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {displayTags.length > 3 && (
                                                    <span className="px-3 py-1 text-[11px] font-semibold tracking-wider uppercase bg-slate-50 dark:bg-zinc-900/50 text-slate-500 dark:text-slate-500 rounded-full border border-slate-200 dark:border-white/5">
                                                        +{displayTags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <InteractiveHoverButton
                                                text={t('projects.cardBtn') || 'Ver detalhes'}
                                                className="w-full bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white group-hover/card:bg-[#38889F] group-hover/card:border-[#38889F] group-hover/card:text-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                } else {
                    return (
                        <motion.div
                            key={`article-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <Link 
                                to={item.slug}
                                className="group flex flex-col justify-between h-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[20px] p-8 transition-all duration-500 hover:border-[#38889F]/50 hover:shadow-2xl hover:shadow-[#38889F]/10 overflow-hidden relative"
                            >
                                {/* Badge identificador */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span className="bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/5">
                                        Artigo
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-[#38889F]/0 to-[#38889F]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="mt-4">
                                    <div className="flex gap-2 mb-6">
                                        {item.tags?.map(tag => (
                                            <span key={tag} className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 font-semibold text-[11px] tracking-wider uppercase group-hover:bg-[#38889F]/10 group-hover:text-[#38889F] transition-colors border border-slate-200 dark:border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight mb-4 group-hover:text-[#38889F] transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-8">
                                        {item.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-[#38889F] font-bold text-sm mt-auto group-hover:translate-x-2 transition-transform duration-300 w-max">
                                    Ler artigo completo
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </motion.div>
                    );
                }
            })}
        </div>
    );
};

export default MixedCardGrid;
