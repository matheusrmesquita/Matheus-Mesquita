import React from 'react';
import { ExternalLink, LayoutTemplate, Sparkles, Lightbulb, Zap, Palette, MonitorSmartphone, Layers, Image as ImageIcon } from 'lucide-react';

// Case editorial: uma grade só para tudo. Título do capítulo fixo à esquerda (4 col),
// texto e mídia sempre na coluna da direita (8 col). Sem alternar lados.

const txt = (project, key, en) => (en ? project[`${key}_en`] || project[key] : project[key]);

// Moldura escura com legenda "Título — detalhe" embaixo
const Frame = ({ caption, detail, children }) => (
    <figure className="w-full">
        <div className="rounded-[20px] bg-[#161618] p-2 md:p-4 shadow-2xl">{children}</div>
        {caption && (
            <figcaption className="mt-3 text-sm text-slate-900 dark:text-white font-medium">
                {caption}{detail && <span className="text-slate-500 dark:text-slate-400 font-normal"> — {detail}</span>}
            </figcaption>
        )}
    </figure>
);

// Linha do capítulo: número + ícone + título fixos à esquerda, conteúdo à direita
const Row = ({ n, label, icon, children }) => {
    const Icon = icon;
    return (
        <section className="grid md:grid-cols-12 gap-6 md:gap-12 border-t border-slate-200 dark:border-white/10 pt-10 md:pt-14">
            <div className="md:col-span-4">
                <div className="md:sticky md:top-24">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#38889F] font-bold mb-3">{String(n).padStart(2, '0')}</p>
                    <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                        <Icon className="w-6 h-6 text-[#38889F] shrink-0" aria-hidden="true" /> {label}
                    </h2>
                </div>
            </div>
            <div className="md:col-span-8 flex flex-col gap-10">{children}</div>
        </section>
    );
};

const Body = ({ children }) => (
    <p className="text-lg md:text-xl leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line max-w-[68ch]">{children}</p>
);

const Meta = ({ label, children, className = '' }) => (
    <div className={className}>
        <dt className="uppercase tracking-[0.2em] text-xs text-slate-500 mb-1">{label}</dt>
        <dd className="text-slate-900 dark:text-white font-semibold">{children}</dd>
    </div>
);

