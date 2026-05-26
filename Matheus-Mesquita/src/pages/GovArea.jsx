import React, { useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

const GovArea = () => {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('gov_auth') === 'true');
    const [error, setError] = useState(false);

    // Senha mockada para validação (conforme RF-02)
    const masterPassword = "admin";

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === masterPassword) {
            setIsAuthenticated(true);
            sessionStorage.setItem('gov_auth', 'true');
            setError(false);
        } else {
            setError(true);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center mx-4 md:mx-8 lg:mx-[150px] animate-in fade-in duration-500">
                <div className="glass p-8 md:p-12 rounded-3xl w-full max-w-md bg-white/50 dark:bg-black/40 shadow-2xl relative overflow-hidden">
                    {/* Efeito de brilho de fundo (Gov Theme) */}
                    <div className="absolute -top-32 -left-32 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full point-events-none"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-slate-900 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-white/10">
                            <Lock className="text-amber-500 w-8 h-8" />
                        </div>

                        <h1 className="text-2xl font-bold mb-2">Área Restrita (GOV)</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                            Acesso exclusivo a projetos confidenciais e infraestrutura governamental.
                        </p>

                        <form onSubmit={handleLogin} className="w-full space-y-4">
                            <div>
                                <input
                                    type="password"
                                    placeholder="Insira a chave de acesso"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-black/50 border ${error ? 'border-red-500' : 'border-slate-200 dark:border-white/10'} focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all font-medium`}
                                />
                                {error && <p className="text-red-500 text-xs text-left mt-2">Chave de acesso incorreta. Tente novamente.</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold py-3 px-4 rounded-xl hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-slate-900 transition-colors"
                            >
                                Desbloquear Acesso
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-4 md:mx-8 lg:mx-[150px] animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-8 h-8 text-amber-500" />
                <h1 className="text-3xl md:text-4xl font-bold">Portal Confidencial</h1>
            </div>

            <div className="glass p-8 rounded-3xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/5">
                <h2 className="text-xl font-bold mb-4">Projetos Governamentais (SEI & Athex)</h2>
                <p className="text-slate-600 dark:text-slate-300">
                    Bem-vindo à área segura. Aqui detalharemos os fluxos de arquitetura e decisões de design aplicadas em ambientes de alta criticidade, como o redesign expresso de 7 horas do Portal SEI.
                </p>
                {/* O conteúdo rico virá nas próximas etapas */}
            </div>
        </div>
    );
};

export default GovArea;
