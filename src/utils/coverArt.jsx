import React from 'react';

/* eslint-disable react-refresh/only-export-components */

// Sistema de "capa conceitual" da Brand — usado nos artigos, que não têm imagem própria.
export const getArticleCoverData = (article) => {
    const coverClass = 'cover-nexus';
    const letter = article.title ? article.title.charAt(0).toUpperCase() : 'A';

    const yearTag = (article.tags || []).find((tag) => /^\d{4}$/.test(tag));
    const year = yearTag || article.date?.split('-')[0] || '';

    const tags = (article.tags || []).filter((tag) => tag !== year).slice(0, 3);

    return { coverClass, letter, year, tags };
};

// Renderiza a capa conceitual (fundo listrado + brilho, sem o ícone de barras)
export const CoverArt = ({ coverClass, letter }) => (
    <div className={`proj-cover ${coverClass}`} data-letter={letter}>
        <div className="proj-cover-noise"></div>
    </div>
);
