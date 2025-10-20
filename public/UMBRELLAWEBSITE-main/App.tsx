import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AnimatedBackground from './components/AnimatedBackground';
import { ThemeProvider } from './components/ThemeContext';
import { LanguageProvider } from './components/LanguageContext';
import { LoadingProvider } from './components/LoadingContext';
import GlobalLoadingIndicator from './components/GlobalLoadingIndicator';
import useScrollReveal from './hooks/useScrollReveal';

const App: React.FC = () => {
  // Revela seções conforme rolagem (uma única chamada com opções)
  useScrollReveal('.section-container', {
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px',
  });

  return (
    <ThemeProvider>
      <LanguageProvider>
        <LoadingProvider>
          <div className="w-full overflow-x-hidden bg-[var(--background-primary)]">
            <AnimatedBackground />
            <CustomCursor />
            <Header />
            <GlobalLoadingIndicator />

            <main>
              {/* As rotas filhas (home, terms, privacy) renderizam aqui */}
              <Outlet />
            </main>

            <Footer />
          </div>
        </LoadingProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
