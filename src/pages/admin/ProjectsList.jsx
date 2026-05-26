import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Eye, EyeOff, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        const { data } = await supabase.from('projects')
            .select('id, title, category, status, created_at')
            .order('created_at', { ascending: false });
        setProjects(data || []);
        setLoading(false);
    };

    useEffect(() => { fetchProjects(); }, []);

    const toggleStatus = async (project) => {
        const newStatus = project.status === 'published' ? 'draft' : 'published';
        await supabase.from('projects').update({ status: newStatus }).eq('id', project.id);
        setProjects(prev => prev.map(p => p.id === project.id ? { ...p, status: newStatus } : p));
    };

    const deleteProject = async (id) => {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) { alert('Erro ao excluir: ' + error.message); return; }
        setProjects(prev => prev.filter(p => p.id !== id));
        setConfirmDeleteId(null);
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-white font-bold text-xl mb-1">Projetos</h1>
                    <p className="text-zinc-600 text-xs">Projetos criados via CMS</p>
                </div>
                <Link
                    to="/admin/projetos/novo"
                    className="flex items-center gap-1.5 bg-[#FF5A1F] text-white text-xs font-semibold px-4 py-2.5 rounded transition-colors hover:bg-[#FF6B00]"
                >
                    <Plus size={13} />
                    Novo Projeto
                </Link>
            </div>

            {loading ? (
                <div className="text-zinc-600 text-sm">Carregando...</div>
            ) : projects.length === 0 ? (
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-10 text-center">
                    <p className="text-zinc-600 text-sm">Nenhum projeto criado ainda.</p>
                    <Link to="/admin/projetos/novo" className="text-[#FF5A1F] text-xs mt-2 inline-block hover:underline">
                        Criar primeiro projeto →
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {projects.map(project => (
                        <div key={project.id}>
                            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-5 py-4 flex items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-white text-sm font-medium truncate">{project.title}</p>
                                    <p className="text-zinc-600 text-xs mt-0.5">
                                        {project.category} · {new Date(project.created_at).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <span className={`text-[9px] px-2 py-1 rounded font-medium tracking-wide ${project.status === 'published' ? 'bg-green-500/10 text-green-400' : 'bg-zinc-800 text-zinc-500'}`}>
                                        {project.status === 'published' ? 'publicado' : 'rascunho'}
                                    </span>
                                    <button
                                        onClick={() => toggleStatus(project)}
                                        className="text-zinc-600 hover:text-zinc-300 transition-colors"
                                        title={project.status === 'published' ? 'Despublicar' : 'Publicar'}
                                    >
                                        {project.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </button>
                                    <Link to={`/admin/projetos/${project.id}`} className="text-zinc-600 hover:text-zinc-300 transition-colors">
                                        <Pencil size={14} />
                                    </Link>
                                    <button
                                        onClick={() => setConfirmDeleteId(project.id)}
                                        className="text-zinc-700 hover:text-red-400 transition-colors"
                                        title="Excluir projeto"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>

                            {confirmDeleteId === project.id && (
                                <div className="bg-red-500/5 border border-red-500/20 rounded-lg px-5 py-3 flex items-center justify-between gap-4 mt-1">
                                    <p className="text-red-400 text-xs font-medium">
                                        Excluir <span className="text-white">"{project.title}"</span> permanentemente? Esta ação não pode ser desfeita.
                                    </p>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => setConfirmDeleteId(null)}
                                            className="text-zinc-500 hover:text-zinc-200 text-xs font-medium transition-colors px-3 py-1.5 border border-white/[0.06] rounded"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => deleteProject(project.id)}
                                            className="bg-red-500/80 hover:bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
                                        >
                                            Sim, excluir
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsList;
