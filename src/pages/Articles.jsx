import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProjectCover } from '@/utils/projectCovers';
import { useSupabaseArticles } from '@/hooks/useSupabaseArticles';
import { TAGS } from '@/constants/tags';

const getSupabaseArticleCoverData = (article, index) => {
    const covers = ['cover-orbita','cover-nexus','cover-lumina','cover-veritas','cover-fluxo','cover-kairos','cover-meridian','cover-apex'];
    const coverClass = article.cover_type || covers[(index + 3) % 8];
    const letter = article.title ? article.title.charAt(0).toUpperCase() : 'A';
    const yearTag = (article.tags || []).find(t => !isNaN(t) && t.length === 4);
    const year = yearTag || (article.created_at ? article.created_at.split('-')[0] : '2026');
    const tags = (article.tags || []).filter(t => t !== year).slice(0, 2);
    return { coverClass, letter, year, tags };
};

const Articles = () => {
    const { t, language } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isFilterActive = searchQuery !== '' || selectedTags.length > 0;
    const { articles: supabaseArticles } = useSupabaseArticles();

    const allArticles = supabaseArticles
        .map(a => ({ ...a, slug: `/artigos/${a.slug}`, _supabase: true }))
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    const filteredAllArticles = isFilterActive
        ? allArticles.filter(a => {
            const title = a.title || '';
            const excerpt = a.excerpt || '';
            const matchesSearch = !searchQuery ||
                title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTags = selectedTags.length === 0 ||
                selectedTags.some(tag => (a.tags || []).includes(tag));
            return matchesSearch && matchesTags;
          })
        : allArticles;

    const allTags = TAGS;

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
        <div className="w-full bg-[#050505] text-[#F5F5F5] font-sans pb-24 pt-32 animate-in fade-in duration-700">
            <section className="brand-section">
                <div className="brand-container">
                
                {/* ─── Page Header Stitch ─── */}
                <header className="brand-grid items-end border-b border-white/10 pb-8 mb-12 relative z-10">
                    <div className="col-span-8 md:col-span-7 flex flex-col gap-3">
                        <span className="text-xs tracking-[0.18em] uppercase text-zinc-500 flex items-center gap-3">
                            {language === 'en' ? 'Selected thinking' : 'Leituras selecionadas'}
                        </span>
                        <h1 className="brand-hero-title text-[3.25rem] md:text-[5.5rem] font-black tracking-tight leading-[0.92] text-white">
                            {language === 'en' ? 'Articles' : 'Artigos'}
                        </h1>
                    </div>
                    {/* Contador Gigante Dinâmico com Stroke */}
                    <div className="col-span-4 md:col-span-5 text-right text-[5rem] md:text-[9rem] font-black tracking-tighter leading-none text-transparent select-none"
                         style={{ WebkitTextStroke: '1px rgba(245,245,245,0.12)', fontVariantNumeric: 'tabular-nums' }}>
                        {String(allArticles.length).padStart(2, '0')}
                    </div>
                </header>

                {/* ─── Busca Minimalista e Filtros Integrados (Stitch Style Sticky) ─── */}
                <div className="brand-grid items-center border-b border-white/10 pb-6 mb-12 sticky top-[61px] z-40 bg-[#050505]/90 backdrop-blur-2xl py-4">
                    {/* Pílulas de Categoria (Stitch active style) */}
                    <div className="col-span-12 lg:col-span-7 flex items-center gap-2 flex-wrap">
                        {/* Botão Todos */}
                        <button 
                            onClick={clearFilters}
                            className={`brand-button-text px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                                selectedTags.length === 0 
                                ? 'bg-white text-black border-white' 
                                : 'bg-transparent text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
                            }`}
                        >
                            {language === 'en' ? 'All' : 'Todos'}
                        </button>
                        
                        {/* Pílulas dinâmicas baseadas em todos os artigos */}
                        {allTags.map(cat => {
                            const isActive = selectedTags.includes(cat);
                            return (
                                <button
                                    key={cat}
                                    onClick={() => toggleTag(cat)}
                                    className={`brand-button-text px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                                        isActive
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-zinc-400 border-white/10 hover:text-white hover:border-white/30'
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>

                    {/* Input de Busca Minimalista de Linha Única */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-3 relative w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder={t('search.placeholder') || 'Buscar...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-full py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#FF5A1F] transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs transition-colors"
                            >
                                {language === 'en' ? 'Clear' : 'Limpar'}
                            </button>
                        )}
                    </div>

                    {/* Contagem Dinâmica de Artigos */}
                    <div className="col-span-12 md:col-span-5 lg:col-span-2 text-[11px] text-zinc-500 font-bold tracking-widest uppercase whitespace-nowrap self-end md:self-center md:text-right">
                        {String(filteredAllArticles.length).padStart(2, '0')} {filteredAllArticles.length === 1 ? 'artigo' : 'artigos'}
                    </div>
                </div>

                {filteredAllArticles.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-zinc-500">{t('search.noArticles') || 'Nenhum artigo encontrado.'}</p>
                    </div>
                ) : (
                    <>
                        <div className="brand-card-grid">
                                {filteredAllArticles.map((article, index) => {
                                    const { coverClass, letter, year, tags } = getSupabaseArticleCoverData(article, index);

                                    return (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, y: 28 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-60px' }}
                                            transition={{ duration: 0.62, delay: Math.min(index * 0.04, 0.18), ease: [0.22, 1, 0.36, 1] }}
                                            className="h-full"
                                        >
                                            <Link
                                                to={article.slug}
                                                className="proj-card group block h-full w-full outline-none focus-visible:ring-4 focus-visible:ring-[#FF5A1F] rounded overflow-hidden"
                                                role="article"
                                                aria-label={`Artigo ${article.title}`}
                                            >
                                                <ProjectCover coverClass={coverClass} letter={letter} />
                                                <div className="proj-overlay">
                                                    <div className="proj-detail">
                                                        <p className="proj-desc">{article.excerpt}</p>
                                                        <span className="proj-cta">
                                                            {language === 'en' ? 'Read full article' : 'Ler artigo completo'}
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="proj-meta">
                                                        <div className="proj-info">
                                                            <h3 className="proj-name">{article.title}</h3>
                                                            <div className="proj-tags">
                                                                {tags.map((tag, i) => (
                                                                    <span key={i} className="proj-tag">{tag}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <span className="proj-year">{year}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                        </div>
                    </>
                )}
                </div>
            </section>
        </div>
    );
};

export default Articles;
