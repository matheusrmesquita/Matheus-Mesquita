import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SocialLinks from '@/components/ui/SocialLinks';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="w-full border-t border-white/10 py-8 transition-colors">
            <div className="mx-4 md:mx-8 lg:mx-[150px] flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-slate-400 text-sm font-medium">
                    {t('footer.rights').replace('{year}', new Date().getFullYear())}
                </p>
                <SocialLinks />
            </div>
        </footer>
    );
};

export default Footer;
