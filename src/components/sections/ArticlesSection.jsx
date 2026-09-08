import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { articles } from '@/data/articles';
import ArticleCard from '@/components/ui/ArticleCard';
import { useLanguage } from '@/context/LanguageContext';

const ArticlesSection = () => {
    const { language } = useLanguage();
    return (
        <section className="mx-4 md:mx-8 lg:mx-[150px] mt-24 scroll-mt-32" id="artigos">
            <div className="grid grid-cols-12 gap-6 mb-12">
                <div className="col-span-12 md:col-span-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-[#38889F]/10 rounded-2xl flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-[#38889F]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">Artigos de Projetos</h2>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">Reflexões e estudos de caso sobre design e arquitetura da informação.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.slice(0, 3).map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <ArticleCard article={article} index={index} language={language} />
                    </motion.div>
                ))}
            </div>

            {/* Ver todos os artigos Button */}
            {articles.length > 3 && (
                <div className="mt-12 flex justify-center">
                    <Link to="/artigos" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 dark:bg-zinc-800 hover:bg-[#38889F] hover:text-white text-slate-900 dark:text-white font-bold rounded-full transition-all duration-300 border border-slate-200 dark:border-white/10 hover:border-[#38889F] group/btn">
                        Ver todos os artigos
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}
        </section>
    );
};

export default ArticlesSection;
