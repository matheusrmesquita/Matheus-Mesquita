import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import ProjectCard from '@/components/ui/ProjectCard';
import ArticleCard from '@/components/ui/ArticleCard';
import { projects } from '@/data/projects';
import { articles } from '@/data/articles';

const SELECTED_PROJECT_IDS = [15];
const SELECTED_ARTICLE_IDS = ['congresso', 'busca'];

const selectedProjects = SELECTED_PROJECT_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean);
const selectedArticles = SELECTED_ARTICLE_IDS.map((id) => articles.find((a) => a.id === id)).filter(Boolean);

const SelectedProjects = () => {
    const { t, language } = useLanguage();

    return (
        <div className="animate-in fade-in duration-700 pb-24 pt-16 md:pt-32">
            <section className="mx-4 md:mx-8 lg:mx-[150px]">
                <div className="grid grid-cols-12 gap-6 mb-12 items-end">
                    <div className="col-span-12 md:col-span-8">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                            {t('selectedProjects.title')}
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">
                            {t('selectedProjects.subtitle')}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {selectedProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <ProjectCard project={project} language={language} ctaLabel={t('projects.cardBtn')} />
                        </motion.div>
                    ))}
                    {selectedArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: (selectedProjects.length + index) * 0.05 }}
                        >
                            <ArticleCard article={article} index={index} language={language} ctaLabel={t('articles.readMore')} />
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SelectedProjects;
