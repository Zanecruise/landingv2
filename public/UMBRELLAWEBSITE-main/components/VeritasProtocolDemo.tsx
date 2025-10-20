import React, { useState, useEffect, useRef, useMemo } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { FiFileText, FiTerminal, FiShare2 } from 'react-icons/fi';
import { useLanguage } from './LanguageContext';
import { useLoading } from './LoadingContext';

type StepId = 'ingestao' | 'extracao' | 'validacao' | 'analise' | 'final';

// Componente para as animações e estilos
const VeritasDemoAnimations: React.FC = () => (
  <style>{`
    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }
    @keyframes blink-caret {
      from, to { border-color: transparent; }
      50% { border-color: #00FFD1; }
    }
    .log-line span {
      overflow: hidden;
      white-space: nowrap;
      display: inline-block;
      vertical-align: bottom;
      animation: typing 0.5s steps(40, end) forwards;
    }
    .log-line .caret {
      display: inline-block;
      width: 8px;
      height: 1.2em;
      margin-left: 4px;
      border-right: 2px solid #00FFD1;
      animation: blink-caret 0.75s step-end infinite;
    }
    .json-key { color: var(--accent-primary); }
    .json-string { color: var(--accent-secondary); }
    .json-number { color: #FFD100; }
    .json-boolean-true { color: var(--accent-secondary); }
    .json-boolean-false { color: #FF4D4D; }
    .json-invalid { color: #FF4D4D; }
  `}</style>
);


const JsonValue: React.FC<{ value: any; isString?: boolean; isBoolean?: boolean, isInvalid?: boolean }> = ({ value, isString, isBoolean, isInvalid }) => {
    const stringValue = isBoolean ? String(value) : isString ? `"${value}"` : value;

    let className = 'json-number'; // Default for numbers
    if (isString) className = 'json-string';
    if (isBoolean) className = value ? 'json-boolean-true' : 'json-boolean-false';
    
    // An explicit invalid state should override the default color.
    if (isInvalid) {
      className = 'json-invalid';
    }

    return <span className={className}>{stringValue}</span>;
}