const IdentityBoard = ({ identity, en }) => {
    const { bg, fg, accent, logo, logoAlt, font, colors } = identity;
    return (
        <div className="w-full rounded-[12px] overflow-hidden" style={{ background: bg, color: fg, fontFamily: `'${font.name}', sans-serif` }}>
            {/* React 19 eleva o <link> para o <head> */}
            <link rel="stylesheet" href={font.href} precedence="default" />
            <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex items-center justify-center min-h-[200px] md:min-h-[300px]">
                    {logo
                        ? <img src={logo} alt={logoAlt} className="w-3/4 max-w-[300px] h-auto" />
                        : <span className="text-4xl md:text-5xl font-light tracking-tight text-center">{logoAlt}</span>}
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l" style={{ borderColor: `${fg}22` }}>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">{en ? 'Typeface' : 'Tipografia'}</p>
                    <p className="text-7xl md:text-8xl leading-none font-medium" style={{ color: accent }}>Aa</p>
                    <p className="mt-6 text-2xl font-semibold">{font.name}</p>
                    <p className="mt-2 text-sm opacity-70">{font.weights}</p>
                    <p className="mt-6 text-base font-light break-words opacity-90">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz<br />0123456789</p>
                </div>
            </div>
            <ul className="grid grid-cols-2 sm:grid-cols-3" aria-label={en ? 'Color palette' : 'Paleta de cores'}>
                {colors.map((c) => (
                    <li key={c.hex} className="h-28 md:h-36 p-4 flex flex-col justify-end" style={{ background: c.hex, color: c.text }}>
                        <span className="text-sm font-semibold">{c.name}</span>
                        <span className="text-xs opacity-80 uppercase">{c.hex}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Creatives = ({ rows, title }) => (
    <div className="flex flex-col gap-3 md:gap-4">
        {rows.map((row, r) => (
            // cada linha vira uma grade com o número de colunas da própria linha
            <div key={r} className="grid items-start gap-3 md:gap-4 grid-cols-2 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" style={{ '--cols': row.length }}>
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

const FIELDS = [
    ['highlight', 'O Destaque', 'Highlight', Sparkles],
    ['solution', 'A Solução', 'The Solution', Lightbulb],
    ['process', 'Processo', 'Process', Zap],
    ['aesthetics', 'Estética', 'Aesthetics', Palette],
    ['technique', 'Técnica', 'Technique', MonitorSmartphone],
];

const EditorialCase = ({ project, title, en }) => {
    const L = (pt, eng) => (en ? eng : pt);
    const item = (m, detail) => (typeof m === 'string' ? { src: m, detail } : { detail, ...m });
    const pages = (project.pages || []).map((p) => item(p, L('página inteira', 'full page')));
    const gallery = (project.gallery || []).map((g) => item(g));

    // capítulo i recebe a imagem i da galeria; as que sobram vão para o último
    const texts = FIELDS.map(([key, pt, eng, icon]) => ({ key, label: L(pt, eng), icon, body: txt(project, key, en) })).filter((t) => t.body);
    const chapters = texts.map((t, i) => ({ ...t, imgs: i === texts.length - 1 ? gallery.slice(i) : gallery.slice(i, i + 1) }));
    const hasAesthetics = chapters.some((c) => c.key === 'aesthetics');

    const shot = (m, i) => {
        const label = m.label || `${L('Tela', 'Screen')} ${i + 1}`;
        return (
            <Frame key={m.src} caption={label} detail={m.detail}>
                <img src={m.src} alt={`${title} - ${label}`} className="w-full h-auto block rounded-[10px]" loading="lazy" decoding="async" />
            </Frame>
        );
    };
    const grid = (list) => (
        <div className="grid items-start gap-6 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" style={{ '--cols': Math.min(list.length, 2) }}>
            {list.map(shot)}
        </div>
    );
    const identity = project.identity && (
        <Frame caption={L('Identidade', 'Identity')} detail={L('logo, tipografia e paleta', 'logo, typeface and palette')}>
            <IdentityBoard identity={project.identity} en={en} />
        </Frame>
    );

    const year = project.date?.slice(0, 4);
    const disciplines = (project.tags || []).filter((t) => t !== year);
    const context = txt(project, 'context', en);
    let n = 0;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col gap-16 md:gap-24 pb-24">

            {/* Abertura: vídeo da navegação (ou capa) em largura total */}
            {project.showcaseVideo ? (
                <Frame caption={L('Navegação completa', 'Full walkthrough')} detail={L('do topo ao rodapé', 'top to footer')}>
                    <video src={project.showcaseVideo} poster={project.showcasePoster} controls playsInline preload="metadata" className="w-full h-auto block rounded-[10px]" />
                </Frame>
            ) : project.image && (
                // capas são pequenas (~800px): limita a largura para não esticar
                <div className="w-full max-w-4xl mx-auto"><Frame><img src={project.image} alt={title} className="w-full h-auto block rounded-[10px]" /></Frame></div>
            )}

            {/* Ficha + contexto */}
            <section className="grid md:grid-cols-12 gap-10 md:gap-12">
                <dl className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-6 content-start text-sm">
                    {year && <Meta label={L('Ano', 'Year')}>{year}</Meta>}
                    {disciplines.length > 0 && <Meta label={L('Disciplinas', 'Disciplines')}>{disciplines.join(' · ')}</Meta>}
                    {project.siteLink && (
                        <Meta label="Site" className="col-span-2 md:col-span-1">
                            <a href={project.siteLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#38889F] hover:underline">
                                {project.siteLink.replace(/^https?:\/\//, '').replace(/\/$/, '')} <ExternalLink className="w-4 h-4" aria-hidden="true" />
                            </a>
                        </Meta>
                    )}
                </dl>
                {context && (
                    <div className="md:col-span-8">
                        <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#38889F] font-bold">
                            <LayoutTemplate className="w-4 h-4" aria-hidden="true" /> {L('Contexto', 'Context')}
                        </p>
                        <Body>{context}</Body>
                    </div>
                )}
            </section>

            {chapters.map((c) => (
                <Row key={c.key} n={++n} label={c.label} icon={c.icon}>
                    <Body>{c.body}</Body>
                    {c.key === 'aesthetics' && identity}
                    {c.imgs.length > 0 && grid(c.imgs)}
                </Row>
            ))}

            {!hasAesthetics && identity && <Row n={++n} label={L('Identidade', 'Identity')} icon={Palette}>{identity}</Row>}

            {pages.length > 0 && <Row n={++n} label={L('Páginas', 'Pages')} icon={Layers}>{grid(pages)}</Row>}

            {project.creatives?.length > 0 && (
                <Row n={++n} label={L('Criativos', 'Creatives')} icon={ImageIcon}>
                    <Body>{txt(project, 'creativesText', en) || L('Peças para o Instagram no mesmo sistema visual do site.', 'Instagram pieces in the same visual system as the site.')}</Body>
                    <Frame caption={L('Criativos', 'Creatives')} detail="Instagram"><Creatives rows={project.creatives} title={title} /></Frame>
                </Row>
            )}
        </div>
    );
};

export default EditorialCase;
