import { useMemo } from 'react';
import { projects } from '@/data/projects';
import { articles } from '@/data/articles';

export const useFilteredContent = (searchQuery, selectedTags, language) => {
    // Extrair todas as tags únicas disponíveis e separar por tipo
    const { yearTags, categoryTags } = useMemo(() => {
        const tags = new Set();
        projects.forEach(p => {
            if (p.tags) {
                p.tags.forEach(tag => tags.add(tag));
            }
        });
        articles.forEach(a => {
            if (a.tags) {
                a.tags.forEach(tag => tags.add(tag));
            }
        });
        const all = Array.from(tags);
        const years = all.filter(tag => /^\d{4}$/.test(tag)).sort((a, b) => b.localeCompare(a));
        const categories = all.filter(tag => !/^\d{4}$/.test(tag)).sort();
        return { yearTags: years, categoryTags: categories };
    }, []);

    // Determina se há algum filtro ativo
    const isFilterActive = selectedTags.length > 0 || searchQuery.trim() !== '';

    // Lógica de filtragem unificada
    const { filteredProjects, filteredArticles, combinedResults } = useMemo(() => {
        const filterFn = (item) => {
            const itemTitle = language === 'en' && item.title_en ? item.title_en : item.title;
            const itemContext = language === 'en' && item.context_en ? item.context_en : (item.context || item.excerpt);

            const matchesSearch = !searchQuery || 
                (itemTitle && itemTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (itemContext && itemContext.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => (item.tags || []).includes(tag));

            return matchesSearch && matchesTags;
        };

        const fProjects = projects.filter(filterFn);
        const fArticles = articles.filter(filterFn);

        // Combina e ordena por data (mais recente primeiro)
        const combined = [...fProjects, ...fArticles].sort((a, b) => {
            const dateA = new Date(a.date || '2000-01-01');
            const dateB = new Date(b.date || '2000-01-01');
            return dateB - dateA;
        });

        return {
            filteredProjects: fProjects,
            filteredArticles: fArticles,
            combinedResults: combined
        };
    }, [searchQuery, selectedTags, language]);

    return {
        yearTags,
        categoryTags,
        isFilterActive,
        filteredProjects,
        filteredArticles,
        combinedResults
    };
};
