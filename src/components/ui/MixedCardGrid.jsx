import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/ui/ProjectCard';
import ArticleCard from '@/components/ui/ArticleCard';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => {
                if (item.type === 'project') {
                    return (
                        <motion.div
                            key={`project-${item.id}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="relative"
                        >
                            {/* Badge identificador */}
                            <div className="absolute top-3 left-3 z-20 pointer-events-none">
                                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                                    Projeto
                                </span>
                            </div>
                            <ProjectCard project={item} language={language} ctaLabel={t('projects.cardBtn') || 'Ver detalhes'} />
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
                            className="relative"
                        >
                            {/* Badge identificador */}
                            <div className="absolute top-3 left-3 z-20 pointer-events-none">
                                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                                    Artigo
                                </span>
                            </div>
                            <ArticleCard article={item} index={index} language={language} ctaLabel={t('articles.readMore') || 'Ler artigo completo'} />
                        </motion.div>
                    );
                }
            })}
        </div>
    );
};

export default MixedCardGrid;
