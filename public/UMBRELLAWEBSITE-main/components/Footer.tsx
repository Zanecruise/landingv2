import React from 'react';
import { useLanguage } from './LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="contato" className="section-container bg-[var(--background-secondary)] py-20 mt-20">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          {t('footer.title')}
        </h3>
        <p className="max-w-3xl mx-auto text-lg text-[var(--text-subtle)] mt-4 mb-8">
          {t('footer.subtitle')}
        </p>

        <div className="mt-8 max-w-lg mx-auto h-36 flex items-center justify-center">
          <div className="glass-effect p-6 rounded-2xl text-center border border-[var(--glass-border)] w-full">
            <p className="text-[var(--text-subtle)] text-sm mb-4">
              {t('footer.form.placeholder')}
            </p>
            <a
              href="https://umbrella-demo-liard.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-black font-bold text-lg px-10 py-4 rounded-full hover:scale-105 transition-transform"
            >
              {t('footer.form.button')}
            </a>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-[var(--border-color)]/50">
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-[var(--text-subtle)]" aria-label="Footer">
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.home')}
            </a>
            <a href="#pain-points" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.challenges')}
            </a>
            <a href="#solucoes" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.solutions')}
            </a>
            <a href="#porque-foundlab" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.whyFoundlab')}
            </a>
            <a href="#motores-ia" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.aiEngines')}
            </a>
            <a href="#casos-de-uso" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.useCases')}
            </a>
            <a href="#tecnologia" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.technology')}
            </a>
            <a href="#parcerias" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.partners')}
            </a>
            <a href="#contato" className="hover:text-[var(--text-primary)] transition-colors">
              {t('footer.nav.contact')}
            </a>
          </nav>
        </div>

        <div className="mt-16 text-sm text-[var(--text-secondary)]">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
          <div className="mt-4 space-x-6">
            <a href="/terms" className="hover:text-[var(--text-primary)]">
              {t('footer.terms')}
            </a>
            <a href="/privacy" className="hover:text-[var(--text-primary)]">
              {t('footer.privacy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
