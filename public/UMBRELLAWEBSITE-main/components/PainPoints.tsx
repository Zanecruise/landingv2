
import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLanguage } from './LanguageContext';

const PainPoints: React.FC = () => {
  useScrollReveal();
  const { t } = useLanguage();

  const cardData = [
    { key: 'heterogeneity', delay: '0.2s' },
    { key: 'operationalRisk', delay: '0.35s' },
    { key: 'regulatoryPressure', delay: '0.5s' }
  ];

  return (
    <section id="pain-points" className="section-container container mx-auto px-6 py-20 md:py-32">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4 scroll-reveal">{t('painPoints.supertitle')}</h2>
        <h3 className="text-center text-3xl md:text-5xl font-bold tracking-tighter mb-16 scroll-reveal" style={{ transitionDelay: '0.1s' }}>{t('painPoints.title')}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map(card => (
            <div 
              key={card.key}
              className="glass-effect p-6 rounded-lg text-center transition-all duration-300 transform hover:-translate-y-1 hover:border-[var(--accent-primary)] scroll-reveal" 
              style={{ transitionDelay: card.delay }}
            >
              <h4 className="font-bold text-lg mb-2">{t(`painPoints.cards.${card.key}.title`)}</h4>
              <p className="text-[var(--text-subtle)] text-sm">{t(`painPoints.cards.${card.key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;