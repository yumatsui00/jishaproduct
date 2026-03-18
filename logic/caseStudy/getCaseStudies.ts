import {
  CASE_STUDY_FILTERS,
  getCaseStudyRecords,
} from "./caseStudyRepository";
import type {
  CaseStudyFilterGroups,
  CaseStudyListResponse,
  CaseStudyRecord,
  CaseStudySearchParams,
} from "@/types/caseStudy";
import type { Result } from "@/types/result";

const PAGE_SIZE = 20 as const;

/**
 * Builds available filter groups from the loaded case-study dataset.
 *
 * @param records All loaded case-study records.
 * @returns Available filter options grouped by filter type.
 */
function buildAvailableFilters(
  records: CaseStudyRecord[],
): CaseStudyFilterGroups {
  const challenges = new Set(records.map((record) => record.challenge));
  const industries = new Set(records.map((record) => record.industry));
  const phases = new Set(records.map((record) => record.phase));

  return {
    challenge: CASE_STUDY_FILTERS.challenge.filter((value) =>
      challenges.has(value),
    ).map((value) => ({
      label: value,
      value,
    })),
    industry: CASE_STUDY_FILTERS.industry.filter((value) =>
      industries.has(value),
    ).map((value) => ({
      label: value,
      value,
    })),
    phase: CASE_STUDY_FILTERS.phase.filter((value) =>
      phases.has(value),
    ).map((value) => ({
      label: value,
      value,
    })),
  };
}

/**
 * Returns whether the record matches all selected filter groups.
 *
 * @param record The case study to evaluate.
 * @param params The applied search parameters.
 * @returns True when the record should be included.
 */
function matchesFilters(
  record: CaseStudyRecord,
  params: CaseStudySearchParams,
): boolean {
  const challengeMatch =
    params.selectedChallenges.length === 0 ||
    params.selectedChallenges.includes(record.challenge);
  const industryMatch =
    params.selectedIndustries.length === 0 ||
    params.selectedIndustries.includes(record.industry);
  const phaseMatch =
    params.selectedPhases.length === 0 ||
    params.selectedPhases.includes(record.phase);

  return challengeMatch && industryMatch && phaseMatch;
}

/**
 * Returns paginated case studies for the landing page.
 *
 * @param params Selected filters and page request.
 * @returns Paginated case-study data or an error result.
 */
export async function getCaseStudies(
  params: CaseStudySearchParams,
): Promise<Result<CaseStudyListResponse>> {
  const repositoryResult = await getCaseStudyRecords();

  if (!repositoryResult.ok) {
    return repositoryResult;
  }

  const availableFilters = buildAvailableFilters(repositoryResult.data);
  const filteredItems = repositoryResult.data.filter((record) =>
    matchesFilters(record, params),
  );
  const totalCount = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const currentPage = Math.min(params.page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const items = filteredItems.slice(startIndex, startIndex + PAGE_SIZE);

  return {
    ok: true,
    data: {
      items,
      totalCount,
      currentPage,
      pageSize: PAGE_SIZE,
      totalPages,
      availableFilters,
    },
  };
}
