import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { FiCheckCircle } from 'react-icons/fi';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) {
      setError(t('footer.form.error'));
      setIsSubmitted(false);
    } else {
      setError('');
      setIsSubmitted(true);
      console.log('Email submitted for demo request:', email);
    }
  };

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
          {isSubmitted ? (
            <div className="glass-effect p-6 rounded-2xl text-center border border-[var(--accent-secondary)] w-full tab-content-animate">
              {/* Ícone dentro de um span para evitar passar props inválidos ao componente */}
              <span className="mx-auto mb-2 block" aria-hidden="true">
                <FiCheckCircle size={36} />
              </span>
              <h4 className="font-bold text-lg text-[var(--text-primary)]">
                {t('footer.form.submitted.title')}
              </h4>
              <p className="text-[var(--text-subtle)] mt-1 text-sm">
                {t('footer.form.submitted.text')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-full">
                <label htmlFor="email-input" className="sr-only">
                  Email for demo request
                </label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder={t('footer.form.placeholder')}
                  className={`
                    w-full px-6 py-4 rounded-full text-[var(--text-primary)] bg-[var(--glass-bg)]
                    border transition-all duration-300 outline-none
                    ${error ? 'border-red-500' : 'border-[var(--glass-border)]'}
                  `}
                  aria-invalid={!!error}
                  aria-describedby="email-error"
                />
                {error && (
                  <p id="email-error" role="alert" className="text-red-500 text-sm mt-2 text-left pl-4">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="
                  w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]
                  text-black font-bold text-lg px-10 py-4 rounded-full
                  inline-block hover:scale-105 transition-transform
                "
              >
                {t('footer.form.button')}
              </button>
            </form>
          )}
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
