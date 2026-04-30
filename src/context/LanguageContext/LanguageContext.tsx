import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { translations } from '../../i18n/translations';
import type { Language, LanguageContextType } from '../../types';

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(() => {
        const savedLang = localStorage.getItem('language') as Language;
        return savedLang || 'es';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    useEffect(() => {
        const handleStorageChange = () => {
            const savedLang = localStorage.getItem('language') as Language;
            if (savedLang && savedLang !== language) {
                setLanguageState(savedLang);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [language]);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    const t = useMemo(() => translations[language], [language]);

    const value: LanguageContextType = useMemo(() => ({
        language,
        setLanguage,
        t
    }), [language, setLanguage, t]);

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageContextProvider');
    }
    return context;
};

export default LanguageContext;
