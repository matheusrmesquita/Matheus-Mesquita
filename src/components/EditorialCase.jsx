import React from 'react';
import { ExternalLink } from 'lucide-react';

// Case editorial (referência: Awwwards SOTD) — texto e mídia alternados em capítulos,
// mídia em molduras escuras com legenda curta.

const txt = (project, key, en) => (en ? project[`${key}_en`] || project[key] : project[key]);
const pageOf = (p) => (typeof p === 'string' ? { src: p } : p);

// Moldura escura com legenda "Título — detalhe" embaixo
const Frame = ({ caption, detail, children, className = '' }) => (
    <figure className={`w-full ${className}`}>
        <div className="rounded-[20px] bg-[#161618] p-2 md:p-6 shadow-2xl">{children}</div>
        {caption && (
            <figcaption className="mt-3 text-sm text-slate-900 dark:text-white font-medium">
                {caption}{detail && <span className="text-slate-500 dark:text-slate-400 font-normal"> — {detail}</span>}
            </figcaption>
        )}
    </figure>
);

// Rótulo numerado + texto do capítulo
const ChapterText = ({ n, label, children }) => (
    <div>
        <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#38889F] font-bold">{String(n).padStart(2, '0')} · {label}</p>
        <div className="text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">{children}</div>
    </div>
);

const PageImg = ({ src, alt }) => (
    <img src={src} alt={alt} className="w-full h-auto block rounded-[10px]" loading="lazy" decoding="async" />
);

