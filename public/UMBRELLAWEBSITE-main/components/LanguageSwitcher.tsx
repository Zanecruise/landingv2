
import React from 'react';
import { useLanguage } from './LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const buttonBaseClasses = "px-3 py-1 text-sm font-semibold transition-colors duration-200 rounded-md";
  const activeClasses = "bg-[var(--accent-primary)]/20 text-[var(--text-primary)]";
  const inactiveClasses = "text-[var(--text-secondary)] hover:bg-white/10";

  return (
    <div className="flex items-center space-x-1 p-1 rounded-lg glass-effect border border-transparent">
      <button
        onClick={() => setLanguage('pt')}
        className={`${buttonBaseClasses} ${language === 'pt' ? activeClasses : inactiveClasses}`}
        aria-pressed={language === 'pt'}
        aria-label="Mudar para Português"
      >
        PT
      </button>
      <div className="h-4 w-px bg-[var(--border-color)]"></div>
      <button
        onClick={() => setLanguage('en')}
        className={`${buttonBaseClasses} ${language === 'en' ? activeClasses : inactiveClasses}`}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
