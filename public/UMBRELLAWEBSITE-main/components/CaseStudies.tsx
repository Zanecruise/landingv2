import React, { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import Modal from "./Modal";
import { useLanguage } from "./LanguageContext";
import { caseStudiesData, CaseStudy, CaseStudyId } from "../data/caseStudiesData";

/** ===== SVG ICONS (React components) ===== */

const STROKE = {
  stroke: "currentColor",
  fill: "none",
  strokeWidth: 1.75,
  vectorEffect: "non-scaling-stroke" as const,
};

const GearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <circle cx="12" cy="12" r="4" {...STROKE} />
    <path d="M12 2.5v3M12 18.5v3M4.1 7.5l2.6 1.5M17.3 15l2.6 1.5M4.1 16.5l2.6-1.5M17.3 9l2.6-1.5" {...STROKE} strokeLinecap="round" />
    {/* acento */}
    <circle cx="12" cy="12" r="1.6" className="fill-[var(--accent-primary)]" />
  </svg>
);

const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path d="M12 2.5 4 7v6c0 5.2 8 8.5 8 8.5s8-3.3 8-8.5V7l-8-4.5Z" {...STROKE} />
    <path d="M8.4 12.2l2.8 2.8 5.9-5.9" fill="none" strokeLinecap="round" strokeLinejoin="round" className="stroke-[var(--accent-primary)]" />
  </svg>
);

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" {...STROKE} />
    <path d="M15.6 15.6 20.6 20.6" strokeLinecap="round" className="stroke-[var(--accent-primary)]" />
  </svg>
);

const DocIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
    <path d="M7 3.5h6l4.5 4.5V20.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5.5a2 2 0 0 1 2-2Z" {...STROKE} />
    <path d="M13 3.5v4a2 2 0 0 0 2 2h4" {...STROKE} />
    <path d="M8.5 10.5H15.5M8.5 13.5H15.5M8.5 16.5H13.5" strokeLinecap="round" className="stroke-[var(--accent-primary)]" />
  </svg>
);

/** Paleta de ícones (para fallback) */
const ICONS_POOL: React.ReactElement[] = [
  <GearIcon key="gear" className="h-6 w-6" />,
  <ShieldIcon key="shield" className="h-6 w-6" />,
  <SearchIcon key="search" className="h-6 w-6" />,
  <DocIcon key="doc" className="h-6 w-6" />,
];

/** Mapeamento por ID (ajuste os ids conforme seu caseStudiesData) */
const ICONS_BY_ID: Partial<Record<CaseStudyId, React.ReactElement>> = {
  // exemplos de ids comuns — ajuste para os seus:
  // "assetManagement": <GearIcon className="h-6 w-6" />,
  // "privateBanking": <ShieldIcon className="h-6 w-6" />,
  // "ma": <SearchIcon className="h-6 w-6" />,
  // "regulatoryReporting": <DocIcon className="h-6 w-6" />,
};

/** Pega ícone por id com fallback por índice */
function getIconFor(id: CaseStudyId, idx: number) {
  return ICONS_BY_ID[id] ?? ICONS_POOL[idx % ICONS_POOL.length];
}

/** ====== Card ====== */
type CaseStudyCardProps = {
  title: string;
  description: string;
  delay?: string;
  onClick: () => void;
  icon: React.ReactNode;
};

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  title,
  description,
  delay = "0s",
  onClick,
  icon,
}) => {
  const cardClasses =
    "case-study-card glass-effect rounded-2xl p-8 scroll-reveal cursor-pointer " +
    "border border-transparent hover:border-[var(--accent-secondary)] " +
    "transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]";

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") onClick();
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={title}
      className={cardClasses}
      style={{ transitionDelay: delay }}
    >
      <div className="w-12 h-12 mb-4 bg-gradient-to-br from-[var(--accent-primary)]/15 to-[var(--accent-secondary)]/15 rounded-lg flex items-center justify-center text-[var(--text-primary)]">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-[var(--text-subtle)] text-base">{description}</p>
    </div>
  );
};

/** ====== Main Section ====== */

const CaseStudies: React.FC = () => {
  useScrollReveal();
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);

  const openModal = (caseStudy: CaseStudy) => {
    setActiveCaseStudy(caseStudy);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // pequena espera para animação do Modal (se houver)
    setTimeout(() => setActiveCaseStudy(null), 300);
  };

  const getModalContent = (studyId: CaseStudyId) => {
    const baseKey = `caseStudies.${studyId}.modalContent`;
    return (
      <>
        <p className="text-[var(--text-subtle)] mb-6">
          {t(`${baseKey}.p1`)}
        </p>

        <h4 className="font-bold text-[var(--text-primary)] mb-2">
          {t(`${baseKey}.h4_1`)}
        </h4>
        <ul className="list-disc list-inside text-[var(--text-subtle)] space-y-2 mb-6">
          <li dangerouslySetInnerHTML={{ __html: t(`${baseKey}.li1`) }} />
          <li dangerouslySetInnerHTML={{ __html: t(`${baseKey}.li2`) }} />
          <li dangerouslySetInnerHTML={{ __html: t(`${baseKey}.li3`) }} />
          <li dangerouslySetInnerHTML={{ __html: t(`${baseKey}.li4`) }} />
        </ul>

        <h4 className="font-bold text-[var(--text-primary)] mb-2">
          {t(`${baseKey}.h4_2`)}
        </h4>
        <blockquote className="border-l-4 border-teal-500 pl-4 py-2 mt-2 bg-white/5 rounded-r-lg text-[var(--text-secondary)] italic">
          <p dangerouslySetInnerHTML={{ __html: t(`${baseKey}.quote`) }} />
        </blockquote>
      </>
    );
  };

  return (
    <>
      <section
        id="casos-de-uso"
        className="section-container bg-[var(--background-secondary)] py-20 md:py-32"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">
              {t("caseStudies.supertitle")}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter">
              {t("caseStudies.title")}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {caseStudiesData.map((study, idx) => (
              <CaseStudyCard
                key={study.id}
                title={t(`caseStudies.${study.id}.cardTitle`)}
                description={t(`caseStudies.${study.id}.cardDescription`)}
                delay={study.delay}
                onClick={() => openModal(study)}
                icon={
                  <span className="text-[var(--text-primary)]">
                    {getIconFor(study.id, idx)}
                  </span>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={activeCaseStudy ? t(`caseStudies.${activeCaseStudy.id}.modalTitle`) : ""}
      >
        {activeCaseStudy && getModalContent(activeCaseStudy.id)}
      </Modal>
    </>
  );
};

export default CaseStudies;
