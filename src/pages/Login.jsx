import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { session } = useAuth();

    useEffect(() => {
        if (session) navigate('/admin', { replace: true });
    }, [session, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setError('Email ou senha inválidos.');
        else navigate('/admin', { replace: true });
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-[#050505] flex items-center justify-center">
            <div className="w-full max-w-sm px-6">
                <div className="text-center mb-8">
                    <span className="text-white font-black text-2xl tracking-[0.2em]">BRAND</span>
                    <span className="block text-[#FF5A1F] text-[10px] tracking-[0.18em] mt-1 uppercase">Área Administrativa</span>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-8 backdrop-blur-xl"
                >
                    <div className="mb-5">
                        <label className="block text-zinc-500 text-[10px] tracking-[0.12em] uppercase mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/[0.04] border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-white/25 transition-colors placeholder:text-zinc-600"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-zinc-500 text-[10px] tracking-[0.12em] uppercase mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full bg-white/[0.04] border border-white/10 rounded-md px-4 py-3 text-white text-sm outline-none focus:border-white/25 transition-colors placeholder:text-zinc-600"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-xs mb-4 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF5A1F] hover:bg-[#FF6B00] text-white font-bold text-sm tracking-[0.08em] uppercase py-3 rounded-md transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
