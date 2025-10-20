import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { techIcons } from '../data/technologyData';
import { useLanguage } from './LanguageContext';

export enum TechTabId {
    Infra = 'Infra',
    Security = 'Security',
    SRE = 'SRE',
    IATrust = 'IATrust',
}

const TabButton: React.FC<{ tabId: TechTabId; activeTab: TechTabId; onClick: (tabId: TechTabId) => void; children: React.ReactNode }> = ({ tabId, activeTab, onClick, children }) => (
    <button
        onClick={() => onClick(tabId)}
        className={`tab-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeTab === tabId ? 'border-[var(--accent-primary)] bg-[var(--accent-primary-alpha)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-secondary)] hover:bg-white/5'}`}
    >
        {children}
    </button>
);


const TechCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="glass-effect p-6 rounded-lg">
        <h4 className="font-bold text-[var(--text-primary)] mb-2">{title}</h4>
        <p className="text-[var(--text-subtle)]" dangerouslySetInnerHTML={{ __html: children as string }}></p>
    </div>
);


const Technology: React.FC = () => {
    useScrollReveal();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<TechTabId>(TechTabId.Infra);

    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const [pinnedIcon, setPinnedIcon] = useState<string | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<React.CSSProperties>({});
    
    const iconRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const tooltipRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const hoverTimeoutRef = useRef<number | null>(null);

    const activeIconName = pinnedIcon || hoveredIcon;

    useLayoutEffect(() => {
        if (!activeIconName) return;

        const iconEl = iconRefs.current.get(activeIconName);
        const tooltipEl = tooltipRefs.current.get(activeIconName);

        if (!iconEl || !tooltipEl) return;
        
        const iconRect = iconEl.getBoundingClientRect();
        tooltipEl.style.opacity = '0';
        tooltipEl.style.display = 'block';
        const tooltipRect = tooltipEl.getBoundingClientRect();
        tooltipEl.style.opacity = '';
        tooltipEl.style.display = '';

        const margin = 12;
        const newStyle: React.CSSProperties = {};

        if (iconRect.top < tooltipRect.height + margin) {
            newStyle.top = '100%';
            newStyle.marginTop = `${margin}px`;
        } else {
            newStyle.bottom = '100%';
            newStyle.marginBottom = `${margin}px`;
        }

        newStyle.left = '50%';
        let translateX = -50;
        const viewportWidth = window.innerWidth;
        
        const centeredTooltipLeft = iconRect.left + iconRect.width / 2 - tooltipRect.width / 2;
        const centeredTooltipRight = iconRect.left + iconRect.width / 2 + tooltipRect.width / 2;

        if (centeredTooltipLeft < margin) {
            const overflowAmount = margin - centeredTooltipLeft;
            const percentShift = (overflowAmount / tooltipRect.width) * 100;
            translateX += percentShift;
        } else if (centeredTooltipRight > viewportWidth - margin) {
            const overflowAmount = centeredTooltipRight - (viewportWidth - margin);
            const percentShift = (overflowAmount / tooltipRect.width) * 100;
            translateX -= percentShift;
        }
        
        newStyle.transform = `translateX(${translateX.toFixed(2)}%)`;
        
        setTooltipPosition(newStyle);

    }, [activeIconName]);
    
    // UX REFINEMENT: Add "click outside" to close pinned tooltips
    useEffect(() => {
        if (!pinnedIcon) return;

        const handleClickOutside = (event: MouseEvent) => {
            const iconEl = iconRefs.current.get(pinnedIcon);
            const tooltipEl = tooltipRefs.current.get(pinnedIcon);

            if (
                iconEl && !iconEl.contains(event.target as Node) &&
                tooltipEl && !tooltipEl.contains(event.target as Node)
            ) {
                setPinnedIcon(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [pinnedIcon]);


    const handleAreaMouseEnter = (techName: string) => {
        if (pinnedIcon) return;
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = window.setTimeout(() => {
            setHoveredIcon(techName);
        }, 300);
    };

    const handleAreaMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredIcon(null);
    };

    const handleClick = (techName: string) => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        setHoveredIcon(null);
        setPinnedIcon(current => (current === techName ? null : techName));
    };
    
    const handleKeyDown = (event: React.KeyboardEvent, techName: string) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick(techName);
        }
    };

    const handleCloseTooltip = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation();
        setPinnedIcon(null);
    };
    
    const handleCloseKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCloseTooltip(event);
        }
    };

    const dynamicHoverStyles = techIcons.map(tech => `
      .tech-grid-item[data-tech-name="${tech.id}"]:hover,
      .tech-grid-item[data-tech-name="${tech.id}"]:focus-visible {
        transform: scale(1.08) translateY(-4px);
        filter: drop-shadow(0 4px 15px ${tech.color});
      }
    `).join('');

    const renderContent = () => {
        switch (activeTab) {
            case TechTabId.Infra:
                return (
                    <div>
                        <div className="text-center max-w-4xl mx-auto mb-12"><p className="text-[var(--text-subtle)]">{t('technology.infra.text')}</p></div>
                        <div className="relative max-w-4xl mx-auto p-8 glass-effect rounded-2xl grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-4 items-center justify-items-center">
                           {techIcons.map((tech) => {
                                const isPinned = pinnedIcon === tech.id;
                                const isVisible = activeIconName === tech.id;
                                const techName = t(`technologyTooltip.${tech.id}.name`);

                               return (
                                   <div 
                                       key={tech.id} 
                                       className="relative flex justify-center"
                                       onMouseEnter={() => handleAreaMouseEnter(tech.id)}
                                       onMouseLeave={handleAreaMouseLeave}
                                       ref={(el) => {
                                          if (el) iconRefs.current.set(tech.id, el);
                                          else iconRefs.current.delete(tech.id);
                                       }}
                                   >
                                       <div
                                           className="tech-grid-item text-center p-4 rounded-lg cursor-pointer"
                                           onClick={() => handleClick(tech.id)}
                                           onKeyDown={(e) => handleKeyDown(e, tech.id)}
                                           role="button"
                                           aria-haspopup="true"
                                           aria-expanded={isVisible}
                                           tabIndex={0}
                                           data-tech-name={tech.id}
                                       >
                                           <tech.Icon />
                                           <p className="font-bold text-xs mt-2">{tech.shortName}</p>
                                       </div>
                                       
                                       <div 
                                          ref={(el) => {
                                            if (el) tooltipRefs.current.set(tech.id, el);
                                            else tooltipRefs.current.delete(tech.id);
                                          }}
                                          className={`absolute w-max max-w-[200px] p-3 text-xs glass-effect text-[var(--text-primary)] rounded-md shadow-lg transition-all duration-300 z-10 text-center ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'}`}
                                          style={isVisible ? tooltipPosition : {}}
                                          role="tooltip"
                                          id={`tooltip-${tech.id.replace(/\s+/g, '-')}`}
                                        >
                                           {isPinned && (
                                               <button 
                                                   onClick={handleCloseTooltip}
                                                   onKeyDown={handleCloseKeyDown}
                                                   className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors"
                                                   aria-label={t('technologyTooltip.close', { techName })}
                                               >
                                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                                               </button>
                                           )}
                                           <span className={`font-bold block mb-1 ${isPinned ? 'pr-4' : ''}`}>{techName}</span>
                                           {t(`technologyTooltip.${tech.id}.description`)}
                                       </div>
                                   </div>
                               );
                           })}
                        </div>
                    </div>
                );
            case TechTabId.Security:
                return (
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-sm">
                        <TechCard title={t('technology.security.privacy.title')}>{t('technology.security.privacy.text')}</TechCard>
                        <TechCard title={t('technology.security.auditability.title')}>{t('technology.security.auditability.text')}</TechCard>
                        <TechCard title={t('technology.security.encryption.title')}>{t('technology.security.encryption.text')}</TechCard>
                        <TechCard title={t('technology.security.integration.title')}>{t('technology.security.integration.text')}</TechCard>
                    </div>
                );
            case TechTabId.SRE:
                return (
                    <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center text-sm">
                        <TechCard title={t('technology.sre.antifragile.title')}>{t('technology.sre.antifragile.text')}</TechCard>
                        <TechCard title={t('technology.sre.resilience.title')}>{t('technology.sre.resilience.text')}</TechCard>
                        <TechCard title={t('technology.sre.slos.title')}>{t('technology.sre.slos.text')}</TechCard>
                    </div>
                );
            case TechTabId.IATrust:
                 return (
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-sm">
                        <TechCard title={t('technology.aiTrustTab.hallucination.title')}>{t('technology.aiTrustTab.hallucination.text')}</TechCard>
                        <TechCard title={t('technology.aiTrustTab.explainability.title')}>{t('technology.aiTrustTab.explainability.text')}</TechCard>
                        <TechCard title={t('technology.aiTrustTab.bias.title')}>{t('technology.aiTrustTab.bias.text')}</TechCard>
                        <TechCard title={t('technology.aiTrustTab.evaluation.title')}>{t('technology.aiTrustTab.evaluation.text')}</TechCard>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <section id="tecnologia" className="section-container container mx-auto px-6 py-20 md:py-32">
            <style>{`
                .tech-grid-item {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                ${dynamicHoverStyles}
            `}</style>
            <div className="text-center mb-16 scroll-reveal">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">{t('technology.supertitle')}</h2>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">{t('technology.title')}</h3>
            </div>
            <div className="flex justify-center mb-12 scroll-reveal">
                <div className="glass-effect p-2 rounded-full flex flex-wrap justify-center space-x-2">
                    <TabButton tabId={TechTabId.Infra} activeTab={activeTab} onClick={setActiveTab}>{t('technology.tabs.infra')}</TabButton>
                    <TabButton tabId={TechTabId.Security} activeTab={activeTab} onClick={setActiveTab}>{t('technology.tabs.security')}</TabButton>
                    <TabButton tabId={TechTabId.SRE} activeTab={activeTab} onClick={setActiveTab}>{t('technology.tabs.sre')}</TabButton>
                    <TabButton tabId={TechTabId.IATrust} activeTab={activeTab} onClick={setActiveTab}>{t('technology.tabs.aiTrust')}</TabButton>
                </div>
            </div>
            
            <div key={activeTab} className="tab-content-animate">
                {renderContent()}
            </div>
        </section>
    );
};

export default Technology;