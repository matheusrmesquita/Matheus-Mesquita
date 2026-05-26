import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';
import { Search } from 'lucide-react';
import FilterBar from '@/components/ui/FilterBar';
import MixedCardGrid from '@/components/ui/MixedCardGrid';
import { useFilteredContent } from '@/hooks/useFilteredContent';

const Projects = () => {
    const { t, language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        yearTags,
        categoryTags,
        isFilterActive,
        filteredProjects,
        combinedResults
    } = useFilteredContent(searchQuery, selectedTags, language);

    const toggleTag = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSelectedTags([]);
        setSearchQuery('');
    };

    return (
        <div className="animate-in fade-in duration-700 pb-24 pt-32">
            <section className="mx-4 md:mx-8 lg:mx-[150px]">
                <div className="grid grid-cols-12 gap-6 mb-12 items-end">
                    <div className="col-span-12 md:col-span-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                            {t('projects.title')}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">
                            {t('projects.subtitle')}
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 rounded-2xl p-4 md:p-6 mb-12 flex flex-col gap-6 relative z-30">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('search.placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-[#38889F] transition-colors"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                            >
                                {t('search.clear')}
                            </button>
                        )}
                    </div>

                    <FilterBar 
                        yearTags={yearTags} 
                        categoryTags={categoryTags} 
                        selectedTags={selectedTags} 
                        toggleTag={toggleTag} 
                        clearFilters={clearFilters} 
                        searchQuery={searchQuery} 
                    />
                </div>

                {isFilterActive ? (
                    <MixedCardGrid items={combinedResults} language={language} t={t} />
                ) : (
                    <>
                        {filteredProjects.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-slate-500 dark:text-slate-400">{t('search.noProjects')}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                                {filteredProjects.map((project, index) => {
                                    const projectTitle = language === 'en' && project.title_en ? project.title_en : project.title;
                                    const displayTags = project.tags?.filter(t => t !== "Landing Page") || [];

                                    return (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            className="h-full"
                                        >
                                            <Link to={`/projetos/${project.id}`} className="group block h-full w-full outline-none focus-visible:ring-4 focus-visible:ring-[#38889F] rounded-[16px]">
                                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 rounded-[16px] p-4 h-full flex flex-col transition-all duration-500 hover:border-[#38889F] hover:shadow-2xl hover:shadow-[#38889F]/10 group/card relative overflow-hidden">
                                                    <div className="w-full aspect-[4/3] rounded-[14px] overflow-hidden mb-5 relative bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
                                                        <img
                                                            src={project.image}
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
                                })}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default Projects;
