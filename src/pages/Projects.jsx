import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Search } from 'lucide-react';
import FilterBar from '@/components/ui/FilterBar';
import MixedCardGrid from '@/components/ui/MixedCardGrid';
import ProjectCard from '@/components/ui/ProjectCard';
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
        <div className="animate-in fade-in duration-700 pb-24 pt-16 md:pt-32">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <ProjectCard project={project} language={language} ctaLabel={t('projects.cardBtn') || 'Ver detalhes'} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default Projects;
