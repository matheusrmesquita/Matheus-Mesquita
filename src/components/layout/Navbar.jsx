import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useLanguage();
    const location = useLocation();
    
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-black/75 backdrop-blur-2xl border-white/10 py-2.5 shadow-xl' : 'bg-transparent border-transparent py-4'}`}>
            {/* Master Grid */}
            <div className="brand-section">
                <div className="brand-container grid grid-cols-12 gap-6 items-center">

                {/* Logo */}
                <div className="col-span-8 md:col-span-4 flex justify-start items-center">
                    <Link to="/" className="font-bold text-2xl tracking-tighter flex items-center gap-1">
                        <span className="text-white">BRAND</span>
                    </Link>
                </div>

                {/* Desktop Nav (Center - 4 cols) */}
                <div className="hidden md:flex col-span-4 items-center justify-center gap-8 font-medium text-zinc-400">
                    <Link to="/" className={`transition-colors ${isActive('/') ? 'text-brand-glow' : 'hover:text-white'}`}>{t('nav.home')}</Link>
                    <Link to="/sobre" className={`transition-colors ${isActive('/sobre') ? 'text-brand-glow' : 'hover:text-white'}`}>{t('nav.about')}</Link>
                    <Link to="/projetos" className={`transition-colors ${isActive('/projetos') ? 'text-brand-glow' : 'hover:text-white'}`}>{t('nav.projects')}</Link>
                    <Link to="/artigos" className={`transition-colors ${isActive('/artigos') ? 'text-brand-glow' : 'hover:text-white'}`}>{t('nav.articles')}</Link>
                </div>

                {/* Desktop Actions (Right - 4 cols) */}
                <div className="hidden md:flex col-span-4 justify-end items-center gap-2">
                    <Link
                        to="/login"
                        className="flex items-center justify-center w-8 h-8 rounded text-white/25 hover:text-white/60 transition-colors"
                        title="Admin"
                    >
                        <Lock size={14} />
                    </Link>
                    <a
                        href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#FF5A1F] hover:bg-[#FF6B00] px-6 py-2.5 rounded transition-all duration-300 hover:-translate-y-0.5 group"
                    >
                        {t('nav.contact')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden col-span-4 justify-end items-center gap-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`md:hidden absolute top-full w-full left-0 transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col px-6 py-6 gap-4 font-medium backdrop-blur-3xl bg-black/95 border-t border-white/5 shadow-2xl">
                    <Link to="/" onClick={() => setIsOpen(false)} className={`transition-colors p-2 ${isActive('/') ? 'text-brand-glow' : 'text-zinc-300 hover:text-brand-glow'}`}>{t('nav.home')}</Link>
                    <Link to="/sobre" onClick={() => setIsOpen(false)} className={`transition-colors p-2 ${isActive('/sobre') ? 'text-brand-glow' : 'text-zinc-300 hover:text-brand-glow'}`}>{t('nav.about')}</Link>
                    <Link to="/projetos" onClick={() => setIsOpen(false)} className={`transition-colors p-2 ${isActive('/projetos') ? 'text-brand-glow' : 'text-zinc-300 hover:text-brand-glow'}`}>{t('nav.projects')}</Link>
                    <Link to="/artigos" onClick={() => setIsOpen(false)} className={`transition-colors p-2 ${isActive('/artigos') ? 'text-brand-glow' : 'text-zinc-300 hover:text-brand-glow'}`}>{t('nav.articles')}</Link>
                    <a
                        href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center px-5 py-4 mt-2 rounded-full bg-[#FF5A1F] text-white font-bold active:bg-brand-amber transition-colors"
                    >
                        {t('nav.contact')}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
