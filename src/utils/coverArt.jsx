import React from 'react';

/* eslint-disable react-refresh/only-export-components */

// Sistema de "capas conceituais" da Brand — usado nos artigos, que não têm imagem própria.
// Cada artigo recebe uma capa gerativa cíclica (formas + brilho) e a letra inicial do título.
const COVERS = [
    'cover-orbita',
    'cover-nexus',
    'cover-lumina',
    'cover-veritas',
    'cover-fluxo',
    'cover-kairos',
    'cover-meridian',
    'cover-apex',
];

const hashId = (id) => {
    const str = String(id);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    return hash;
};

export const getArticleCoverData = (article, index = 0) => {
    const coverClass = COVERS[(hashId(article.id ?? index) + index) % COVERS.length];
    const letter = article.title ? article.title.charAt(0).toUpperCase() : 'A';

    const yearTag = (article.tags || []).find((tag) => /^\d{4}$/.test(tag));
    const year = yearTag || article.date?.split('-')[0] || '';

    const tags = (article.tags || []).filter((tag) => tag !== year).slice(0, 2);

    return { coverClass, letter, year, tags };
};

// Renderiza os elementos internos específicos de cada capa conceitual
export const CoverArt = ({ coverClass, letter }) => {
    const isOrbita = coverClass === 'cover-orbita';
    const isNexus = coverClass === 'cover-nexus';
    const isLumina = coverClass === 'cover-lumina';
    const isFluxo = coverClass === 'cover-fluxo';
    const isKairos = coverClass === 'cover-kairos';

    return (
        <div className={`proj-cover ${coverClass}`} data-letter={letter}>
            {isOrbita && <div className="cover-orbita-inner"></div>}
            {isNexus && (
                <div className="cover-nexus-bars">
                    <span style={{ height: '20px' }}></span>
                    <span style={{ height: '36px' }}></span>
                    <span style={{ height: '52px' }}></span>
                    <span style={{ height: '28px' }}></span>
                    <span style={{ height: '44px' }}></span>
                    <span style={{ height: '18px' }}></span>
                    <span style={{ height: '38px' }}></span>
                </div>
            )}
            {isLumina && <div className="cover-lumina-line"></div>}
            {isFluxo && <div className="cover-fluxo-phone"></div>}
            {isKairos && <div className="cover-kairos-ring"></div>}
            <div className="proj-cover-noise"></div>
        </div>
    );
};
