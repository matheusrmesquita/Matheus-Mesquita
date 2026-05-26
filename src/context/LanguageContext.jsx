import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Tenta recuperar o idioma do localStorage ou usa o idioma do navegador (default pt)
    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem('language');
        if (saved) return saved;
        const browserLang = navigator.language.split('-')[0];
        return translations[browserLang] ? browserLang : 'pt';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.lang = language;
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
    };

    // Função helper para tradução
    const t = (path) => {
        const keys = path.split('.');
        let value = translations[language];

        for (const key of keys) {
            if (value && value[key]) {
                value = value[key];
            } else {
                console.warn(`Translation not found for: ${path}`);
                return path;
            }
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
