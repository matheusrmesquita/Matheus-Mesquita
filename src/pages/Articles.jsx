import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import FilterBar from '@/components/ui/FilterBar';
import MixedCardGrid from '@/components/ui/MixedCardGrid';
import ArticleCard from '@/components/ui/ArticleCard';
import { useFilteredContent } from '@/hooks/useFilteredContent';

const Articles = () => {
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
        filteredArticles,
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
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-[#38889F]/10 rounded-2xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-[#38889F]" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {t('articles.title') || 'Todos os Artigos'}
                            </h1>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">
                            {t('articles.subtitle') || 'Explore o acervo completo de reflexões e estudos de caso.'}
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
                        {filteredArticles.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-xl text-slate-500 dark:text-slate-400">{t('search.noArticles')}</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredArticles.map((article, index) => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <ArticleCard article={article} index={index} language={language} ctaLabel={t('articles.readMore')} />
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

export default Articles;
