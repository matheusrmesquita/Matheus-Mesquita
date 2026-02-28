import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="w-full border-t border-slate-200 dark:border-white/10 py-8 mt-12 transition-colors">
            <div className="mx-4 md:mx-8 lg:mx-[150px] flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    {t('footer.rights').replace('{year}', new Date().getFullYear())}
                </p>
                <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                    <a href="https://www.linkedin.com/in/matheusrmesquita/" target="_blank" rel="noopener noreferrer" className="hover:text-[#38889F] transition-colors">LinkedIn</a>
                    <a href="https://www.behance.net/matheusrmesquita" target="_blank" rel="noopener noreferrer" className="hover:text-[#38889F] transition-colors">Behance</a>
                    <a href="https://github.com/matheusrmesquita" target="_blank" rel="noopener noreferrer" className="hover:text-[#38889F] transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
