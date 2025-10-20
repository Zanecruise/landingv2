
export enum CaseStudyId {
    AssetManagement = 'assetManagement',
    PrivateBanking = 'privateBanking',
    MergersAndAcquisitions = 'mergersAndAcquisitions',
    RegulatoryReporting = 'regulatoryReporting',
}

export interface CaseStudy {
  id: CaseStudyId;
  delay?: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: CaseStudyId.AssetManagement,
    delay: "0s",
  },
  {
    id: CaseStudyId.PrivateBanking,
    delay: "0.2s",
  },
  {
    id: CaseStudyId.MergersAndAcquisitions,
    delay: "0.4s",
  },
  {
    id: CaseStudyId.RegulatoryReporting,
    delay: "0.6s",
  },
];
