import React, { useState, useEffect, useRef, useCallback } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import Modal from './Modal';
import { aiEnginesData, ModalId, AiEngine } from '../data/aiEngineData';
import { useLanguage } from './LanguageContext';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

// --- Top-Level Component Definitions ---

const ArchitectureAnimations: React.FC = () => (
    <style>{`
        @keyframes float-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
        }
        @keyframes flow-lines {
            to { stroke-dashoffset: -1000; }
        }
        .architecture-node {
            animation: float-subtle 6s ease-in-out infinite;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .architecture-node:hover {
            transform: translateY(-4px) scale(1.03);
            box-shadow: 0 0 30px var(--accent-secondary-shadow), 0 0 12px var(--accent-primary-alpha) inset;
        }
        .flow-path {
            stroke-dasharray: 20;
            stroke-dashoffset: 0;
            animation: flow-lines 30s linear infinite;
        }
        .engine-link {
          display: inline-block;
          transition: color 0.2s ease, text-shadow 0.2s ease, transform 0.2s ease;
        }
        .engine-link:hover {
          color: var(--accent-secondary);
          text-shadow: 0 0 8px var(--accent-secondary-alpha);
          transform: scale(1.08);
        }
    `}</style>
);

const InputIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h5m-5 4h5m-5-8h5m-5-4h5" /></svg>;
const GeminiIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-10 w-10" // Mantém o tamanho
        fill="none" 
        viewBox="0 0 24 24" // Mantém a área de desenho
        stroke="currentColor" // Mantém a cor
        strokeWidth={1.5} // Mantém a espessura da linha
    >
        {/* O grupo agrupa todos os elementos para aplicar a rotação se necessário */}
        <g strokeLinecap="round" strokeLinejoin="round">
            {/* Órbita 1 (Horizontal) */}
            <ellipse cx="12" cy="12" rx="10" ry="4.5" />
            
            {/* Órbita 2 (Rotacionada 60 graus) */}
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
            
            {/* Órbita 3 (Rotacionada -60 graus) */}
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-60 12 12)" />

            {/* Núcleo Central (usando fill em vez de stroke para ficar preenchido) */}
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </g>
    </svg>
);
const OutputIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;

