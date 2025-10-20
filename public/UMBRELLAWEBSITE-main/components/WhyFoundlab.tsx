import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { useLanguage } from './LanguageContext';
import { FiChevronDown } from 'react-icons/fi';

// --- Accordion Component ---
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemProps[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default first item open

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `accordion-header-${index}`;
        const contentId = `accordion-content-${index}`;

        return (
          <div key={index} className="glass-effect rounded-lg overflow-hidden border border-[var(--border-color)] transition-all duration-300 has-[button[aria-expanded=true]]:border-[var(--accent-primary)] has-[button[aria-expanded=true]]:shadow-[0_0_20px_var(--accent-primary-shadow)]">
            <h5 className="m-0 font-bold">
              <button
                id={buttonId}
                onClick={() => handleClick(index)}
                className="w-full flex justify-between items-center text-left p-6"
                aria-expanded={isOpen}
                aria-controls={contentId}
              >
                <span className="gradient-text">{item.title}</span>
                <FiChevronDown
                  className={`w-5 h-5 text-[var(--text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </h5>
            <div
              id={contentId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-sm text-[var(--text-subtle)]" dangerouslySetInnerHTML={{ __html: item.children as string }}>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};


const WhyFoundlab: React.FC = () => {
    useScrollReveal();
    const { t } = useLanguage();

    const accordionItems = [
      {
        title: t('whyFoundlab.cards.privacy.title'),
        children: t('whyFoundlab.cards.privacy.text')
      },
      {
        title: t('whyFoundlab.cards.resilience.title'),
        children: t('whyFoundlab.cards.resilience.text')
      },
      {
        title: t('whyFoundlab.cards.auditability.title'),
        children: t('whyFoundlab.cards.auditability.text')
      }
    ];

  return (
    <section id="porque-foundlab" className="section-container py-20 md:py-32 bg-[var(--background-secondary)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4 scroll-reveal">{t('whyFoundlab.supertitle')}</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter scroll-reveal" style={{ transitionDelay: '0.1s' }}>{t('whyFoundlab.title')}</h3>
        </div>

        <div className="max-w-4xl mx-auto mb-16 text-center scroll-reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="glass-effect p-6 rounded-2xl border border-[var(--accent-secondary)] shadow-[0_0_25px_var(--accent-secondary-shadow)]">
                <h4 className="font-bold text-lg mb-2 text-[var(--text-primary)]">{t('whyFoundlab.pillar.title')}</h4>
                <p className="text-[var(--text-subtle)]">
                    {t('whyFoundlab.pillar.text')}
                </p>
            </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="scroll-reveal" style={{ transitionDelay: '0.3s' }}>
            <h4 className="text-2xl font-bold mb-4">{t('whyFoundlab.vision.title')}</h4>
            <p className="text-[var(--text-subtle)] mb-6 text-justify">{t('whyFoundlab.vision.text')}</p>
            <h4 className="text-2xl font-bold mb-4">{t('whyFoundlab.philosophy.title')}</h4>
            <p className="text-[var(--text-subtle)] text-justify">{t('whyFoundlab.philosophy.text')}</p>
          </div>
          <div className="scroll-reveal" style={{ transitionDelay: '0.4s' }}>
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyFoundlab;