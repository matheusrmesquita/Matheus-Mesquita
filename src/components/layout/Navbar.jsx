import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { Menu, X, Instagram, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { InteractiveHoverButton } from '@/components/ui/InteractiveHoverButton';

// Ícone Behance como SVG inline (paths extraídos do arquivo enviado)
const BehanceIcon = ({ className }) => (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="m43.9 46.1c1.4-2.2 2.2-4.7 2.1-7.5-.1-7.4-6.3-13.2-13.6-13.2h-20.7c-1 0-1.7.8-1.7 1.7v45.2c0 1 .8 1.7 1.7 1.7h23c8.5 0 15.6-6.8 15.6-15.4 0-5.1-2.5-9.7-6.4-12.5zm-24.9-11.7h13.5c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4h-13.5zm16 30.7h-16v-12.8h16c3.5 0 6.4 2.9 6.4 6.4s-2.9 6.4-6.4 6.4z" />
        <path d="m89.9 55.5c0-10.5-8.3-19.1-18.5-19.1s-18.5 8.6-18.5 19.1 8.3 19.1 18.5 19.1c6.2 0 12-3.2 15.4-8.5.4-.7.8-1.4 1.2-2.1.3-.5-.1-1.1-.7-1.1h-9.1c-.2 0-.4.1-.5.2-1.7 1.7-3.8 2.5-6.2 2.5-4.5 0-8.3-3.4-9.3-7.9h26c1 0 1.8-.8 1.8-1.8zm-18.5-10.1c3.3 0 6.2 1.8 7.9 4.6h-15.9c1.7-2.7 4.7-4.6 8-4.6z" />
        <path d="m79.1 34.2h-16.5c-.8 0-1.4-.6-1.4-1.4v-4.1c0-.8.6-1.4 1.4-1.4h16.4c.8 0 1.4.6 1.4 1.4v4.1c.1.7-.6 1.4-1.3 1.4z" />
    </svg>
);


const socialLinks = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/uxmesquita',
        icon: Instagram,
        hoverColor: 'hover:text-[#E1306C] dark:hover:text-[#E1306C]',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/matheusrmesquita',
        icon: Linkedin,
        hoverColor: 'hover:text-[#0077B5] dark:hover:text-[#0077B5]',
    },
    {
        label: 'Behance',
        href: 'https://www.behance.net/matheusrmesquita', // ← confirme o URL
        icon: BehanceIcon,
        hoverColor: 'hover:text-[#1769ff] dark:hover:text-[#1769ff]',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/matheusrmesquita', // ← confirme o URL
        icon: Github,
        hoverColor: 'hover:text-slate-900 dark:hover:text-white',
    },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl shadow-sm py-2' : 'bg-transparent py-4'}`}>
            {/* Master Grid */}
            <div className="mx-4 md:mx-8 lg:mx-[150px] grid grid-cols-12 gap-6 items-center">

                {/* Logo */}
                <div className="col-span-8 md:col-span-3 flex justify-start items-center">
                    <Link to="/" className="font-bold text-2xl tracking-tighter flex items-center gap-1">
                        <span className="text-slate-900 dark:text-white">Matheus Mesquita</span>
                    </Link>
                </div>

                {/* Desktop Nav (Center - 5 cols) */}
                <div className="hidden md:flex col-span-5 items-center justify-center gap-8 font-medium text-slate-900 dark:text-white">
                    <Link to="/" className="hover:text-[#38889F] transition-colors">{t('nav.home')}</Link>
                    <Link to="/sobre" className="hover:text-[#38889F] transition-colors">{t('nav.about')}</Link>
                </div>

                {/* Desktop Actions (Right - 4 cols) */}
                <div className="hidden md:flex col-span-4 justify-end items-center gap-2">
                    {/* Social Icons */}
                    <div className="flex items-center gap-1">
                        {socialLinks.map(({ label, href, icon: Icon, hoverColor }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`p-1.5 text-slate-400 dark:text-slate-500 ${hoverColor} transition-colors`}
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>

                    <a
                        href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <InteractiveHoverButton text={t('nav.contact')} className="bg-[#38889F] border-[#38889F] text-white py-2" />
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
                    <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-[#38889F] transition-colors text-slate-900 dark:text-white p-2">{t('nav.home')}</Link>
                    <Link to="/sobre" onClick={() => setIsOpen(false)} className="hover:text-[#38889F] transition-colors text-slate-900 dark:text-white p-2">{t('nav.about')}</Link>
                    <a
                        href="https://wa.me/5561982863674?text=Ol%C3%A1%2C%20Matheus%21%20Vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20sobre%20um%20projeto.%20%F0%9F%9A%80"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="w-full text-center px-5 py-4 mt-2 rounded-full bg-[#38889F] text-white font-bold active:bg-[#2b6d80] transition-colors"
                    >
                        {t('nav.contact')}
                    </a>

                    {/* Modo Escuro */}
                    <div className="flex items-center justify-between pt-2 px-2 border-t border-slate-200 dark:border-white/10 mt-1">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Modo escuro</span>
                        <ThemeToggle />
                    </div>

                    {/* Redes Sociais */}
                    <div className="flex flex-col gap-2 pt-2 px-2 border-t border-slate-200 dark:border-white/10">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Redes sociais</span>
                        <div className="flex items-center gap-4">
                            {socialLinks.map(({ label, href, icon: Icon, hoverColor }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className={`p-2 text-slate-500 dark:text-slate-400 ${hoverColor} transition-colors`}
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
