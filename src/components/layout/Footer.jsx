import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="brand-section w-full border-t border-white/5 bg-zinc-950/40 py-8 md:py-10 transition-colors mt-24">
            <div className="brand-container flex flex-col md:flex-row justify-between items-center gap-6 flex-wrap">
                <Link to="/" className="text-white font-bold text-[0.9375rem] tracking-tighter hover:text-brand-glow transition-colors">
                    BRAND
                </Link>
                
                <p className="text-zinc-600 text-xs font-medium tracking-wide">
                    {t('footer.rights').replace('{year}', new Date().getFullYear())}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