const IdentityBoard = ({ identity, en }) => {
    const { bg, fg, accent, logo, logoAlt, font, colors } = identity;
    return (
        <div className="w-full rounded-[12px] overflow-hidden" style={{ background: bg, color: fg, fontFamily: `'${font.name}', sans-serif` }}>
            {/* React 19 eleva o <link> para o <head> */}
            <link rel="stylesheet" href={font.href} precedence="default" />
            <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-14 flex items-center justify-center min-h-[220px] md:min-h-[360px]">
                    {logo
                        ? <img src={logo} alt={logoAlt} className="w-3/4 max-w-[360px] h-auto" />
                        : <span className="text-4xl md:text-6xl font-light tracking-tight text-center">{logoAlt}</span>}
                </div>
                <div className="p-8 md:p-14 flex flex-col justify-center border-t md:border-t-0 md:border-l" style={{ borderColor: `${fg}22` }}>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">{en ? 'Typeface' : 'Tipografia'}</p>
                    <p className="text-8xl md:text-9xl leading-none font-medium" style={{ color: accent }}>Aa</p>
                    <p className="mt-6 text-2xl font-semibold">{font.name}</p>
                    <p className="mt-2 text-sm opacity-70">{font.weights}</p>
                    <p className="mt-6 text-lg font-light break-words opacity-90">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>
                </div>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6" aria-label={en ? 'Color palette' : 'Paleta de cores'}>
                {colors.map((c) => (
                    <li key={c.hex} className="h-40 md:h-56 p-4 flex flex-col justify-end" style={{ background: c.hex, color: c.text }}>
                        <span className="text-sm font-semibold">{c.name}</span>
                        <span className="text-xs opacity-80 uppercase">{c.hex}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Creatives = ({ rows, title }) => (
    <div className="flex flex-col gap-3 md:gap-5">
        {rows.map((row, r) => (
            // cada linha vira uma grade com o número de colunas da própria linha
            <div key={r} className="grid items-start gap-3 md:gap-5 grid-cols-2 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" style={{ '--cols': row.length }}>
                {row.map((item) => {
                    const m = typeof item === 'string' ? { src: item } : item;
                    const cls = 'w-full h-auto block rounded-[10px]';
                    return (
                        <div key={m.src} className={`${row.length === 1 ? 'col-span-2' : ''} md:col-span-1`}>
                            {m.src.endsWith('.mp4')
                                ? <video src={m.src} poster={m.poster} className={cls} autoPlay muted loop playsInline preload="metadata" aria-label={`${title} - Reel`} />
                                : <img src={m.src} alt={`${title} - Criativo`} className={cls} loading="lazy" decoding="async" />}
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
);

const EditorialCase = ({ project, title, en }) => {
    const pages = (project.pages || []).map(pageOf);
    const [firstPage, ...otherPages] = pages;
    const L = (pt, eng) => (en ? eng : pt);
    let n = 0;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col gap-24 md:gap-36 pb-24">

            {/* 01 — Contexto + vídeo da landing */}
            <section className="flex flex-col gap-10 md:gap-14">
                {txt(project, 'context', en) && (
                    <div className="md:w-2/3"><ChapterText n={++n} label={L('Contexto', 'Context')}>{txt(project, 'context', en)}</ChapterText></div>
                )}
                {project.showcaseVideo && (
                    <Frame caption={L('Landing completa', 'Full landing')} detail={L('navegação do topo ao rodapé', 'top to footer walkthrough')}>
                        <div className="relative">
                            <video src={project.showcaseVideo} poster={project.showcasePoster} controls playsInline preload="metadata" className="w-full h-auto block rounded-[10px]" />
                            {project.siteLink && (
                                <a href={project.siteLink} target="_blank" rel="noopener noreferrer"
                                    aria-label={`${L('Visitar site', 'Visit site')} ${title}`}
                                    className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 h-9 rounded-[10px] bg-black/40 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium transition-colors hover:bg-[#38889F] hover:border-[#38889F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                                    {L('Visitar site', 'Visit site')} <ExternalLink className="w-4 h-4" aria-hidden="true" />
                                </a>
                            )}
                        </div>
                    </Frame>
                )}
            </section>

            {/* 02 — Processo fixo ao lado da página principal (o texto acompanha o scroll da tela longa) */}
            {(txt(project, 'process', en) || firstPage) && (
                <section className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
                    {txt(project, 'process', en) && (
                        <div className="md:col-span-5 md:sticky md:top-24">
                            <ChapterText n={++n} label={L('Processo', 'Process')}>{txt(project, 'process', en)}</ChapterText>
                        </div>
                    )}
                    {firstPage && (
                        <Frame className="md:col-span-7" caption={firstPage.label || 'Home'} detail={L('página inteira', 'full page')}>
                            <PageImg src={firstPage.src} alt={`${title} - ${firstPage.label || 'Home'}`} />
                        </Frame>
                    )}
                </section>
            )}

            {/* 03 — Estética + board de identidade */}
            {(txt(project, 'aesthetics', en) || project.identity) && (
                <section className="flex flex-col gap-10 md:gap-14">
                    {txt(project, 'aesthetics', en) && (
                        <div className="md:w-2/3 md:ml-auto"><ChapterText n={++n} label={L('Estética', 'Aesthetics')}>{txt(project, 'aesthetics', en)}</ChapterText></div>
                    )}
                    {project.identity && (
                        <Frame caption={L('Identidade', 'Identity')} detail={L('logo, tipografia e paleta', 'logo, typeface and palette')}>
                            <IdentityBoard identity={project.identity} en={en} />
                        </Frame>
                    )}
                </section>
            )}

            {/* 04 — Técnica + demais páginas lado a lado */}
            {(txt(project, 'technique', en) || otherPages.length > 0) && (
                <section className="flex flex-col gap-10 md:gap-14">
                    {txt(project, 'technique', en) && (
                        <div className="md:w-2/3"><ChapterText n={++n} label={L('Técnica', 'Technique')}>{txt(project, 'technique', en)}</ChapterText></div>
                    )}
                    {otherPages.length > 0 && (
                        <div className="grid items-start gap-6 md:gap-8 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" style={{ '--cols': otherPages.length }}>
                            {otherPages.map((p, i) => (
                                <Frame key={p.src} caption={p.label || `${L('Página', 'Page')} ${i + 2}`} detail={L('página inteira', 'full page')}>
                                    <PageImg src={p.src} alt={`${title} - ${p.label || i + 2}`} />
                                </Frame>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* 05 — Criativos */}
            {project.creatives?.length > 0 && (
                <section className="flex flex-col gap-10 md:gap-14">
                    <div className="md:w-2/3 md:ml-auto">
                        <ChapterText n={++n} label={L('Criativos', 'Creatives')}>
                            {txt(project, 'creativesText', en) || L('Peças para o Instagram no mesmo sistema visual do site.', 'Instagram pieces in the same visual system as the site.')}
                        </ChapterText>
                    </div>
                    <Frame caption={L('Criativos', 'Creatives')} detail="Instagram">
                        <Creatives rows={project.creatives} title={title} />
                    </Frame>
                </section>
            )}
        </div>
    );
};

export default EditorialCase;
