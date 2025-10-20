import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import App from './App';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import CustomerJourney from './components/CustomerJourney';
import WhyFoundlab from './components/WhyFoundlab';
import AiTrust from './components/AiTrust';
import PerformanceChart from './components/PerformanceChart';
import AiEngines from './components/AiEngines';
import CaseStudies from './components/CaseStudies';
import VeritasProtocolDemo from './components/VeritasProtocolDemo';
import Technology from './components/Technology';
import Partners from './components/Partners';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    // 'auto' e 'smooth' são suportados; 'instant' não é padrão
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

const Router: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <>
              <Hero />
              <PainPoints />
              <CustomerJourney />
              <WhyFoundlab />
              <AiTrust />
              <PerformanceChart />
              <AiEngines />
              <CaseStudies />
              <VeritasProtocolDemo />
              <Technology />
              <Partners />
            </>
          }
        />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="privacy" element={<PrivacyPolicy />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Router;
