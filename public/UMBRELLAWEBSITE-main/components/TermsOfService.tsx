import React from 'react';
import { useLanguage } from './LanguageContext';

const TermsOfService: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-3xl mx-auto py-24 px-4 mt-12">
      <h1 className="text-3xl font-bold mb-6">{t('terms.title')}</h1>
      <div className="prose prose-invert">
        <p>{t('terms.intro')}</p>
        <h2>{t('terms.section1Title')}</h2>
        <p>{t('terms.section1')}</p>
        <h2>{t('terms.section2Title')}</h2>
        <p>{t('terms.section2')}</p>
        <h2>{t('terms.section3Title')}</h2>
        <p>{t('terms.section3')}</p>
        <h2>{t('terms.section4Title')}</h2>
        <p>{t('terms.section4')}</p>
      </div>
    </div>
  );
};

export default TermsOfService;
