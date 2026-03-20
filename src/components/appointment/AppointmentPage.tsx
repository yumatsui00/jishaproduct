import Image from "next/image";

import AppointmentForm from "@/components/appointment/AppointmentForm";
import PublicTopBar from "@/components/common/PublicTopBar";
import type { AppointmentSelectedCaseStudy } from "@/types/caseStudy";
import translations from "../../../assets/translations/jp";

interface AppointmentPageProps {
  selectedCaseStudies: AppointmentSelectedCaseStudy[];
  selectedArticlesError?: string;
  challengeOptions: readonly string[];
  industryOptions: readonly string[];
}

interface AppointmentSelectedArticlesProps {
  selectedCaseStudies: AppointmentSelectedCaseStudy[];
  selectedArticlesError?: string;
}

/**
 * Renders the selected-article summary area for the appointment page.
 *
 * @param props Selected articles and optional error message.
 * @returns Selected-article summary section or nothing.
 */
function AppointmentSelectedArticles(
  props: AppointmentSelectedArticlesProps,
) {
  const shouldRenderSection =
    Boolean(props.selectedArticlesError) ||
    props.selectedCaseStudies.length > 0;

  if (!shouldRenderSection) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.06)]">
      <h2 className="text-lg font-semibold text-slate-950">
        {translations.appointment.selectedArticles.title}
      </h2>
      {props.selectedArticlesError ? (
        <p className="text-sm font-medium text-red-600">
          {props.selectedArticlesError}
        </p>
      ) : null}
      {props.selectedCaseStudies.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {props.selectedCaseStudies.map((caseStudy) => (
            <article
              key={caseStudy.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={caseStudy.imageSrc}
                  alt={caseStudy.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1279px) 50vw, 20vw"
                />
              </div>
              <div className="space-y-1 p-4">
                <p className="text-sm font-semibold leading-6 text-slate-950">
                  {caseStudy.serviceName}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/**
 * Renders the appointment page layout and selected article summary.
 *
 * @param props Appointment page data and error state.
 * @returns Appointment page.
 */
export default function AppointmentPage(
  props: AppointmentPageProps,
) {
  const labels = translations.appointment;

  return (
    <main className="min-h-screen bg-[#fff9e8] pt-[4.5rem]">
      <PublicTopBar />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 md:py-16">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">
            {labels.page.title}
          </h1>
          <p className="text-base leading-7 text-slate-600">
            {labels.page.description}
          </p>
        </div>
        <AppointmentSelectedArticles
          selectedCaseStudies={props.selectedCaseStudies}
          selectedArticlesError={props.selectedArticlesError}
        />
        <AppointmentForm
          selectedArticleCount={props.selectedCaseStudies.length}
          challengeOptions={props.challengeOptions}
          industryOptions={props.industryOptions}
        />
      </section>
    </main>
  );
}
