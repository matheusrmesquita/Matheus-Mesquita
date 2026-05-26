import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ProjectCover } from '@/utils/projectCovers';
import { TAGS } from '@/constants/tags';

const ICONS = [
    { value: 'Target',        label: 'Alvo' },
    { value: 'Users',         label: 'Usuários' },
    { value: 'Activity',      label: 'Atividade' },
    { value: 'Landmark',      label: 'Marco' },
    { value: 'Award',         label: 'Resultado' },
    { value: 'BookOpen',      label: 'Leitura' },
    { value: 'Compass',       label: 'Navegação' },
    { value: 'AlertCircle',   label: 'Destaque' },
    { value: 'Cpu',           label: 'Tecnologia' },
    { value: 'ClipboardList', label: 'Checklist' },
];

const COVERS = ['cover-orbita', 'cover-nexus', 'cover-lumina', 'cover-veritas', 'cover-fluxo', 'cover-kairos', 'cover-meridian', 'cover-apex'];
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const CALLOUT_TYPES = [
    { value: 'amber',  label: 'Âmbar' },
    { value: 'accent', label: 'Laranja' },
    { value: 'final',  label: 'Citação final' },
];

const AUTHORS = [
    { value: 'Matheus Mesquita', label: 'Matheus Mesquita' },
    { value: 'Walter Ribes',     label: 'Walter Ribes' },
    { value: 'Paulo Vieira',     label: 'Paulo Vieira' },
];

const YEAR_TAGS = ['2023', '2024', '2025', '2026'];

const TagSelector = ({ selected, onChange }) => (
    <div className="flex flex-wrap gap-1.5">
        {[...YEAR_TAGS, ...TAGS].map(tag => {
            const active = selected.includes(tag);
            return (
                <button
                    key={tag}
                    type="button"
                    onClick={() => onChange(active ? selected.filter(t => t !== tag) : [...selected, tag])}
                    className={`text-[10px] px-2.5 py-1 rounded-full border transition-colors ${
                        active
                            ? 'bg-[#FF5A1F]/15 border-[#FF5A1F]/40 text-[#FF5A1F]'
                            : 'bg-white/[0.02] border-white/[0.07] text-zinc-600 hover:text-zinc-300 hover:border-white/20'
                    }`}
                >
                    {tag}
                </button>
            );
        })}
    </div>
);

const CoverPicker = ({ coverType, coverLetter, onCover, onLetter }) => (
    <div>
        <div className="grid grid-cols-4 gap-2 mb-3">
            {COVERS.map(cover => (
                <button
                    key={cover}
                    type="button"
                    onClick={() => onCover(cover)}
                    className={`relative overflow-hidden rounded-md border-2 transition-all ${
                        coverType === cover ? 'border-[#FF5A1F] scale-[0.97]' : 'border-white/[0.06] hover:border-white/20'
                    }`}
                    style={{ height: 56 }}
                >
                    <div style={{
                        position: 'absolute', inset: 0,
                        transform: 'scale(3)', transformOrigin: 'center',
                        pointerEvents: 'none',
                    }}>
                        <ProjectCover coverClass={cover} letter={coverLetter} />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-zinc-400 text-center py-0.5 leading-tight">
                        {cover.replace('cover-', '')}
                    </div>
                    {coverType === cover && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#FF5A1F]" />
                    )}
                </button>
            ))}
        </div>
        <div className="flex flex-wrap gap-1">
            {LETTERS.map(l => (
                <button
                    key={l}
                    type="button"
                    onClick={() => onLetter(l)}
                    className={`w-6 h-6 text-[10px] font-bold rounded transition-colors ${
                        coverLetter === l
                            ? 'bg-[#FF5A1F] text-white'
                            : 'bg-white/[0.04] text-zinc-600 hover:text-white hover:bg-white/[0.08]'
                    }`}
                >
                    {l}
                </button>
            ))}
        </div>
    </div>
);

const makeSlug = (title) =>
    title.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim().replace(/\s+/g, '-');

const emptySection = () => ({
    _key: Math.random().toString(36).slice(2),
    icon: 'Target',
    title: '',
    paragraphs: [''],
    callout: null,
    expanded: true,
});

