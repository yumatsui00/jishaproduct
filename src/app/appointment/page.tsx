import AppointmentPage from "@/components/appointment/AppointmentPage";
import {
  CASE_STUDY_FILTERS,
} from "../../../logic/caseStudy/caseStudyRepository";
import { getSelectedCaseStudies } from "../../../logic/caseStudy/getSelectedCaseStudies";
import translations from "../../../assets/translations/jp";

interface AppointmentRouteProps {
  searchParams?: Promise<{
    ids?: string;
  }>;
}

/**
 * Renders the public appointment page.
 *
 * @param props Route search parameters.
 * @returns The appointment page.
 */
export default async function AppointmentRoute(
  props: AppointmentRouteProps,
) {
  const searchParams = await props.searchParams;
  const selectionResult = await getSelectedCaseStudies(
    searchParams?.ids,
  );

  return (
    <AppointmentPage
      selectedCaseStudies={
        selectionResult.ok ? selectionResult.data : []
      }
      selectedArticlesError={
        selectionResult.ok ||
        selectionResult.error.code !== "NOT_FOUND"
          ? undefined
          : translations.appointment.selectedArticles.error
      }
      challengeOptions={CASE_STUDY_FILTERS.challenge}
      industryOptions={CASE_STUDY_FILTERS.industry}
    />
  );
}
