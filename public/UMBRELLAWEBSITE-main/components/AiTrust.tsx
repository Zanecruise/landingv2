import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { FiLayout, FiShield, FiCpu } from 'react-icons/fi';
import { useLanguage } from './LanguageContext';

const TrustCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay?: string }> = ({ icon, title, children, delay = '0s' }) => (
    <div 
        className="group glass-effect p-8 rounded-2xl text-center transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] hover:border-[var(--accent-secondary)] hover:shadow-[0_0_25px_var(--accent-secondary-shadow)] scroll-reveal"
        style={{ transitionDelay: delay }}
    >
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 rounded-xl flex items-center justify-center transition-all duration-300">
            <div className="text-3xl transition-all duration-300 text-[var(--text-secondary)] group-hover:scale-110 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[var(--accent-primary)] group-hover:to-[var(--accent-secondary)] group-hover:bg-clip-text">
                {icon}
            </div>
        </div>
        <h4 className="font-bold text-xl mb-3 text-[var(--text-primary)]">{title}</h4>
        <p className="text-[var(--text-subtle)] text-sm">{children}</p>
    </div>
);

const AiTrust: React.FC = () => {
  useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="ai-trust" className="section-container container mx-auto px-6 py-20 md:py-32">
      <div className="text-center mb-16 scroll-reveal">
        <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">{t('aiTrust.supertitle')}</h2>
        <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('aiTrust.title')}</h3>
        <p className="max-w-3xl mx-auto text-lg text-[var(--text-subtle)] mt-4">
          {t('aiTrust.subtitle')}
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <TrustCard icon={<FiLayout />} title={t('aiTrust.cards.explainability.title')} delay="0s">
            {t('aiTrust.cards.explainability.text')}
        </TrustCard>
        <TrustCard icon={<FiShield />} title={t('aiTrust.cards.biasMitigation.title')} delay="0.2s">
            {t('aiTrust.cards.biasMitigation.text')}
        </TrustCard>
        <TrustCard icon={<FiCpu />} title={t('aiTrust.cards.robustModels.title')} delay="0.4s">
            {t('aiTrust.cards.robustModels.text')}
        </TrustCard>
      </div>
    </section>
  );
};

export default AiTrust;