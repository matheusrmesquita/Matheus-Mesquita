import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Upload, Trash2, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { TAGS } from '@/constants/tags';

const makeSlug = (title) =>
    title.toLowerCase()
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim().replace(/\s+/g, '-');

const COVERS = [
    { id: 'cover-orbita',   label: 'Orbita',   color: '#1a1a2e' },
    { id: 'cover-nexus',    label: 'Nexus',    color: '#0f2027' },
    { id: 'cover-lumina',   label: 'Lumina',   color: '#1a0a00' },
    { id: 'cover-veritas',  label: 'Veritas',  color: '#0a001a' },
    { id: 'cover-fluxo',    label: 'Fluxo',    color: '#001a0a' },
    { id: 'cover-kairos',   label: 'Kairos',   color: '#1a0a0a' },
    { id: 'cover-meridian', label: 'Meridian', color: '#0a0a1a' },
    { id: 'cover-apex',     label: 'Apex',     color: '#1a1000' },
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const inputCls = "w-full bg-white/[0.03] border border-white/[0.08] rounded-md px-3 py-2.5 text-white text-sm outline-none focus:border-white/20 transition-colors placeholder:text-zinc-700";
const textareaCls = inputCls + " resize-none";
const Field = ({ label, children }) => (
    <div className="mb-5">
        <label className="block text-zinc-500 text-[9px] tracking-[0.12em] uppercase mb-2">{label}</label>
        {children}
    </div>
);

const ProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [toast, setToast] = useState('');

    const [form, setForm] = useState({
        title: '', slug: '', description: '', category: 'UI Design',
        role: '', context: '', process: '', technique: '', aesthetics: '',
        framer_link: '', figma_link: '',
        cover_type: 'cover-orbita', cover_letter: 'A',
        tags: [], gallery_urls: [],
        created_at: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (!isNew) {
            supabase.from('projects').select('*').eq('id', id).single().then(({ data }) => {
                if (!data) return;
                setForm({
                    title: data.title || '',
                    slug: data.slug || '',
                    description: data.description || '',
                    category: data.category || 'UI Design',
                    role: data.role || '',
                    context: data.context || '',
                    process: data.process || '',
                    technique: data.technique || '',
                    aesthetics: data.aesthetics || '',
                    framer_link: data.framer_link || '',
                    figma_link: data.figma_link || '',
                    cover_type: data.cover_type || 'cover-orbita',
                    cover_letter: data.cover_letter || 'A',
                    tags: data.tags || [],
                    gallery_urls: data.gallery_urls || [],
                    created_at: data.created_at?.split('T')[0] || '',
                });
            });
        }
    }, [id, isNew]);

    const set = (field, value) => setForm(prev => ({
        ...prev,
        [field]: value,
        ...(field === 'title' && isNew ? { slug: makeSlug(value) } : {}),
    }));

    const uploadImage = async (file, folder) => {
        const ext = file.name.split('.').pop();
        const path = `${folder}/${Date.now()}.${ext}`;
        const { error } = await supabase.storage.from('projects').upload(path, file);
        if (error) { alert('Erro no upload: ' + error.message); return null; }
        const { data: { publicUrl } } = supabase.storage.from('projects').getPublicUrl(path);
        return publicUrl;
    };

    const handleGalleryUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploading(true);
        const urls = await Promise.all(files.map(f => uploadImage(f, `gallery/${form.slug || 'novo'}`)));
        const valid = urls.filter(Boolean);
        setForm(prev => ({ ...prev, gallery_urls: [...prev.gallery_urls, ...valid] }));
        setUploading(false);
    };

    const removeGallery = (url) =>
        setForm(prev => ({ ...prev, gallery_urls: prev.gallery_urls.filter(u => u !== url) }));

    const save = async (status) => {
        if (!form.title.trim()) { alert('Preencha o título antes de salvar.'); return; }
        if (!form.slug.trim()) { alert('Preencha o slug antes de salvar.'); return; }
        setSaving(true);
        const payload = {
            title: form.title,
            slug: form.slug,
            description: form.description,
            category: form.category,
            role: form.role || null,
            context: form.context || null,
            process: form.process || null,
            technique: form.technique || null,
            aesthetics: form.aesthetics || null,
            framer_link: form.framer_link || null,
            figma_link: form.figma_link || null,
            cover_type: form.cover_type,
            cover_letter: form.cover_letter,
            tags: form.tags,
            gallery_urls: form.gallery_urls,
            created_at: form.created_at,
            status,
        };
        if (isNew) {
            const { data, error } = await supabase.from('projects').insert(payload).select('id').single();
            if (error) { alert('Erro ao salvar: ' + error.message); setSaving(false); return; }
            navigate(`/admin/projetos/${data.id}`, { replace: true });
        } else {
            const { error } = await supabase.from('projects').update(payload).eq('id', id);
            if (error) { alert('Erro ao salvar: ' + error.message); setSaving(false); return; }
        }
        setSaving(false);
        const msg = status === 'published' ? 'Projeto publicado com sucesso!' : 'Rascunho salvo.';
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    return (
        <div className="p-8 max-w-2xl">
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-zinc-900 border border-white/10 text-white text-xs font-semibold px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <span className="text-green-400">✓</span> {toast}
                </div>
            )}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Link to="/admin/projetos" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors">← Projetos</Link>
                    <h1 className="text-white font-bold text-xl mt-1">{isNew ? 'Novo Projeto' : 'Editar Projeto'}</h1>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => save('draft')} disabled={saving || uploading}
                        className="border border-white/10 text-zinc-400 text-xs font-medium px-4 py-2 rounded hover:border-white/20 hover:text-white transition-colors disabled:opacity-40">
                        Salvar rascunho
                    </button>
                    <button onClick={() => save('published')} disabled={saving || uploading}
                        className="bg-[#FF5A1F] text-white text-xs font-semibold px-4 py-2 rounded hover:bg-[#FF6B00] transition-colors disabled:opacity-40">
                        Publicar
                    </button>
                </div>
            </div>

            {/* ─── Identidade ─── */}
            <Field label="Título">
                <input className={inputCls} placeholder="Nome do projeto" value={form.title} onChange={e => set('title', e.target.value)} />
            </Field>
            <Field label="Slug (URL)">
                <input className={inputCls} placeholder="nome-do-projeto" value={form.slug} onChange={e => set('slug', e.target.value)} />
            </Field>
            <Field label="Descrição do Card">
                <textarea rows={2} className={textareaCls} placeholder="Resumo curto para o card..." value={form.description} onChange={e => set('description', e.target.value)} />
            </Field>
            <Field label="Categoria">
                <input className={inputCls} placeholder="UI Design" value={form.category} onChange={e => set('category', e.target.value)} />
            </Field>
            <Field label="Role / Serviço">
                <input className={inputCls} placeholder="Ex: UX/UI Design / Framer Developer" value={form.role} onChange={e => set('role', e.target.value)} />
            </Field>

            {/* ─── Conteúdo narrativo ─── */}
            <Field label="Contexto / Estratégia">
                <textarea rows={5} className={textareaCls} placeholder="Descreva o contexto e desafio do projeto..." value={form.context} onChange={e => set('context', e.target.value)} />
            </Field>
            <Field label="Processo / Plano de Crescimento">
                <textarea rows={4} className={textareaCls} placeholder="Descreva o processo de trabalho..." value={form.process} onChange={e => set('process', e.target.value)} />
            </Field>
            <Field label="Técnica / Performance & ROI">
                <textarea rows={4} className={textareaCls} placeholder="Descreva as técnicas e ferramentas usadas..." value={form.technique} onChange={e => set('technique', e.target.value)} />
            </Field>
            <Field label="Estética / Presença de Marca">
                <textarea rows={3} className={textareaCls} placeholder="Descreva a direção estética (opcional)..." value={form.aesthetics} onChange={e => set('aesthetics', e.target.value)} />
            </Field>

            {/* ─── Links ─── */}
            <Field label="Link Framer (URL completa)">
                <input className={inputCls} placeholder="https://..." value={form.framer_link} onChange={e => set('framer_link', e.target.value)} />
            </Field>
            <Field label="Link Figma (embed URL)">
                <input className={inputCls} placeholder="https://www.figma.com/embed?..." value={form.figma_link} onChange={e => set('figma_link', e.target.value)} />
            </Field>

            {/* ─── Tags ─── */}
            <Field label="Tags">
                <div className="flex flex-wrap gap-1.5">
                    {TAGS.map(tag => {
                        const active = form.tags.includes(tag);
                        return (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => setForm(p => ({ ...p, tags: active ? p.tags.filter(t => t !== tag) : [...p.tags, tag] }))}
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
            </Field>

            {/* ─── Data ─── */}
            <Field label="Data">
                <input type="date" className={inputCls} value={form.created_at} onChange={e => set('created_at', e.target.value)} />
            </Field>

            {/* ─── Cover Picker ─── */}
            <Field label="Capa Conceitual">
                <div className="grid grid-cols-4 gap-2 mb-3">
                    {COVERS.map(c => (
                        <button
                            key={c.id}
                            onClick={() => set('cover_type', c.id)}
                            className={`py-2 px-1 rounded text-[9px] font-bold tracking-wider transition-all border ${
                                form.cover_type === c.id
                                    ? 'border-[#FF5A1F] text-[#FF5A1F] bg-[#FF5A1F]/10'
                                    : 'border-white/[0.08] text-zinc-600 hover:border-white/20 hover:text-zinc-400'
                            }`}
                            style={{ background: form.cover_type === c.id ? undefined : c.color + '88' }}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </Field>

            <Field label="Letra da Capa">
                <div className="flex flex-wrap gap-1.5">
                    {LETTERS.map(l => (
                        <button
                            key={l}
                            onClick={() => set('cover_letter', l)}
                            className={`w-7 h-7 rounded text-[10px] font-black transition-all ${
                                form.cover_letter === l
                                    ? 'bg-[#FF5A1F] text-white'
                                    : 'bg-white/[0.03] text-zinc-600 hover:bg-white/[0.06] hover:text-zinc-300'
                            }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>
            </Field>



            {/* ─── Galeria ─── */}
            <Field label="Galeria (múltiplas imagens)">
                <div className="grid grid-cols-3 gap-2 mb-2">
                    {form.gallery_urls.map(url => (
                        <div key={url} className="relative group">
                            <img src={url} alt="" className="w-full h-24 object-cover rounded border border-white/[0.08]" />
                            <button onClick={() => removeGallery(url)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <X size={10} />
                            </button>
                        </div>
                    ))}
                </div>
                <label className="flex items-center gap-2 border border-dashed border-white/[0.1] rounded-lg px-4 py-3 cursor-pointer hover:border-white/[0.2] transition-colors">
                    <Upload size={14} className="text-zinc-600" />
                    <span className="text-zinc-600 text-xs">{uploading ? 'Enviando...' : 'Adicionar imagens à galeria'}</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} disabled={uploading} />
                </label>
            </Field>
        </div>
    );
};

export default ProjectForm;
