
import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLanguage } from './LanguageContext';

const JourneyStep: React.FC<{ title: string; children: React.ReactNode; isLast?: boolean; delay?: string }> = ({ title, children, isLast = false, delay = '0s' }) => (
    <div 
        className={`relative pl-12 ${isLast ? '' : 'pb-10'} scroll-reveal`}
        style={{ transitionDelay: delay }}
    >
        {!isLast && <div className="absolute left-6 top-6 bottom-[-2.5rem] w-0.5 bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-30"></div>}
        <div className="absolute left-6 top-6 w-3 h-3 rounded-full bg-[var(--background-primary)] border-2 border-[var(--accent-primary)] -translate-x-1/2"></div>
        <h4 className="text-2xl font-bold gradient-text mb-2">{title}</h4>
        <div className="text-[var(--text-subtle)]">{children}</div>
    </div>
);


const CustomerJourney: React.FC = () => {
    useScrollReveal();
    const { t } = useLanguage();

  return (
    <section id="solucoes" className="section-container py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 scroll-reveal">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">{t('customerJourney.supertitle')}</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('customerJourney.title')}</h3>
        </div>
        <div className="max-w-3xl mx-auto">
            <JourneyStep title={t('customerJourney.steps.ingestion.title')} delay="0s">
                <p>{t('customerJourney.steps.ingestion.text')}</p>
            </JourneyStep>

            <JourneyStep title={t('customerJourney.steps.validation.title')} delay="0.2s">
                <p dangerouslySetInnerHTML={{ __html: t('customerJourney.steps.validation.text') }}></p>
            </JourneyStep>

            <JourneyStep title={t('customerJourney.steps.evidence.title')} isLast delay="0.4s">
                 <p>{t('customerJourney.steps.evidence.text')}</p>
            </JourneyStep>
        </div>
      </div>
    </section>
  );
};

export default CustomerJourney;
