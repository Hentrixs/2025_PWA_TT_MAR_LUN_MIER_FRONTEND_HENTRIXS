import { useEffect, useRef } from 'react';
import { useAuthContext } from '../AuthContext/AuthContext';
import { useTranslation } from './LanguageContext';
import { getProfile, updateLanguage as updateLanguageService } from '../../services/authService';
import type { Language } from '../../types';

export const UserLanguageSync = () => {
    const { isLogged } = useAuthContext();
    const { language, setLanguage } = useTranslation();
    const isFirstLoad = useRef(true);
    const lastSyncedLang = useRef<Language | null>(null);

    useEffect(() => {
        if (isLogged) {
            const fetchAndSync = async () => {
                try {
                    const response = await getProfile();
                    if (response.ok && response.data?.user_language) {
                        const backendLang = response.data.user_language as Language;

                        if (backendLang !== language) {
                            if (isFirstLoad.current) {
                                setLanguage(backendLang);
                                lastSyncedLang.current = backendLang;
                            };
                        };

                    };
                } catch (e) {
                    console.error("Error fetching profile for language sync", e);
                }
                isFirstLoad.current = false;
            };
            fetchAndSync();
        } else {
            isFirstLoad.current = true;
        }
    }, [isLogged, setLanguage]);

    useEffect(() => {
        if (isLogged && !isFirstLoad.current) {

            if (lastSyncedLang.current !== language) {
                const syncToBackend = async () => {
                    try {
                        await updateLanguageService(language);
                        lastSyncedLang.current = language;
                    } catch (e) {
                        console.error("Error syncing language to backend", e);
                    }
                };
                syncToBackend();
            }
        }
    }, [language, isLogged]);

    return null; // Este componente no renderiza nada
};