const MultiEngineSelectorIllustration: React.FC = () => (
    <svg
        viewBox="0 0 640 420"
        className="block mx-auto mb-8 w-full max-w-[520px] h-auto drop-shadow-lg text-[var(--text-primary)]"
        role="img"
        aria-labelledby="multi-engine-title multi-engine-desc"
    >
        <title id="multi-engine-title">Multi-engine runtime selection</title>
        <desc id="multi-engine-desc">
            Visual flow showing prompts being routed between Google Gemini and NVIDIA NIM execution environments.
        </desc>
        <defs>
            <linearGradient id="panelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="pillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.85" />
            </linearGradient>
        </defs>
        <rect x="20" y="20" width="600" height="380" rx="36" fill="url(#panelGradient)" stroke="var(--glass-border)" strokeWidth="1.5" />
        <text x="320" y="72" textAnchor="middle" fontSize="20" fontWeight="600" fill="var(--text-primary)">Orquestração multi-engine</text>
        <text x="320" y="94" textAnchor="middle" fontSize="13" fill="var(--text-subtle)">Selecione dinamicamente entre Gemini (Google) e NIM (NVIDIA)</text>

        <g aria-hidden="true">
            <rect x="210" y="110" width="220" height="40" rx="20" fill="rgba(255,255,255,0.05)" stroke="var(--glass-border)" strokeWidth="1" />
            <rect x="220" y="116" width="90" height="28" rx="14" fill="url(#pillGradient)" />
            <rect x="320" y="116" width="90" height="28" rx="14" fill="url(#pillGradient)" opacity="0.9" />
            <path d="M248 130l6 6 12-12" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M348 130l6 6 12-12" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="265" y="134" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">Gemini</text>
            <text x="365" y="134" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--text-primary)">NIM</text>
        </g>

        <g>
            <rect x="80" y="160" width="160" height="70" rx="24" fill="rgba(255,255,255,0.05)" stroke="var(--glass-border)" strokeWidth="1" />
            <text x="160" y="188" textAnchor="middle" fontSize="14" fontWeight="600" fill="var(--text-primary)">Prompt + contexto</text>
            <text x="160" y="206" textAnchor="middle" fontSize="12" fill="var(--text-subtle)">Preferências do cliente</text>
        </g>

        <g>
            <rect x="250" y="175" width="140" height="85" rx="28" fill="rgba(5,10,25,0.55)" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <text x="320" y="208" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--text-primary)">Router IA</text>
            <text x="320" y="228" textAnchor="middle" fontSize="11" fill="var(--text-subtle)">Políticas · Métricas · Custos</text>
        </g>

        <path d="M 240 195 C 260 200, 280 205, 320 215" stroke="url(#connectorGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="240" cy="195" r="6" fill="var(--accent-secondary)" opacity="0.9" />
        <circle cx="320" cy="215" r="7" fill="var(--accent-primary)" />

        <path d="M 320 245 C 260 270, 220 295, 180 320" stroke="url(#connectorGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M 320 245 C 380 270, 420 295, 460 320" stroke="url(#connectorGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="180" cy="320" r="5" fill="var(--accent-secondary)" opacity="0.9" />
        <circle cx="460" cy="320" r="5" fill="var(--accent-secondary)" opacity="0.9" />

        <g>
            <rect x="60" y="240" width="220" height="140" rx="28" fill="rgba(10,15,35,0.65)" stroke="var(--glass-border)" strokeWidth="1" />
            <circle cx="110" cy="280" r="26" fill="rgba(255,255,255,0.05)" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <path d="M96 272c8 0 12-10 20-10s12 10 20 10-12 20-20 20-12-20-20-20z" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M110 258v44" stroke="var(--accent-secondary)" strokeWidth="1" strokeDasharray="4 4" />
            <text x="185" y="272" fontSize="18" fontWeight="700" fill="var(--text-primary)">Gemini</text>
            <text x="185" y="292" fontSize="12" fill="var(--text-subtle)">Google · geração completa</text>
            <rect x="120" y="306" width="140" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
            <rect x="120" y="306" width="110" height="12" rx="6" fill="url(#pillGradient)" />
            <text x="190" y="330" textAnchor="middle" fontSize="11" fill="var(--text-subtle)">Latência baixa · tokens longos</text>
            <g>
                <rect x="160" y="338" width="80" height="28" rx="14" fill="url(#pillGradient)" />
                <text x="200" y="357" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Selecionado</text>
            </g>
        </g>

        <g>
            <rect x="360" y="240" width="220" height="140" rx="28" fill="rgba(10,15,35,0.65)" stroke="var(--glass-border)" strokeWidth="1" />
            <rect x="410" y="254" width="42" height="42" rx="10" fill="rgba(255,255,255,0.05)" stroke="var(--accent-primary)" strokeWidth="1.5" />
            <path d="M418 262h26v26h-26z" stroke="var(--accent-secondary)" strokeWidth="1.2" fill="none" />
            <path d="M418 275h26" stroke="var(--accent-secondary)" strokeWidth="1.2" />
            <path d="M431 262v26" stroke="var(--accent-secondary)" strokeWidth="1.2" />
            <text x="470" y="272" fontSize="18" fontWeight="700" fill="var(--text-primary)">NIM</text>
            <text x="470" y="292" fontSize="12" fill="var(--text-subtle)">NVIDIA · inference engine</text>
            <rect x="420" y="306" width="140" height="12" rx="6" fill="rgba(255,255,255,0.08)" />
            <rect x="420" y="306" width="95" height="12" rx="6" fill="var(--accent-secondary)" />
            <text x="490" y="330" textAnchor="middle" fontSize="11" fill="var(--text-subtle)">Modelos otimizados · GPUs</text>
            <g>
                <rect x="452" y="338" width="96" height="28" rx="14" fill="rgba(255,255,255,0.08)" stroke="var(--glass-border)" strokeWidth="1" />
                <text x="500" y="357" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--text-primary)">Pronto para uso</text>
            </g>
        </g>
    </svg>
);

