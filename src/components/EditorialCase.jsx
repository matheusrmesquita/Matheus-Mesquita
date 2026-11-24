import React from 'react';
import { ExternalLink, LayoutTemplate, Sparkles, Lightbulb, Zap, Palette, MonitorSmartphone } from 'lucide-react';

// Case editorial (referência: Awwwards SOTD) — texto e mídia alternados em capítulos,
// mídia em molduras escuras com legenda curta.

const txt = (project, key, en) => (en ? project[`${key}_en`] || project[key] : project[key]);

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


const FIELDS = [
    ['context', 'Contexto', 'Context', LayoutTemplate],
    ['highlight', 'O Destaque', 'Highlight', Sparkles],
    ['solution', 'A Solução', 'The Solution', Lightbulb],
    ['process', 'Processo', 'Process', Zap],
    ['aesthetics', 'Estética', 'Aesthetics', Palette],
    ['technique', 'Técnica', 'Technique', MonitorSmartphone],
];

// Card de apoio (logo + ícone do capítulo + tags) nas cores da marca, para capítulos sem imagem
const Spot = ({ project, title, icon, label, compact }) => {
    const Icon = icon;
    const { bg = '#161618', fg = '#f8fafc', accent = '#38889F', logo } = project.identity || {};
    return (
        <div className={`w-full rounded-[20px] p-6 md:p-10 flex flex-col justify-between gap-8 shadow-2xl overflow-hidden relative ${compact ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
            style={{ background: bg, color: fg }} aria-hidden="true">
            <Icon className="absolute -right-6 -bottom-6 w-48 h-48 md:w-64 md:h-64 opacity-[0.07]" strokeWidth={1} />
            <div className="flex items-center justify-between gap-4">
                {logo ? <img src={logo} alt="" className="h-8 md:h-10 w-auto" /> : <span className="text-lg md:text-xl font-bold tracking-tight">{title}</span>}
                <span className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center" style={{ background: `${accent}26`, color: accent }}>
                    <Icon className="w-6 h-6 md:w-7 md:h-7" />
                </span>
            </div>
            <div>
                <p className="text-3xl md:text-5xl font-bold tracking-tight leading-none mb-5" style={{ color: accent }}>{label}</p>
                <div className="flex flex-wrap gap-2">
                    {(project.tags || []).map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full text-xs font-semibold border" style={{ borderColor: `${fg}33` }}>{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const EditorialCase = ({ project, title, en }) => {
    const L = (pt, eng) => (en ? eng : pt);
    const img = (m, detail) => (typeof m === 'string' ? { kind: 'img', src: m, detail } : { kind: 'img', detail, ...m });
    const pages = (project.pages || []).map((p) => img(p, L('página inteira', 'full page')));

    // Mídias na ordem em que entram nos capítulos: vídeo, página principal, identidade, demais páginas, galeria
    const media = [
        project.showcaseVideo && { kind: 'video' },
        pages[0],
        project.identity && { kind: 'identity' },
        ...pages.slice(1),
        ...(project.gallery || []).map((g) => img(g)),
    ].filter(Boolean);

    const texts = FIELDS.map(([k, pt, eng, icon]) => ({ label: L(pt, eng), icon, body: txt(project, k, en) })).filter((t) => t.body);
    // capítulo i recebe a mídia i; as que sobram vão para o último capítulo
    const chapters = texts.map((t, i) => ({ ...t, media: i === texts.length - 1 ? media.slice(i) : media.slice(i, i + 1) }));

    const renderMedia = (m, i) => {
        if (m.kind === 'video') return (
            <Frame key="video" caption={L('Navegação completa', 'Full walkthrough')} detail={L('do topo ao rodapé', 'top to footer')}>
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
        );
        if (m.kind === 'identity') return (
            <Frame key="identity" caption={L('Identidade', 'Identity')} detail={L('logo, tipografia e paleta', 'logo, typeface and palette')}>
                <IdentityBoard identity={project.identity} en={en} />
            </Frame>
        );
        const label = m.label || `${L('Tela', 'Screen')} ${i + 1}`;
        return (
            <Frame key={m.src} caption={label} detail={m.detail}>
                <PageImg src={m.src} alt={`${title} - ${label}`} />
            </Frame>
        );
    };

    let n = 0;
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col gap-20 md:gap-28 pb-24">
            {chapters.map((c, i) => {
                const text = <ChapterText n={++n} label={c.label}>{c.body}</ChapterText>;
                const right = i % 2 === 1; // alterna o lado do texto a cada capítulo
                const imgs = c.media.filter((m) => m.kind === 'img');
                const spot = (compact) => <Spot project={project} title={title} icon={c.icon} label={c.label} compact={compact} />;
                // sem mídia: texto ao lado do card de apoio, para não sobrar vazio
                if (c.media.length === 0) return (
                    <section key={c.label} className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
                        <div className={`md:col-span-6 ${right ? 'md:order-2' : ''}`}>{text}</div>
                        <div className="md:col-span-6">{spot(false)}</div>
                    </section>
                );
                // uma imagem só: texto fixo ao lado (acompanha o scroll de telas longas);
                // texto curto ganha o card embaixo para preencher a coluna
                if (c.media.length === 1 && imgs.length === 1) return (
                    <section key={c.label} className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
                        <div className={`md:col-span-5 md:sticky md:top-24 flex flex-col gap-10 ${right ? 'md:order-2' : ''}`}>
                            {text}
                            {c.body.length < 800 && <div className="hidden md:block">{spot(true)}</div>}
                        </div>
                        <div className="md:col-span-7">{renderMedia(imgs[0], i)}</div>
                    </section>
                );
                return (
                    <section key={c.label} className="flex flex-col gap-10 md:gap-14">
                        <div className={`md:w-2/3 ${right ? 'md:ml-auto' : ''}`}>{text}</div>
                        {c.media.filter((m) => m.kind !== 'img').map(renderMedia)}
                        {imgs.length > 0 && (
                            <div className="grid items-start gap-6 md:gap-8 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" style={{ '--cols': imgs.length }}>
                                {imgs.map((m, k) => renderMedia(m, i + k))}
                            </div>
                        )}
                    </section>
                );
            })}

            {project.creatives?.length > 0 && (
                <section className="flex flex-col gap-10 md:gap-14">
                    <div className={`md:w-2/3 ${chapters.length % 2 === 1 ? 'md:ml-auto' : ''}`}>
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
