import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { GcpIcon, NvidiaIcon } from './icons/TechIcons';
import { useLanguage } from './LanguageContext';

const Partner: React.FC<{ icon: React.ReactNode; name: string }> = ({ icon, name }) => (
    <div className="text-center opacity-70 hover:opacity-100 transition-opacity">
        {icon}
        <p className="text-xs font-semibold mt-2">{name}</p>
    </div>
);

// Wrapper for consistent icon sizing
const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="h-12 w-12 mx-auto flex items-center justify-center">
        {children}
    </div>
);

// SVG Icon for Governança & Compliance (escudo)
const GovernanceIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 gradient-text" viewBox="0 0 48 48" fill="none">
            <path d="M24 6C24 6 10 10 10 18C10 34 24 42 24 42C24 42 38 34 38 18C38 10 24 6 24 6Z" stroke="currentColor" strokeWidth="2.5" fill="#232936" />
            <path d="M24 22v8" stroke="#00FFD1" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="24" cy="18" r="3" fill="#00FFD1" />
        </svg>
    </IconWrapper>
);

// SVG Icon for Validação Institucional (Checklist)
const ValidationIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 gradient-text" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="8" width="32" height="32" rx="8" fill="#232936" stroke="currentColor" strokeWidth="2.5" />
            <path d="M16 24l6 6 10-10" stroke="#00FFD1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    </IconWrapper>
);

// SVG Icon for Elitte Capital (maior, inspirado na referência)
const ElitteCapitalIcon: React.FC = () => (
    <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-28" viewBox="0 0 140 70" fill="none">
            <text x="50%" y="38" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="28" fill="#D6B08A" letterSpacing="4">ELITTE</text>
            <text x="50%" y="65" textAnchor="middle" fontFamily="serif" fontWeight="bold" fontSize="22" fill="#D6B08A" letterSpacing="4">CAPITAL</text>
        </svg>
    </IconWrapper>
);

// New SVG Icon for SA LAW
const SaLawIcon: React.FC = () => (
    <IconWrapper>
        <div className="h-10 w-10 flex items-center justify-center">
            <span className="font-bold text-xl gradient-text">S|A</span>
        </div>
    </IconWrapper>
);


const Partners: React.FC = () => {
    useScrollReveal();
    const { t } = useLanguage();

  return (
    <section id="parcerias" className="section-container py-20 md:py-32 bg-[var(--background-secondary)]">
      <div className="container mx-auto px-6 text-center scroll-reveal">
        <h3 className="text-2xl font-bold tracking-tighter mb-12">{t('partners.title')}</h3>
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
          <Partner icon={<GcpIcon />} name={t('partners.partners.gcp')} />
          <Partner icon={<NvidiaIcon />} name={t('partners.partners.nvidia')} />
          <Partner icon={<GovernanceIcon />} name={t('partners.partners.governance')} />
          <Partner icon={<ValidationIcon />} name={t('partners.partners.validation')} />
          <Partner icon={<ElitteCapitalIcon />} name={t('partners.partners.elitteCapital')} />
          <Partner icon={<SaLawIcon />} name={t('partners.partners.saLaw')} />
        </div>
      </div>
    </section>
  );
};

export default Partners;