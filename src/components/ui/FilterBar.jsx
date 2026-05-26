import React from 'react';
import { Filter, X } from 'lucide-react';

const FilterBar = ({ yearTags, categoryTags, selectedTags, toggleTag, clearFilters, searchQuery }) => {
    return (
        <div className="flex flex-col gap-4">
            {/* Filtros de Ano */}
            <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center gap-2 mr-2 text-slate-500 dark:text-slate-400 font-medium w-full md:w-auto">
                    <Filter className="w-4 h-4" />
                    <span>Ano:</span>
                </div>
                {yearTags.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                                isSelected 
                                    ? 'bg-brand-glow text-white border-brand-glow' 
                                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-brand-glow'
                            }`}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>
            
            {/* Filtros de Categoria */}
            <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center gap-2 mr-2 text-slate-500 dark:text-slate-400 font-medium w-full md:w-auto">
                    <Filter className="w-4 h-4" />
                    <span>Categoria:</span>
                </div>
                {categoryTags.map(tag => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                        <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                                isSelected 
                                    ? 'bg-brand-glow text-white border-brand-glow' 
                                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-brand-glow'
                            }`}
                        >
                            {tag}
                        </button>
                    );
                })}
                
                {(selectedTags.length > 0 || searchQuery) && (
                    <button
                        onClick={clearFilters}
                        className="px-4 py-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors md:ml-auto flex items-center gap-1 w-full md:w-auto mt-2 md:mt-0"
                    >
                        <X className="w-4 h-4" />
                        Limpar filtros
                    </button>
                )}
            </div>
        </div>
    );
};

export default FilterBar;