const FlowNode: React.FC<{ icon: React.ReactNode; title: string; description: string; delay?: string; className?: string }> = ({ icon, title, description, delay = '0s', className = '' }) => (
    <div className={`architecture-node glass-effect p-6 rounded-2xl text-center border border-[var(--glass-border)] scroll-reveal z-10 ${className}`} style={{ animationDelay: `${delay}, 0s` }}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-[var(--accent-primary)]">
            {icon}
        </div>
        <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">{title}</h4>
        <p className="text-[var(--text-subtle)] text-sm">{description}</p>
    </div>
);

const AiArchitectureFlow: React.FC = () => {
    const { t } = useLanguage();
    const coreEngines = aiEnginesData;

    return (
            

        <div className="my-20 md:my-32">
            <MultiEngineSelectorIllustration />
            <ArchitectureAnimations />



            <div className="text-center mb-16 scroll-reveal" style={{ transitionDelay: '0s' }}>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('aiEngines.architecture.title')}</h3>
                <p className="max-w-3xl mx-auto text-lg text-[var(--text-subtle)] mt-4">{t('aiEngines.architecture.subtitle')}</p>
            </div>

            {/* Desktop Architecture */}
            <div className="hidden md:block relative h-[450px]">
                <svg width="100%" height="100%" className="absolute top-0 left-0" style={{ pointerEvents: 'none' }}>
                    <defs>
                        <linearGradient id="flowGradientPath" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.8" />
                        </linearGradient>
                    </defs>
                    <path d="M 12.5% 150 C 25% 150, 30% 150, 40% 225" stroke="url(#flowGradientPath)" strokeWidth="2" fill="none" strokeOpacity="0.3" className="flow-path" />
                    <path d="M 60% 225 C 70% 150, 75% 150, 87.5% 150" stroke="url(#flowGradientPath)" strokeWidth="2" fill="none" strokeOpacity="0.3" className="flow-path" />
                    <path d="M 50% 300 C 40% 350, 35% 420, 30% 450" stroke="url(#flowGradientPath)" strokeWidth="1.5" fill="none" strokeOpacity="0.2" className="flow-path" />
                    <path d="M 50% 300 C 50% 350, 50% 420, 50% 450" stroke="url(#flowGradientPath)" strokeWidth="1.5" fill="none" strokeOpacity="0.2" className="flow-path" />
                    <path d="M 50% 300 C 60% 350, 65% 420, 70% 450" stroke="url(#flowGradientPath)" strokeWidth="1.5" fill="none" strokeOpacity="0.2" className="flow-path" />
                </svg>
                
                <div className="absolute top-[150px] left-[12.5%] -translate-x-1/2 -translate-y-1/2 w-1/4 max-w-[250px]">
                    <FlowNode icon={<InputIcon />} title={t('aiEngines.architecture.nodes.input.title')} description={t('aiEngines.architecture.nodes.input.description')} delay="0.1s" />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 max-w-[320px]">
                     <div className="architecture-node glass-effect p-6 rounded-2xl border border-[var(--glass-border)] scroll-reveal" style={{ animationDelay: '0.3s, 0.2s' }}>
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-[var(--accent-primary)]"><GeminiIcon /></div>
                            <h4 className="text-xl font-bold text-[var(--text-primary)] mb-2">{t('aiEngines.architecture.nodes.gemini.title')}</h4>
                            <p className="text-[var(--text-subtle)] text-sm mb-4">{t('aiEngines.architecture.nodes.gemini.description')}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                            <h5 className="text-center font-semibold text-sm text-[var(--text-primary)] mb-3">{t('aiEngines.architecture.nodes.engines.title')}</h5>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                {coreEngines.slice(0, 3).map((engine) => (
                                    <a href={`#engine-${engine.id}`} key={engine.id} className="engine-link text-xs text-center text-[var(--text-subtle)] p-1 rounded">
                                        {t(`aiEngineModal.${engine.id}.title`)}
                                    </a>
                                ))}
                                 <div className="engine-link text-xs text-center text-[var(--text-subtle)] p-1 rounded opacity-75">...and more</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-[150px] right-[12.5%] translate-x-1/2 -translate-y-1/2 w-1/4 max-w-[250px]">
                    <FlowNode icon={<OutputIcon />} title={t('aiEngines.architecture.nodes.output.title')} description={t('aiEngines.architecture.nodes.output.description')} delay="0.5s" />
                </div>
            </div>

             {/* Mobile Architecture */}
             <div className="md:hidden flex flex-col items-center space-y-8">
                <FlowNode icon={<InputIcon />} title={t('aiEngines.architecture.nodes.input.title')} description={t('aiEngines.architecture.nodes.input.description')} delay="0.1s" className="w-full max-w-md"/>
                <div className="h-16 w-1 rounded-full bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-50"></div>
                <div className="w-full max-w-md architecture-node glass-effect p-6 rounded-2xl border border-[var(--glass-border)] scroll-reveal" style={{ animationDelay: '0.3s, 0.2s' }}>
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-[var(--accent-primary)]"><GeminiIcon /></div>
                        <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t('aiEngines.architecture.nodes.gemini.title')}</h4>
                        <p className="text-[var(--text-subtle)] text-sm mb-4">{t('aiEngines.architecture.nodes.gemini.description')}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[var(--glass-border)]">
                        <h5 className="text-center font-semibold text-sm text-[var(--text-primary)] mb-3">{t('aiEngines.architecture.nodes.engines.title')}</h5>
                        <div className="flex flex-col space-y-2">
                            {coreEngines.map((engine) => (
                                <a href={`#engine-${engine.id}`} key={engine.id} className="engine-link text-sm text-center text-[var(--text-subtle)] p-1 rounded">
                                    {t(`aiEngineModal.${engine.id}.title`)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-16 w-1 rounded-full bg-gradient-to-b from-[var(--accent-primary)] to-[var(--accent-secondary)] opacity-50"></div>
                <FlowNode icon={<OutputIcon />} title={t('aiEngines.architecture.nodes.output.title')} description={t('aiEngines.architecture.nodes.output.description')} delay="0.5s" className="w-full max-w-md" />
             </div>
        </div>
    );
};

const CarouselAnimations: React.FC = () => (
    <style>{`
        @keyframes active-glow {
            0% { 
                border-color: var(--accent-primary); 
                box-shadow: 0 0 30px var(--accent-primary-shadow), 0 0 15px var(--accent-secondary-alpha) inset; 
            }
            50% { 
                border-color: var(--accent-secondary); 
                box-shadow: 0 0 50px var(--accent-secondary-shadow), 0 0 25px var(--accent-primary-alpha) inset; 
            }
            100% { 
                border-color: var(--accent-primary); 
                box-shadow: 0 0 30px var(--accent-primary-shadow), 0 0 15px var(--accent-secondary-alpha) inset; 
            }
        }
        .carousel {
            position: relative;
        }
        .carousel__body {
            width: 100%;
            padding: 80px 0 50px 0; /* Increased top padding to prevent clipping of scaled active card */
            overflow: hidden;
        }
        .carousel__slider {
            position: relative;
            display: flex;
            transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1);
        }
        .carousel__slider__item {
            position: relative;
            flex-shrink: 0;
            box-sizing: border-box;
            margin: 0 20px;
        }
        .item__3d-frame {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.5s ease;
            transform-style: preserve-3d;
        }
        .item__3d-frame:after {
            content: '';
            position: absolute;
            bottom: -10%;
            left: 5%;
            width: 90%;
            height: 40px;
            background: black;
            filter: blur(20px);
            transform: rotateX(90deg) translate3d(0px, -20px, 0px);
            opacity: 0.5;
            transition: opacity 0.5s ease;
        }
        .carousel__slider__item--active .item__3d-frame:after {
           opacity: 0.8;
        }
        .item__3d-frame__box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: absolute;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            background: var(--glass-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            padding: 24px;
            border-radius: 16px;
        }
        .item__3d-frame__box--front {
            border: 1px solid var(--glass-border);
            background-image: 
              radial-gradient(circle at 20% 20%, var(--accent-primary-alpha), transparent 40%),
              radial-gradient(circle at 80% 90%, var(--accent-secondary-alpha), transparent 50%);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .carousel__slider__item--active .item__3d-frame__box--front {
            animation: active-glow 4s ease-in-out infinite;
        }
        .carousel__slider__item--active:hover .item__3d-frame__box--front {
            transform: scale(1.02);
            box-shadow: 0 0 45px var(--accent-secondary-shadow), 0 0 25px var(--accent-primary-shadow);
        }
        .item__3d-frame__box h4 {
            font-size: 1.25em;
            width: 100%;
            color: var(--text-primary);
            font-weight: 600;
            line-height: 1.3;
            margin: 12px 0 8px;
        }
        .item__3d-frame__box p {
            font-size: 0.8em;
            color: var(--text-subtle);
        }
        .item__3d-frame__box--right, .item__3d-frame__box--left {
            top: 0;
            width: 40px;
            backface-visibility: hidden;
            background: linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
            border-top-right-radius: 0; border-bottom-right-radius: 0;
            border-top-left-radius: 0; border-bottom-left-radius: 0;
        }
        .item__3d-frame__box--left {
            left: 0;
            transform: translate3d(0, 0, -40px) rotateY(-90deg);
            transform-origin: 0% 50%;
        }
        .item__3d-frame__box--right {
            right: 0;
            transform: translate3d(0, 0, -40px) rotateY(90deg);
            transform-origin: 100% 50%;
        }
        .carousel__slider__item--active {
            z-index: 10;
        }
        .carousel__slider__item--active .item__3d-frame {
            cursor: pointer;
            opacity: 1;
        }
        .carousel__slider__item:not(.carousel__slider__item--active) .item__3d-frame {
             opacity: 0.4; /* More faded to emphasize active card */
        }
        .carousel-nav {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 100px;
            margin-top: 10px;
        }
        .carousel-nav button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            transition: transform 0.25s ease, color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
            color: var(--text-subtle);
            font-size: 36px;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
        }
        .carousel-nav button:hover {
            transform: scale(1.1);
            color: var(--accent-primary);
            background-color: var(--accent-primary-alpha);
            border-color: var(--accent-primary-alpha);
            box-shadow: 0 0 35px var(--accent-primary-shadow), 0 0 15px var(--accent-primary-alpha);
        }
        .engine-icon {
            font-size: 2.5rem;
            margin-bottom: 8px;
            background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .active-card-prompt-wrapper {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
        }
        .carousel__slider__item--active .active-card-prompt-wrapper {
            opacity: 1;
            transform: translateY(0);
        }
    `}</style>
);


const AiEnginesCarousel: React.FC<{
  engines: AiEngine[];
  onEngineClick: (id: ModalId) => void;
}> = ({ engines, onEngineClick }) => {
  const { t } = useLanguage();
  const [currIndex, setCurrIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<number | null>(null);
  const itemWidthRef = useRef(0);

  const move = useCallback((index: number) => {
    const numItems = engines.length;
    let newIndex = index;
    if (index < 0) {
      newIndex = numItems - 1;
    } else if (index >= numItems) {
      newIndex = 0;
    }
    setCurrIndex(newIndex);
  }, [engines.length]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrIndex(prevIndex => (prevIndex + 1) % engines.length);
    }, 5000);
  }, [engines.length]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const resumeTimer = useCallback(() => {
    resetTimer();
  }, [resetTimer]);
  
  const handlePrev = () => {
    move(currIndex - 1);
    resetTimer();
  };
  
  const handleNext = () => {
    move(currIndex + 1);
    resetTimer();
  };

  useEffect(() => {
    const resize = () => {
        const itemMargin = 20;
        const newWidth = Math.max(window.innerWidth * 0.25, 280);
        const newHeight = Math.min(window.innerHeight * 0.4, 320);

        itemWidthRef.current = newWidth;
        
        itemsRef.current.forEach(item => {
            if (item) {
                item.style.width = (newWidth - (itemMargin * 2)) + "px";
                item.style.height = newHeight + "px";
            }
        });
    };

    window.addEventListener('resize', resize);
    resize();
    move(Math.floor(engines.length / 2));
    resetTimer();

    return () => {
        window.removeEventListener('resize', resize);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [engines.length, move, resetTimer]);

  useEffect(() => {
    const width = itemWidthRef.current;
    if (!sliderRef.current || width === 0) return;

    const scrollPos = (-currIndex * width) + (window.innerWidth / 2) - (width / 2);
    sliderRef.current.style.transform = `translateX(${scrollPos}px)`;

    itemsRef.current.forEach((item, i) => {
        if (!item) return;
        // FIX: Replaced generic type argument with type assertion to resolve "Untyped function calls may not accept type arguments" error.
        const box = item.querySelector('.item__3d-frame') as HTMLDivElement | null;
        if (!box) return;

        if (i === currIndex) {
            item.classList.add('carousel__slider__item--active');
            box.style.transform = "perspective(1200px) rotateY(0deg) scale(1.25)";
        } else {
            item.classList.remove('carousel__slider__item--active');
            const angle = i < currIndex ? 45 : -45;
            const zTranslate = i === currIndex - 1 || i === currIndex + 1 ? -50 : -100;
            box.style.transform = `perspective(1200px) rotateY(${angle}deg) translateZ(${zTranslate}px)`;
        }
    });
  }, [currIndex, engines.length]);

  return (
    <div 
        className="carousel scroll-reveal"
        onMouseEnter={pauseTimer}
        onMouseLeave={resumeTimer}
    >
      <div className="carousel__body">
        <div ref={sliderRef} className="carousel__slider">
          {engines.map((engine, index) => (
            <div
              key={engine.id}
              ref={el => { itemsRef.current[index] = el; }}
              className="carousel__slider__item group"
              onClick={() => { if(index === currIndex) onEngineClick(engine.id) }}
              onKeyDown={(e) => { if(index === currIndex && (e.key === 'Enter' || e.key === ' ')) onEngineClick(engine.id) }}
              role={index === currIndex ? "button" : undefined}
              tabIndex={index === currIndex ? 0 : -1}
              aria-label={index === currIndex ? `Saiba mais sobre ${t(`aiEngineModal.${engine.id}.title`)}` : undefined}
            >
              <div className="item__3d-frame">
                <div className="item__3d-frame__box item__3d-frame__box--front flex flex-col p-8">
                  <div className="text-center">
                    <div className="engine-icon"><engine.icon /></div>
                    <h4 className="text-xl">{t(`aiEngineModal.${engine.id}.title`)}</h4>
                    <p className="text-sm leading-relaxed">{t(engine.shortDescriptionKey)}</p>
                  </div>
                  <div className="active-card-prompt-wrapper mt-auto pt-6 text-center">
                    <div 
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full bg-[var(--accent-secondary-alpha)] text-[var(--accent-secondary)] border border-transparent transition-transform group-hover:scale-105"
                      aria-hidden="true"
                    >
                      {t('aiEngineCarousel.clickToLearnMore')}
                      <FiArrowRight />
                    </div>
                  </div>
                </div>
                <div className="item__3d-frame__box item__3d-frame__box--left"></div>
                <div className="item__3d-frame__box item__3d-frame__box--right"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
       <div className="carousel-nav">
          <button onClick={handlePrev} aria-label="Previous engine"><FiChevronLeft /></button>
          <button onClick={handleNext} aria-label="Next engine"><FiChevronRight /></button>
        </div>
    </div>
  );
};

// --- Main Component ---
const AiEngines: React.FC = () => {
  useScrollReveal();
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const openModal = (modalId: ModalId) => {
    setActiveModal(modalId);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setActiveModal(null), 300);
  };
  
  const getModalContent = (modalId: ModalId) => {
      const contentBlocks = t(`aiEngineModal.${modalId}.content`);

      if (!Array.isArray(contentBlocks)) {
          return <p>Content is loading or could not be found for this engine.</p>;
      }

      return (
          <div className="text-[var(--text-subtle)] space-y-4 text-sm md:text-base">
              {contentBlocks.map((block, index) => {
                  switch (block.type) {
                      case 'p':
                          return <p key={index} dangerouslySetInnerHTML={{ __html: block.text }}></p>;
                      case 'h4':
                          return <h4 key={index} className="font-bold text-[var(--text-primary)] mt-6 mb-2 text-base md:text-lg">{block.text}</h4>;
                      case 'ul':
                          return (
                              <ul key={index} className="list-disc list-inside space-y-2">
                                  {block.items.map((item: string, i: number) => <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>)}
                              </ul>
                          );
                      case 'code':
                          return (
                               <pre key={index} className="bg-black/50 p-4 rounded-lg text-xs text-[var(--text-primary)] font-mono overflow-x-auto my-4 whitespace-pre-wrap">
                                  <code>{block.text}</code>
                              </pre>
                          );
                      case 'quote':
                          return (
                              <blockquote key={index} className="border-l-4 border-[var(--accent-secondary)] pl-4 py-2 bg-white/5 rounded-r-lg italic space-y-3">
                                  <p dangerouslySetInnerHTML={{ __html: block.text }}></p>
                                  {block.text2 && <p dangerouslySetInnerHTML={{ __html: block.text2 }}></p>}
                              </blockquote>
                          );
                      default:
                          return null;
                  }
              })}
          </div>
      );
  };
  
  return (
    <section id="motores-ia" className="section-container bg-[var(--background-secondary)] py-20 md:py-32">
        <CarouselAnimations />
        <div className="container mx-auto px-6">
            <div className="text-center mb-20 scroll-reveal">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">{t('aiEngines.supertitle')}</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{t('aiEngines.title')}</h3>
              <p className="max-w-3xl mx-auto text-lg text-[var(--text-subtle)] mt-4">{t('aiEngines.subtitle')}</p>
            </div>
            
            <AiArchitectureFlow />

            <div className="text-center mt-20 md:mt-32 mb-16 scroll-reveal">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('aiEngines.coreEngines.title')}</h3>
                <p className="max-w-3xl mx-auto text-lg text-[var(--text-subtle)] mt-4">{t('aiEngines.coreEngines.subtitle')}</p>
            </div>
            
            <AiEnginesCarousel 
                engines={aiEnginesData}
                onEngineClick={openModal}
            />

        </div>

        <Modal
            isOpen={modalOpen}
            onClose={closeModal}
            title={activeModal ? t(`aiEngineModal.${activeModal}.title`) : ''}
        >
            {activeModal && getModalContent(activeModal)}
        </Modal>
    </section>
  );
};

export default AiEngines;
