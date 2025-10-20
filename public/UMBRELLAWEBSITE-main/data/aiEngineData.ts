import React from 'react';
import { FiGitBranch, FiFileText, FiTrendingUp, FiBriefcase, FiShield, FiZap } from 'react-icons/fi';

// --- Enums ---
export enum ModalId {
    Orchestrator = 'orchestrator',
    Parser = 'parser',
    Analyst = 'analyst',
    ChiefStrategist = 'chiefStrategist',
    ComplianceShield = 'complianceShield',
    SreAntifragile = 'sreAntifragile',
}

// --- Interfaces ---
export interface AiEngine {
    id: ModalId;
    icon: React.FC;
    shortDescriptionKey: string;
}

// --- Data Exports ---
export const aiEnginesData: AiEngine[] = [
  { 
    id: ModalId.Orchestrator,
    icon: FiGitBranch,
    shortDescriptionKey: 'aiEngineCarousel.orchestrator.shortDescription'
  },
  { 
    id: ModalId.Parser,
    icon: FiFileText,
    shortDescriptionKey: 'aiEngineCarousel.parser.shortDescription'
  },
  { 
    id: ModalId.Analyst,
    icon: FiTrendingUp,
    shortDescriptionKey: 'aiEngineCarousel.analyst.shortDescription'
  },
  { 
    id: ModalId.ChiefStrategist,
    icon: FiBriefcase,
    shortDescriptionKey: 'aiEngineCarousel.chiefStrategist.shortDescription'
  },
  { 
    id: ModalId.ComplianceShield,
    icon: FiShield,
    shortDescriptionKey: 'aiEngineCarousel.complianceShield.shortDescription'
  },
  { 
    id: ModalId.SreAntifragile,
    icon: FiZap,
    shortDescriptionKey: 'aiEngineCarousel.sreAntifragile.shortDescription'
  },
];