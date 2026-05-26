import React from 'react';

/* eslint-disable react-refresh/only-export-components */

// Mapeamento explícito de capas e letras para cada projeto real (baseado no ID do projeto)
export const getProjectCoverData = (project, language) => {
    const id = project.id;
    let coverClass = 'cover-orbita';
    let letter = project.title ? project.title.charAt(0).toUpperCase() : 'B';
    
    // Escolhemos capas que combinam perfeitamente com cada identidade corporativa
    switch (id) {
        case 14: // Jotaka Cozinha e Bar
            coverClass = 'cover-apex';
            letter = 'J';
            break;
        case 13: // Clínica Bem Estar
            coverClass = 'cover-kairos';
            letter = 'B';
            break;
        case 11: // LP Workshop Livre do Operacional
            coverClass = 'cover-nexus';
            letter = 'L';
            break;
        case 5: // Sistema de Gestão e Processos Digitais
            coverClass = 'cover-fluxo';
            letter = 'S';
            break;
        case 12: // Redesign Sistema Financeiro - Aurea
            coverClass = 'cover-veritas';
            letter = 'A';
            break;
        case 4: // Comunidade Vesali
            coverClass = 'cover-veritas';
            letter = 'V';
            break;
        case 1: // Landing Pages Vesali
            coverClass = 'cover-lumina';
            letter = 'V';
            break;
        case 2: // Metacon
            coverClass = 'cover-orbita';
            letter = 'M';
            break;
        case 3: // Max
            coverClass = 'cover-veritas';
            letter = 'M';
            break;
        case 6: // Athex
            coverClass = 'cover-apex';
            letter = 'A';
            break;
        case 10: // Coca-Cola
            coverClass = 'cover-kairos';
            letter = 'C';
            break;
        case 7: // Serviço Candango
            coverClass = 'cover-meridian';
            letter = 'S';
            break;
        default: {
            // Lógica cíclica para fallback caso novos projetos sejam adicionados futuramente
            const covers = [
                'cover-orbita',
                'cover-nexus',
                'cover-lumina',
                'cover-veritas',
                'cover-fluxo',
                'cover-kairos',
                'cover-meridian',
                'cover-apex'
            ];
            coverClass = covers[id % 8];
            break;
        }
    }

    // Extrair descrição de contexto curta de forma elegante e limpa
    const rawDesc = language === 'en' ? (project.context_en || project.context) : project.context;
    let description = '';
    if (rawDesc) {
        // Pega a primeira frase ou trunca
        const sentence = rawDesc.split(/[.!?]/)[0];
        description = sentence.length > 105 ? sentence.substring(0, 105) + '...' : sentence + '.';
    } else {
        description = language === 'en' ? 'Interactive digital project.' : 'Projeto digital interativo.';
    }

    // Extrair ano
    let year = '2024';
    if (project.date) {
        year = project.date.split('-')[0];
    } else if (project.tags) {
        const yearTag = project.tags.find(t => !isNaN(t) && t.length === 4);
        if (yearTag) year = yearTag;
    }

    // Filtrar tags principais (remover "Landing Page" se redundante e limitar a 2)
    const displayTags = project.tags
        ? project.tags.filter(t => t !== "Landing Page" && t !== year)
        : [];

    return {
        coverClass,
        letter,
        description,
        year,
        tags: displayTags.slice(0, 2)
    };
};

// Mapeamento dinâmico de capas e letras para cada artigo
export const getArticleCoverData = (article) => {
    const id = article.id;
    const covers = [
        'cover-orbita',
        'cover-nexus',
        'cover-lumina',
        'cover-veritas',
        'cover-fluxo',
        'cover-kairos',
        'cover-meridian',
        'cover-apex'
    ];
    
    // Escolhemos capas variadas cíclicas para os artigos de forma diferente dos projetos
    const coverIndex = (id + 3) % 8;
    const coverClass = covers[coverIndex];
    const letter = article.title ? article.title.charAt(0).toUpperCase() : 'A';
    
    // Extrair ano
    let year = '2026';
    if (article.tags) {
        const yearTag = article.tags.find(t => !isNaN(t) && t.length === 4);
        if (yearTag) year = yearTag;
    }

    // Filtrar tags
    const displayTags = article.tags
        ? article.tags.filter(t => t !== year && t !== "Artigo")
        : [];

    return {
        coverClass,
        letter,
        year,
        tags: displayTags.slice(0, 2)
    };
};

// Componente React para renderizar os elementos internos específicos de cada capa
export const ProjectCover = ({ coverClass, letter }) => {
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
