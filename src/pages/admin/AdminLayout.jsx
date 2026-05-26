import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, FolderOpen, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: '/admin/artigos', label: 'Artigos', icon: FileText },
    { to: '/admin/projetos', label: 'Projetos', icon: FolderOpen },
];

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (item) => item.exact
        ? location.pathname === item.to
        : location.pathname.startsWith(item.to);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login', { replace: true });
    };

    return (
        <div className="fixed inset-0 bg-[#050505] flex">
            {/* Sidebar */}
            <aside className="w-44 bg-[#0d0d0d] border-r border-white/[0.05] flex flex-col flex-shrink-0">
                <div className="px-4 py-5 border-b border-white/[0.05]">
                    <Link to="/" className="block">
                        <span className="text-white font-black text-sm tracking-[0.2em]">BRAND</span>
                        <span className="block text-[#FF5A1F] text-[9px] tracking-[0.15em] mt-0.5">ADMIN</span>
                    </Link>
                </div>

                <nav className="flex-1 py-4">
                    {navItems.map((item) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-medium transition-colors ${
                                    active
                                        ? 'text-[#FF5A1F] bg-[#FF5A1F]/[0.06] border-l-2 border-[#FF5A1F]'
                                        : 'text-zinc-500 hover:text-zinc-300 border-l-2 border-transparent'
                                }`}
                            >
                                <item.icon size={14} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-4 py-4 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors border-t border-white/[0.05]"
                >
                    <LogOut size={13} />
                    Sair
                </button>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
