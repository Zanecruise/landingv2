import React from 'react';
import { useLanguage } from './LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="max-w-3xl mx-auto py-24 px-4 mt-12">
      <h1 className="text-3xl font-bold mb-6">{t('privacy.title')}</h1>
      <div className="prose prose-invert">
        <p>{t('privacy.intro')}</p>
        <h2>{t('privacy.section1Title')}</h2>
        <p>{t('privacy.section1')}</p>
        <h2>{t('privacy.section2Title')}</h2>
        <p>{t('privacy.section2')}</p>
        <h2>{t('privacy.section3Title')}</h2>
        <p>{t('privacy.section3')}</p>
        <h2>{t('privacy.section4Title')}</h2>
        <p>{t('privacy.section4')}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
