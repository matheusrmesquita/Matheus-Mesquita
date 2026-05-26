import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-white/10 hover:border-[#38889F] transition-all group"
            title={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
        >
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-[#38889F] transition-colors uppercase">
                {language}
            </span>
            <div className="w-6 h-6 rounded-md overflow-hidden flex items-center justify-center">
                {language === 'pt' ? (
                    // Bandeira do Brasil (Emoji ou SVG simplificado)
                    <span className="text-lg">🇧🇷</span>
                ) : (
                    // Bandeira dos EUA
                    <span className="text-lg">🇺🇸</span>
                )}
            </div>
        </motion.button>
    );
};

export default LanguageToggle;
