import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, FolderOpen, Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const Dashboard = () => {
    const [counts, setCounts] = useState({ articles: 0, projects: 0 });

    useEffect(() => {
        const fetchCounts = async () => {
            const [{ count: aCount }, { count: pCount }] = await Promise.all([
                supabase.from('articles').select('*', { count: 'exact', head: true }),
                supabase.from('projects').select('*', { count: 'exact', head: true }),
            ]);
            setCounts({ articles: aCount || 0, projects: pCount || 0 });
        };
        fetchCounts();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-white font-bold text-xl mb-1">Dashboard</h1>
            <p className="text-zinc-600 text-xs mb-8">Bem-vindo ao painel da BRAND.</p>

            <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm">
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <FileText size={13} className="text-zinc-600" />
                        <span className="text-zinc-600 text-[9px] tracking-[0.12em] uppercase">Artigos</span>
                    </div>
                    <span className="text-white font-black text-3xl">{String(counts.articles).padStart(2, '0')}</span>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <FolderOpen size={13} className="text-zinc-600" />
                        <span className="text-zinc-600 text-[9px] tracking-[0.12em] uppercase">Projetos</span>
                    </div>
                    <span className="text-white font-black text-3xl">{String(counts.projects).padStart(2, '0')}</span>
                </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-5 max-w-sm">
                <span className="text-zinc-600 text-[9px] tracking-[0.12em] uppercase block mb-4">Ações Rápidas</span>
                <div className="flex gap-3">
                    <Link
                        to="/admin/artigos/novo"
                        className="flex items-center gap-1.5 bg-[#FF5A1F] text-white text-xs font-semibold px-4 py-2 rounded transition-colors hover:bg-[#FF6B00]"
                    >
                        <Plus size={12} />
                        Novo Artigo
                    </Link>
                    <Link
                        to="/admin/projetos/novo"
                        className="flex items-center gap-1.5 border border-white/10 text-zinc-400 text-xs font-semibold px-4 py-2 rounded transition-colors hover:text-white hover:border-white/20"
                    >
                        <Plus size={12} />
                        Novo Projeto
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
