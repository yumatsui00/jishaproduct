import {
  CASE_STUDY_CHALLENGE_CATEGORIES,
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

const PAGE_SIZE = 15 as const;

/**
 * Builds available filter groups from the loaded case-study dataset.
 *
 * @param records All loaded case-study records.
 * @returns Available filter options grouped by filter type.
 */
function buildAvailableFilters(
  records: CaseStudyRecord[],
): CaseStudyFilterGroups {
  const challenges = new Set(
    records.flatMap((record) => record.challenge),
  );
  const industries = new Set(records.flatMap((record) => record.industry));
  const phases = new Set(records.flatMap((record) => record.phase));

  return {
    challenge: CASE_STUDY_CHALLENGE_CATEGORIES.map((category) => ({
      id: category.id,
      label: category.label,
      items: category.items
        .filter((value) => challenges.has(value))
        .map((value) => ({
          label: value,
          value,
        })),
    })).filter((category) => category.items.length > 0),
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
    record.challenge.some((value) =>
      params.selectedChallenges.includes(value),
    );
  const industryMatch =
    params.selectedIndustries.length === 0 ||
    record.industry.some((value) =>
      params.selectedIndustries.includes(value),
    );
  const phaseMatch =
    params.selectedPhases.length === 0 ||
    record.phase.some((value) =>
      params.selectedPhases.includes(value),
    );

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
