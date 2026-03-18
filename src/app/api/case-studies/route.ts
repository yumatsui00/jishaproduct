import { NextResponse } from "next/server";

import type { CaseStudySearchParams } from "@/types/caseStudy";
import { getCaseStudies } from "../../../../logic/caseStudy/getCaseStudies";
import {
  CASE_STUDY_FILTERS,
} from "../../../../logic/caseStudy/caseStudyRepository";

const PAGE_SIZE = 15 as const;

/**
 * Normalizes repeated query values against an allowed value set.
 *
 * @param values Raw query-string values.
 * @param allowed Allowed filter values.
 * @returns Deduplicated values that exist in the allowed set.
 */
function normalizeFilters(
  values: string[],
  allowed: readonly string[],
): string[] {
  const allowedSet = new Set(allowed);

  return [...new Set(values)].filter((value) => allowedSet.has(value));
}

/**
 * Parses search parameters into case-study search params.
 *
 * @param requestUrl The request URL containing query params.
 * @returns Normalized search params.
 */
function parseSearchParams(requestUrl: URL): CaseStudySearchParams {
  const rawPage = Number(requestUrl.searchParams.get("page"));
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  return {
    selectedChallenges: normalizeFilters(
      requestUrl.searchParams.getAll("challenge"),
      CASE_STUDY_FILTERS.challenge,
    ),
    selectedIndustries: normalizeFilters(
      requestUrl.searchParams.getAll("industry"),
      CASE_STUDY_FILTERS.industry,
    ),
    selectedPhases: normalizeFilters(
      requestUrl.searchParams.getAll("phase"),
      CASE_STUDY_FILTERS.phase,
    ),
    page,
    pageSize: PAGE_SIZE,
  };
}

/**
 * Returns filtered and paginated case studies for the landing page.
 *
 * @param request The incoming HTTP request.
 * @returns JSON response with case-study data or an error payload.
 */
export async function GET(request: Request) {
  const params = parseSearchParams(new URL(request.url));
  const result = await getCaseStudies(params);

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, data: result.data });
}
