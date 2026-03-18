export type CaseStudyFilterGroup =
  | "challenge"
  | "industry"
  | "phase";

export interface CaseStudyRecord {
  id: string;
  slug: string;
  companyName: string;
  serviceName: string;
  industry: string;
  challenge: string;
  phase: string;
  summary: string;
  outcome: string;
  dataCondition: string;
  durationLabel: string;
  imageSrc: string;
  imageAlt: string;
  priceLabel: string;
  initialCostLabel: string;
  freePlanLabel: string;
  trialLabel: string;
}

export interface CaseStudySelectionState {
  selectedIds: string[];
  maxSelections: 5;
}

export interface SelectionToastState {
  open: boolean;
  message: string;
}

export interface CaseStudyFilterOption {
  label: string;
  value: string;
}

export interface CaseStudyFilterGroups {
  challenge: CaseStudyFilterOption[];
  industry: CaseStudyFilterOption[];
  phase: CaseStudyFilterOption[];
}

export interface CaseStudySearchParams {
  selectedChallenges: string[];
  selectedIndustries: string[];
  selectedPhases: string[];
  page: number;
  pageSize: 20;
}

export interface CaseStudyListResponse {
  items: CaseStudyRecord[];
  totalCount: number;
  currentPage: number;
  pageSize: 20;
  totalPages: number;
  availableFilters: CaseStudyFilterGroups;
}
