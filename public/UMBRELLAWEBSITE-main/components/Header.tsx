import React, { useState, useEffect } from 'react';
import ThemeToggleButton from './ThemeToggleButton';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';

const AnimatedLogo: React.FC = () => {
  const logoText = "FOUNDLAB";
  const [spans, setSpans] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generatedSpans = logoText.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block opacity-0 animate-fadeInLetter"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        {char}
      </span>
    ));
    setSpans(generatedSpans);
  }, []);

  return <>{spans}</>;
};


const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeInLetter { 
        from { opacity: 0; transform: translateY(-10px); } 
        to { opacity: 1; transform: translateY(0); } 
      }
      .animate-fadeInLetter { animation: fadeInLetter 0.5s forwards; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  // Effect to lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  const navLinks = [
    { href: "/#solucoes", key: 'header.nav.solutions' },
    { href: "/#porque-foundlab", key: 'header.nav.whyFoundlab' },
    { href: "/#casos-de-uso", key: 'header.nav.useCases' },
    { href: "/#tecnologia", key: 'header.nav.technology' },
    { href: "/#parcerias", key: 'header.nav.partners' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 glass-effect transition-shadow duration-300 ${isScrolled ? 'shadow-lg shadow-black/20' : ''}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="relative group">
            <a href="#" className="text-2xl font-bold tracking-tighter" onClick={() => setIsMenuOpen(false)} aria-describedby="logo-tooltip">
              <AnimatedLogo />
            </a>
            <div 
                id="logo-tooltip"
                role="tooltip"
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] bg-[var(--background-secondary)] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
            >
                Foundlab
            </div>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label={t('header.nav.ariaLabel')} className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
             <a
               key={link.key}
               href={link.href}
               className="nav-link text-sm hover:text-[var(--accent-primary)] transition-all duration-300 hover:-translate-y-px"
               onClick={e => {
                 e.preventDefault();
                 window.location.href = link.href;
               }}
             >
               {t(link.key)}
             </a>
          ))}
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-4">
            <a
              href="/#contato"
              className="bg-[var(--text-primary)] text-[var(--background-primary)] font-semibold text-sm px-6 py-2 rounded-full hover:bg-opacity-90 transition-all"
              onClick={e => {
                e.preventDefault();
                window.location.href = '/#contato';
              }}
            >
              {t('header.demoButton')}
            </a>
            <ThemeToggleButton />
            <LanguageSwitcher />
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative z-50 w-8 h-8 flex flex-col justify-center items-center"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
            >
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-current transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
            </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`
          md:hidden fixed top-0 left-0 right-0 w-full h-screen overflow-y-auto glass-effect pt-[68px]
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
          <nav aria-label={t('header.nav.ariaLabelMobile')} className="flex flex-col items-center justify-center h-full space-y-8 px-6 pb-12 text-center">
              {navLinks.map(link => (
                 <a
                   key={link.key}
                   href={link.href}
                   className="nav-link text-2xl font-medium hover:text-[var(--accent-primary)] transition-colors"
                   onClick={e => {
                     e.preventDefault();
                     setIsMenuOpen(false);
                     window.location.href = link.href;
                   }}
                 >
                   {t(link.key)}
                 </a>
              ))}
              <a
                href="/#contato"
                className="!mt-12 bg-[var(--text-primary)] text-[var(--background-primary)] font-semibold text-lg px-10 py-4 rounded-full hover:bg-opacity-90 transition-all"
                onClick={e => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  window.location.href = '/#contato';
                }}
              >
                {t('header.demoButton')}
              </a>
              
              <div className="!mt-16 flex items-center space-x-4">
                <ThemeToggleButton />
                <LanguageSwitcher />
              </div>
          </nav>
      </div>
    </header>
  );
};

export default Header;