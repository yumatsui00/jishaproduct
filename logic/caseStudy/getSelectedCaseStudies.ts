import { getCaseStudyRecordsByIds } from "./caseStudyRepository";

import type {
  AppointmentSelectedCaseStudy,
  CaseStudyRecord,
} from "@/types/caseStudy";
import type { Result } from "@/types/result";

const MAX_SELECTIONS = 5 as const;

/**
 * Normalizes the ids query string into a deduplicated selection list.
 *
 * @param idsParam Raw comma-separated ids query value.
 * @returns Deduplicated ids in first-seen order.
 */
function normalizeSelectedIds(idsParam?: string): string[] {
  if (!idsParam) {
    return [];
  }

  const deduplicatedIds = new Set<string>();

  idsParam
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0)
    .forEach((value) => {
      if (deduplicatedIds.size < MAX_SELECTIONS) {
        deduplicatedIds.add(value);
      }
    });

  return [...deduplicatedIds];
}

/**
 * Maps a case-study record into the appointment page selection model.
 *
 * @param record Source case-study record.
 * @returns Appointment selection view model.
 */
function mapToAppointmentCaseStudy(
  record: CaseStudyRecord,
): AppointmentSelectedCaseStudy {
  return {
    id: record.id,
    companyName: record.companyName,
    serviceName: record.serviceName,
    imageSrc: record.imageSrc,
    imageAlt: record.imageAlt,
  };
}

/**
 * Resolves selected case studies for the appointment page.
 *
 * @param idsParam Raw comma-separated ids query value.
 * @returns Selected case studies or an error result.
 */
export async function getSelectedCaseStudies(
  idsParam?: string,
): Promise<Result<AppointmentSelectedCaseStudy[]>> {
  const selectedIds = normalizeSelectedIds(idsParam);

  if (selectedIds.length === 0) {
    return { ok: true, data: [] };
  }

  const repositoryResult = await getCaseStudyRecordsByIds(selectedIds);

  if (!repositoryResult.ok) {
    return repositoryResult;
  }

  if (repositoryResult.data.length !== selectedIds.length) {
    return {
      ok: false,
      error: {
        code: "NOT_FOUND",
        message: "One or more case studies were not found.",
      },
    };
  }

  return {
    ok: true,
    data: repositoryResult.data.map(mapToAppointmentCaseStudy),
  };
}