const Field = ({ label, children }) => (
    <div className="mb-4">
        <label className="block text-zinc-500 text-[9px] tracking-[0.12em] uppercase mb-1.5">{label}</label>
        {children}
    </div>
);

const inputCls = "w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm outline-none focus:border-white/20 transition-colors placeholder:text-zinc-700";
const textareaCls = inputCls + " resize-none";

const ArticleEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;

    const [saving, setSaving] = useState(false);
    const [meta, setMeta] = useState({
        title: '', slug: '', excerpt: '', cover_type: 'cover-orbita', cover_letter: 'B',
        category: 'Estudo de Caso', tags: [], author: 'Matheus Mesquita',
        created_at: new Date().toISOString().split('T')[0],
    });
    const [tagInput, setTagInput] = useState('');
    const [intro, setIntro] = useState({ highlight: '', sub: '' });
    const [sections, setSections] = useState([emptySection()]);

    useEffect(() => {
        if (!isNew) {
            supabase.from('articles').select('*').eq('id', id).single().then(({ data }) => {
                if (!data) return;
                setMeta({
                    title: data.title, slug: data.slug, excerpt: data.excerpt,
                    cover_type: data.cover_type, cover_letter: data.cover_letter || 'B',
                    category: data.category,
                    tags: data.tags || [], author: data.author || 'Matheus Mesquita',
                    created_at: data.created_at?.split('T')[0] || '',
                });
                setIntro({ highlight: data.intro_highlight || '', sub: data.intro_sub || '' });
                setSections((data.sections || []).map(s => ({ ...s, _key: Math.random().toString(36).slice(2), expanded: false })));
            });
        }
    }, [id, isNew]);

    const setMetaField = (field, value) => {
        setMeta(prev => ({
            ...prev,
            [field]: value,
            ...(field === 'title' && isNew ? { slug: makeSlug(value) } : {}),
        }));
    };

    const addTag = (e) => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
            e.preventDefault();
            setMeta(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
            setTagInput('');
        }
    };

    const removeTag = (tag) => setMeta(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));

    const updateSection = (key, field, value) =>
        setSections(prev => prev.map(s => s._key === key ? { ...s, [field]: value } : s));

    const updateParagraph = (key, idx, value) =>
        setSections(prev => prev.map(s => s._key === key
            ? { ...s, paragraphs: s.paragraphs.map((p, i) => i === idx ? value : p) }
            : s));

    const addParagraph = (key) =>
        setSections(prev => prev.map(s => s._key === key ? { ...s, paragraphs: [...s.paragraphs, ''] } : s));

    const removeParagraph = (key, idx) =>
        setSections(prev => prev.map(s => s._key === key
            ? { ...s, paragraphs: s.paragraphs.filter((_, i) => i !== idx) }
            : s));

    const toggleCallout = (key) =>
        setSections(prev => prev.map(s => s._key === key
            ? { ...s, callout: s.callout ? null : { type: 'amber', label: 'Percepção chave', text: '' } }
            : s));

    const updateCallout = (key, field, value) =>
        setSections(prev => prev.map(s => s._key === key
            ? { ...s, callout: { ...s.callout, [field]: value } }
            : s));

    const removeSection = (key) => setSections(prev => prev.filter(s => s._key !== key));

    const toggleExpanded = (key) =>
        setSections(prev => prev.map(s => s._key === key ? { ...s, expanded: !s.expanded } : s));

    const buildPayload = (status) => ({
        title: meta.title,
        slug: meta.slug,
        excerpt: meta.excerpt,
        cover_type: meta.cover_type,
        cover_letter: meta.cover_letter,
        category: meta.category,
        tags: meta.tags,
        author: meta.author,
        created_at: meta.created_at,
        intro_highlight: intro.highlight,
        intro_sub: intro.sub,
        sections: sections.map(({ _key, expanded, ...s }) => s),
        status,
    });

    const save = async (status) => {
        if (!meta.title.trim()) { alert('Preencha o título antes de salvar.'); return; }
        if (!meta.slug.trim()) { alert('Preencha o slug antes de salvar.'); return; }
        setSaving(true);
        const payload = buildPayload(status);
        if (isNew) {
            const { data, error } = await supabase.from('articles').insert(payload).select('id').single();
            if (error) { alert('Erro ao salvar: ' + error.message); setSaving(false); return; }
            navigate(`/admin/artigos/${data.id}`, { replace: true });
        } else {
            const { error } = await supabase.from('articles').update(payload).eq('id', id);
            if (error) { alert('Erro ao salvar: ' + error.message); setSaving(false); return; }
        }
        setSaving(false);
    };

    return (
        <div className="flex h-full">
            {/* Editor principal */}
            <div className="flex-1 overflow-auto p-8 border-r border-white/[0.05]">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link to="/admin/artigos" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">← Artigos</Link>
                        <h1 className="text-white font-bold text-xl mt-1">{isNew ? 'Novo Artigo' : 'Editar Artigo'}</h1>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => save('draft')}
                            disabled={saving}
                            className="border border-white/10 text-zinc-400 text-xs font-medium px-4 py-2 rounded hover:border-white/20 hover:text-white transition-colors disabled:opacity-40"
                        >
                            Salvar rascunho
                        </button>
                        <button
                            onClick={() => save('published')}
                            disabled={saving}
                            className="bg-[#FF5A1F] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-[#FF6B00] transition-colors disabled:opacity-40"
                        >
                            Publicar
                        </button>
                    </div>
                </div>

                {/* Introdução */}
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-5 mb-4">
                    <span className="text-zinc-600 text-[9px] tracking-[0.12em] uppercase block mb-4">Introdução</span>
                    <textarea
                        rows={3}
                        className={textareaCls + " mb-3"}
                        placeholder="Parágrafo de destaque (intro_highlight)..."
                        value={intro.highlight}
                        onChange={e => setIntro(p => ({ ...p, highlight: e.target.value }))}
                    />
                    <textarea
                        rows={2}
                        className={textareaCls}
                        placeholder="Parágrafo secundário (intro_sub)..."
                        value={intro.sub}
                        onChange={e => setIntro(p => ({ ...p, sub: e.target.value }))}
                    />
                </div>

                {/* Seções */}
                {sections.map((section, idx) => (
                    <div
                        key={section._key}
                        className="bg-white/[0.02] border border-white/[0.06] rounded-lg mb-3 overflow-hidden"
                    >
                        {/* Header da seção */}
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.05]">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <select
                                    value={section.icon}
                                    onChange={e => updateSection(section._key, 'icon', e.target.value)}
                                    className="bg-[#FF5A1F]/10 border border-[#FF5A1F]/20 text-[#FF5A1F] text-[10px] rounded px-2 py-1 outline-none"
                                >
                                    {ICONS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
                                </select>
                                <input
                                    className="flex-1 bg-transparent text-white text-sm font-medium outline-none placeholder:text-zinc-700"
                                    placeholder={`${idx + 1}. Título da seção`}
                                    value={section.title}
                                    onChange={e => updateSection(section._key, 'title', e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 ml-3">
                                {!section.expanded && (
                                    <span className="text-zinc-700 text-[9px]">
                                        {section.paragraphs.filter(Boolean).length}p{section.callout ? ' · callout' : ''}
                                    </span>
                                )}
                                <button onClick={() => toggleExpanded(section._key)} className="text-zinc-600 hover:text-zinc-400 transition-colors">
                                    {section.expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>
                                <button onClick={() => removeSection(section._key)} className="text-zinc-700 hover:text-red-400 transition-colors">
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        </div>

                        {section.expanded && (
                            <div className="p-5">
                                {/* Parágrafos */}
                                <div className="flex flex-col gap-2 mb-3">
                                    {section.paragraphs.map((p, pIdx) => (
                                        <div key={pIdx} className="flex gap-2">
                                            <textarea
                                                rows={2}
                                                className={textareaCls + " flex-1"}
                                                placeholder={`Parágrafo ${pIdx + 1}...`}
                                                value={p}
                                                onChange={e => updateParagraph(section._key, pIdx, e.target.value)}
                                            />
                                            {section.paragraphs.length > 1 && (
                                                <button
                                                    onClick={() => removeParagraph(section._key, pIdx)}
                                                    className="text-zinc-700 hover:text-red-400 transition-colors self-start mt-2"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => addParagraph(section._key)}
                                    className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors mb-4"
                                >
                                    + parágrafo
                                </button>

                                {/* Callout */}
                                {!section.callout ? (
                                    <button
                                        onClick={() => toggleCallout(section._key)}
                                        className="text-zinc-700 text-xs hover:text-zinc-500 transition-colors border border-dashed border-white/[0.06] px-3 py-1.5 rounded"
                                    >
                                        + callout opcional
                                    </button>
                                ) : (
                                    <div className="bg-amber-500/[0.05] border border-amber-500/[0.15] rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={section.callout.type}
                                                    onChange={e => updateCallout(section._key, 'type', e.target.value)}
                                                    className="bg-transparent border border-white/[0.08] text-zinc-400 text-[10px] rounded px-2 py-1 outline-none"
                                                >
                                                    {CALLOUT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                                </select>
                                                <input
                                                    className="bg-transparent text-zinc-400 text-xs outline-none placeholder:text-zinc-700"
                                                    placeholder="Label do callout"
                                                    value={section.callout.label}
                                                    onChange={e => updateCallout(section._key, 'label', e.target.value)}
                                                />
                                            </div>
                                            <button onClick={() => toggleCallout(section._key)} className="text-zinc-700 hover:text-red-400 transition-colors text-xs">remover</button>
                                        </div>
                                        <textarea
                                            rows={2}
                                            className={textareaCls}
                                            placeholder="Texto do callout..."
                                            value={section.callout.text}
                                            onChange={e => updateCallout(section._key, 'text', e.target.value)}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                <button
                    onClick={() => setSections(prev => [...prev, emptySection()])}
                    className="w-full border border-dashed border-white/[0.08] rounded-lg py-3 text-zinc-600 text-sm hover:border-white/[0.15] hover:text-zinc-400 transition-colors"
                >
                    + Adicionar seção
                </button>
            </div>

            {/* Metadados */}
            <div className="w-56 flex-shrink-0 p-6 overflow-auto bg-[#080808]">
                <span className="text-zinc-600 text-[9px] tracking-[0.12em] uppercase block mb-5">Metadados</span>

                <Field label="Título">
                    <input className={inputCls} placeholder="Título do artigo" value={meta.title} onChange={e => setMetaField('title', e.target.value)} />
                </Field>

                <Field label="Slug">
                    <input className={inputCls} placeholder="meu-artigo" value={meta.slug} onChange={e => setMetaField('slug', e.target.value)} />
                </Field>

                <Field label="Excerpt">
                    <textarea rows={3} className={textareaCls} placeholder="Resumo para o card..." value={meta.excerpt} onChange={e => setMetaField('excerpt', e.target.value)} />
                </Field>

                <Field label="Capa + Letra">
                    <CoverPicker
                        coverType={meta.cover_type}
                        coverLetter={meta.cover_letter}
                        onCover={v => setMetaField('cover_type', v)}
                        onLetter={v => setMetaField('cover_letter', v)}
                    />
                </Field>

                <Field label="Categoria">
                    <input className={inputCls} placeholder="Estudo de Caso" value={meta.category} onChange={e => setMetaField('category', e.target.value)} />
                </Field>

                <Field label="Tags">
                    <TagSelector
                        selected={meta.tags}
                        onChange={tags => setMeta(prev => ({ ...prev, tags }))}
                    />
                </Field>

                <Field label="Autor">
                    <select
                        className={inputCls}
                        value={meta.author}
                        onChange={e => setMetaField('author', e.target.value)}
                    >
                        {AUTHORS.map(a => (
                            <option key={a.value} value={a.value}>{a.label}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Data">
                    <input type="date" className={inputCls} value={meta.created_at} onChange={e => setMetaField('created_at', e.target.value)} />
                </Field>
            </div>
        </div>
    );
};

export default ArticleEditor;