const VeritasProtocolDemo: React.FC = () => {
  useScrollReveal();
  const { t } = useLanguage();
  const { showLoader, hideLoader } = useLoading();
  const [activeStep, setActiveStep] = useState<StepId>('ingestao');
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isInitialMount = useRef(true);
  
  // Effect to show loader when activeStep changes
  useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }
    
    showLoader();
    const timer = setTimeout(() => {
        hideLoader();
    }, 500);

    return () => clearTimeout(timer);
  }, [activeStep, showLoader, hideLoader]);

  // Effect to set up the observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = entry.target.getAttribute('data-step-id') as StepId;
            setActiveStep(stepId);
          }
        });
      },
      { threshold: 0.7, rootMargin: '-40% 0px -40% 0px' }
    );
    const currentRefs = stepRefs.current.filter(ref => ref);
    currentRefs.forEach(ref => observer.observe(ref!));
    return () => currentRefs.forEach(ref => observer.unobserve(ref!));
  }, []);

  const timelineSteps = [
    { id: 'ingestao', title: t('veritasDemo.timeline.ingestion') },
    { id: 'extracao', title: t('veritasDemo.timeline.extraction') },
    { id: 'validacao', title: t('veritasDemo.timeline.validation') },
    { id: 'analise', title: t('veritasDemo.timeline.analysis') },
    { id: 'final', title: t('veritasDemo.timeline.package') },
  ];

  const logData = useMemo((): Record<StepId, string[]> => {
    const logKeys: Record<StepId, string> = {
      ingestao: 'veritasDemo.logs.ingestion',
      extracao: 'veritasDemo.logs.extraction',
      validacao: 'veritasDemo.logs.validation',
      analise: 'veritasDemo.logs.analysis',
      final: 'veritasDemo.logs.final',
    };
    const data: Record<StepId, string[]> = {
        ingestao: [], extracao: [], validacao: [], analise: [], final: []
    };
    (Object.keys(logKeys) as StepId[]).forEach(step => {
        const result = t(logKeys[step]);
        if (Array.isArray(result)) {
            data[step] = result;
        }
    });
    return data;
  }, [t]);
  
  const renderJsonValue = (value: any, placeholder: any, checkStep: StepId[], options: { isInvalid?: boolean } = {}) => {
    const isStepActive = checkStep.some(s => s === activeStep);
    const { isInvalid = false } = options;

    if (!isStepActive) {
      return <JsonValue value={placeholder} isString={true} />;
    }
    
    return <JsonValue 
      value={value} 
      isString={typeof value === 'string'} 
      isBoolean={typeof value === 'boolean'} 
      isInvalid={isInvalid} 
    />;
  };

  return (
    <section id="veritas-demo" className="section-container relative py-20 md:py-32 bg-[var(--background-secondary)]">
      <VeritasDemoAnimations />
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 scroll-reveal">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">{t('veritasDemo.supertitle')}</h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('veritasDemo.title')}</h3>
          <p className="max-w-3xl mx-auto text-lg text-[var(--text-subtle)] mt-4">{t('veritasDemo.subtitle')}</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Coluna da Timeline (Esquerda) */}
          <div className="lg:sticky top-24">
            {timelineSteps.map((step, index) => (
              <div 
                key={step.id}
                ref={el => { stepRefs.current[index] = el; }}
                data-step-id={step.id}
                className={`border-l-4 p-8 mb-12 transition-all duration-500 transform ${activeStep === step.id ? 'border-[var(--accent-primary)] opacity-100 scale-100 shadow-2xl shadow-[var(--accent-primary-shadow)]' : 'border-[var(--border-color)] opacity-60 scale-[0.99]'}`}
              >
                <h4 className={`font-bold text-xl transition-colors duration-500 ${activeStep === step.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}`}>{step.title}</h4>
              </div>
            ))}
          </div>

          {/* Coluna da Simulação (Direita) */}
          <div className="space-y-8">
            {/* Janela do Documento */}
            <div className="glass-effect rounded-2xl overflow-hidden scroll-reveal">
              <div className="bg-black/30 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiFileText className="text-[var(--text-subtle)]" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{t('veritasDemo.document.title')}</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                </div>
              </div>
              <div className="p-6 text-[var(--text-subtle)] text-sm leading-relaxed font-mono">
                <p>{t('veritasDemo.document.greeting')}</p>
                <br />
                <p>{t('veritasDemo.document.asset1Label')} <span className={activeStep === 'extracao' || activeStep === 'validacao' || activeStep === 'analise' || activeStep === 'final' ? 'bg-blue-500/20 px-1 rounded' : ''}>{t('veritasDemo.document.asset1Value')}</span></p>
                <p>{t('veritasDemo.document.cnpjLabel')} <span className={activeStep === 'validacao' || activeStep === 'analise' || activeStep === 'final' ? 'bg-teal-500/30 px-1 rounded' : ''}>{t('veritasDemo.document.cnpjValue')}</span></p>
                <p>{t('veritasDemo.document.allocationLabel')} 15,7%</p>
                <br/>
                <p>{t('veritasDemo.document.asset2Label')} <span className={activeStep === 'extracao' || activeStep === 'validacao' || activeStep === 'analise' || activeStep === 'final' ? 'bg-blue-500/20 px-1 rounded' : ''}>{t('veritasDemo.document.asset2Value')}</span></p>
                <p>{t('veritasDemo.document.isinLabel')} <span className={activeStep === 'validacao' || activeStep === 'analise' || activeStep === 'final' ? 'bg-red-500/30 px-1 rounded line-through' : ''}>{t('veritasDemo.document.isinValue')}</span> {activeStep === 'validacao' || activeStep === 'analise' || activeStep === 'final' ? t('veritasDemo.document.invalid') : ''}</p>
              </div>
            </div>

            {/* Janela do Terminal de Logs */}
            <div className="glass-effect rounded-2xl overflow-hidden scroll-reveal">
              <div className="bg-black/30 p-4 flex items-center gap-2">
                <FiTerminal className="text-[var(--text-subtle)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">{t('veritasDemo.logs.title')}</span>
              </div>
              <div className="p-6 text-sm font-mono text-[var(--text-subtle)] h-64 overflow-y-auto">
                {logData[activeStep]?.map((line, i) => (
                  <div key={i} className="log-line">
                    <span className="text-teal-400 mr-2">&gt;</span>
                    <span style={{ animationDelay: `${i * 0.15}s` }}>{line}</span>
                    {i === logData[activeStep].length - 1 && <div className="caret" style={{ animationDelay: `${(i * 0.15) + 0.5}s` }}></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Janela do JSON Output */}
            <div className="glass-effect rounded-2xl overflow-hidden scroll-reveal">
              <div className="bg-black/30 p-4 flex items-center gap-2">
                <FiShare2 className="text-[var(--text-subtle)]" />
                <span className="text-sm font-semibold text-[var(--text-primary)]">{t('veritasDemo.json.title')}</span>
              </div>
              <pre className="p-6 text-xs font-mono text-[var(--text-subtle)]"><code>
                {'{'}<br />
                &nbsp;&nbsp;<span className="json-key">"documentId"</span>: <span className="json-string">"extrato-exemplo-01"</span>,<br />
                &nbsp;&nbsp;<span className="json-key">"trustScore"</span>: {renderJsonValue("82.5%", t('veritasDemo.json.calculating'), ['analise', 'final'])},<br />
                &nbsp;&nbsp;<span className="json-key">"assets"</span>: [<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"name"</span>: <span className="json-string">{t('veritasDemo.document.asset1Value')}</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"identifier"</span>: {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"type"</span>: <span className="json-string">"CNPJ"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"value"</span>: <span className="json-string">{t('veritasDemo.document.cnpjValue')}</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"isValid"</span>: {renderJsonValue(true, "...", ['validacao', 'analise', 'final'])}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"complianceScore"</span>: {renderJsonValue(98.7, "...", ['analise', 'final'])},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"rationale"</span>: {renderJsonValue(t('veritasDemo.json.rationale1'), "...", ['analise', 'final'])}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"name"</span>: <span className="json-string">{t('veritasDemo.document.asset2Value')}</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"identifier"</span>: {'{'}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"type"</span>: <span className="json-string">"ISIN"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"value"</span>: <span className="json-string">{t('veritasDemo.document.isinValue')}</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"isValid"</span>: {renderJsonValue(false, "...", ['validacao', 'analise', 'final'], { isInvalid: true })}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'}'},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"complianceScore"</span>: {renderJsonValue(15.2, "...", ['analise', 'final'])},<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="json-key">"rationale"</span>: {renderJsonValue(t('veritasDemo.json.rationale2'), "...", ['analise', 'final'])}<br />
                &nbsp;&nbsp;&nbsp;&nbsp;{'}'}<br />
                &nbsp;&nbsp;]<br />
                {'}'}
              </code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeritasProtocolDemo;