export type CaseStudyFilterGroup =
  | "challenge"
  | "industry"
  | "phase";

export interface CaseStudyFilterOption {
  label: string;
  value: string;
}

export interface CaseStudyChallengeCategory {
  id: string;
  label: string;
  items: CaseStudyFilterOption[];
}

export interface CaseStudyRecord {
  id: string;
  slug: string;
  companyName: string;
  serviceName: string;
  industry: string[];
  challenge: string[];
  phase: string[];
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

export interface CaseStudyFilterGroups {
  challenge: CaseStudyChallengeCategory[];
  industry: CaseStudyFilterOption[];
  phase: CaseStudyFilterOption[];
}

export interface CaseStudyDraftFilters {
  challenge: string[];
  industry: string[];
  phase: string[];
}

export interface CaseStudySearchParams {
  selectedChallenges: string[];
  selectedIndustries: string[];
  selectedPhases: string[];
  page: number;
  pageSize: 15;
}

export interface CaseStudyListResponse {
  items: CaseStudyRecord[];
  totalCount: number;
  currentPage: number;
  pageSize: 15;
  totalPages: number;
  availableFilters: CaseStudyFilterGroups;
}

export interface AppointmentSelectedCaseStudy {
  id: string;
  companyName: string;
  serviceName: string;
  imageSrc: string;
  imageAlt: string;
}

export interface AppointmentFormValues {
  companyName: string;
  contactName: string;
  jobTitle: string;
  email: string;
  phone: string;
  referralSource: string;
  industry: string;
  challenge: string;
  objective: string;
  projectStartTiming: string;
  budget: string;
  details: string;
  scheduleSelection: AppointmentScheduleSelection;
}

export interface AppointmentFormErrors {
  companyName?: string;
  contactName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  referralSource?: string;
  industry?: string;
  challenge?: string;
  objective?: string;
  projectStartTiming?: string;
  budget?: string;
  details?: string;
  scheduleSelection?: string;
}

export interface AppointmentScheduleSlot {
  startAt: string;
  endAt: string;
}

export interface AppointmentScheduleSelection {
  slots: AppointmentScheduleSlot[];
}

export interface AppointmentScheduleRequirement {
  minimumDays: number;
  minimumHours: number;
}
