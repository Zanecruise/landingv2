import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, options?: { [key: string]: string | number }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold the loaded translations
  const [translations, setTranslations] = useState<Record<Language, any> | null>(null);

  // State for the current language, with logic to determine initial language
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'pt'; // Default for non-browser environments
    }
    const storedLang = localStorage.getItem('language') as Language | null;
    if (storedLang && ['en', 'pt'].includes(storedLang)) {
      return storedLang;
    }
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'pt' ? 'pt' : 'en';
  });

  // Effect to fetch translation files when the component mounts
  useEffect(() => {
    const fetchTranslations = async () => {
        try {
            // Fetch JSON files using absolute paths from the web root
            const [enResponse, ptResponse] = await Promise.all([
                fetch('/locales/en/translation.json'),
                fetch('/locales/pt/translation.json')
            ]);
            // Check if fetches were successful
            if (!enResponse.ok || !ptResponse.ok) {
                throw new Error(`Failed to fetch translation files: EN status ${enResponse.status}, PT status ${ptResponse.status}`);
            }
            // Parse JSON data
            const enData = await enResponse.json();
            const ptData = await ptResponse.json();
            // Set the translations in state
            setTranslations({ en: enData, pt: ptData });
        } catch (error) {
            console.error("Could not load translations:", error);
            // Provide empty objects as a fallback to prevent the app from crashing
            setTranslations({ en: {}, pt: {} });
        }
    };
    fetchTranslations();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to update localStorage and the <html> lang attribute when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  // Memoized translation function for performance
  const t = useCallback((key: string, options?: { [key: string]: string | number }): any => {
    if (!translations) {
      return key;
    }
    
    const keys = key.split('.');
    let result = translations[language];
    try {
      for (const k of keys) {
        if (result === undefined) {
            return key; // Path broken
        }
        result = result[k];
      }

      // If the result is a string, process placeholders
      if (typeof result === 'string') {
        if (options) {
          return result.replace(/\{(\w+)\}/g, (_: any, k: string) => String(options[k] || `{${k}}`));
        }
        return result;
      }

      // For non-string types (like arrays), return as is if it's not undefined.
      // If it is undefined, it means the key was not found.
      return result !== undefined ? result : key;

    } catch (error) {
      console.warn(`Error resolving translation for key: ${key}`, error);
      return key;
    }
  }, [language, translations]); // Recalculates only when language or translations change

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  // The provider renders children immediately. Components will briefly show translation keys
  // before the fetch completes and they re-render with the correct text.
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to easily access the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
