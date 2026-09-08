import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
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
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl shadow-sm py-2' : 'bg-transparent py-4'}`}>
            {/* Master Grid — colunas simétricas (4/4/4) para o menu ficar centralizado de verdade */}
            <div className="mx-4 md:mx-8 lg:mx-[150px] grid grid-cols-12 gap-6 items-center">

                {/* Logo */}
                <div className="col-span-8 md:col-span-4 flex justify-start items-center">
                    <Link to="/" className="font-bold text-2xl tracking-tighter flex items-center gap-1">
                        <span className="text-slate-900 dark:text-white">Matheus Mesquita</span>
                    </Link>
                </div>

                {/* Desktop Nav (Centralizado) */}
                <div className="hidden md:flex col-span-4 items-center justify-center gap-2 lg:gap-2 xl:gap-8 font-medium text-sm lg:text-[13px] xl:text-base text-slate-900 dark:text-white whitespace-nowrap">
                    <Link to="/" className={`transition-colors ${isActive('/') ? 'text-[#38889F]' : 'hover:text-[#38889F]'}`}>{t('nav.home')}</Link>
                    <Link to="/sobre" className={`transition-colors ${isActive('/sobre') ? 'text-[#38889F]' : 'hover:text-[#38889F]'}`}>{t('nav.about')}</Link>
                    <Link to="/projetos" className={`transition-colors ${isActive('/projetos') ? 'text-[#38889F]' : 'hover:text-[#38889F]'}`}>{t('nav.projects')}</Link>
                    <Link to="/artigos" className={`transition-colors ${isActive('/artigos') ? 'text-[#38889F]' : 'hover:text-[#38889F]'}`}>{t('nav.articles')}</Link>
                </div>

                {/* Desktop Actions (Right - 4 cols) */}
                <div className="hidden md:flex col-span-4 justify-end items-center gap-1">
                    {/* Controls */}
                    <div className="flex items-center gap-1">
                        <LanguageToggle />
                    </div>

                    <a
                        href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <InteractiveHoverButton text={t('nav.contact')} className="bg-[#38889F] border-[#38889F] text-white py-2 px-3 lg:px-4 xl:px-8 text-sm lg:text-base" />
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden col-span-4 justify-end items-center gap-4">
                    <LanguageToggle />
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-900 dark:text-white">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`md:hidden absolute top-full w-full left-0 transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                <div className="flex flex-col px-6 py-6 gap-4 font-medium backdrop-blur-3xl bg-white/95 dark:bg-zinc-950/95 shadow-2xl">
                    <Link to="/" onClick={() => setIsOpen(false)} className={`transition-colors p-2 ${isActive('/') ? 'text-[#38889F]' : 'text-slate-900 dark:text-white hover:text-[#38889F]'}`}>{t('nav.home')}</Link>
                    <Link to="/sobre" onClick={() => setIsOpen(false)} className={`transition-colors p-2 ${isActive('/sobre') ? 'text-[#38889F]' : 'text-slate-900 dark:text-white hover:text-[#38889F]'}`}>{t('nav.about')}</Link>
                    <Link to="/projetos" onClick={() => setIsOpen(false)} className={`transition-colors p-2 ${isActive('/projetos') ? 'text-[#38889F]' : 'text-slate-900 dark:text-white hover:text-[#38889F]'}`}>{t('nav.projects')}</Link>
                    <Link to="/artigos" onClick={() => setIsOpen(false)} className={`transition-colors p-2 ${isActive('/artigos') ? 'text-[#38889F]' : 'text-slate-900 dark:text-white hover:text-[#38889F]'}`}>{t('nav.articles')}</Link>
                    <a
                        href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center px-5 py-4 mt-2 rounded bg-[#38889F] text-white font-bold active:bg-[#2b6d80] transition-colors"
                    >
                        {t('nav.contact')}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
