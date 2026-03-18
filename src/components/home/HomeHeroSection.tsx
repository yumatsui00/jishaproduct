import Link from "next/link";

import translations from "../../../assets/translations/jp";

/**
 * Renders the hero section for the public landing page.
 *
 * @returns The landing-page hero section.
 */
export default function HomeHeroSection() {
  const {
    title,
    description,
    primaryCta,
    secondaryCta,
    eyebrow,
    metricsTitle,
    metrics,
    highlights,
  } = translations.home.hero;

  return (
    <section className="relative overflow-hidden px-6 pb-18 pt-10 sm:px-8 lg:px-10">
      <div className="absolute inset-x-0 top-8 mx-auto h-64 w-[min(76rem,92vw)] rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.24),_transparent_54%)] blur-3xl" />
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(14,165,233,0.18),_transparent_68%)] blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-slate-600 uppercase shadow-sm backdrop-blur-sm">
            {eyebrow}
          </div>
          <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#case-studies"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-slate-950 px-8 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_18px_40px_rgba(15,23,42,0.22)]"
            >
              {primaryCta}
            </Link>
            <Link
              href="/client-contact"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-300 bg-white/88 px-8 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:border-slate-950 hover:bg-white hover:shadow-[0_18px_36px_rgba(148,163,184,0.22)]"
            >
              {secondaryCta}
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.9))] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <div className="rounded-[1.5rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-cyan-200/85">
                <span>{metricsTitle}</span>
                <span>2026</span>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-3xl font-semibold">60+</p>
                  <p className="mt-2 text-sm text-slate-300">
                    {metrics.caseStudies}
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-3xl font-semibold">15</p>
                  <p className="mt-2 text-sm text-slate-300">
                    {metrics.cardsPerPage}
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-white/10 p-4">
                  <p className="text-3xl font-semibold">3</p>
                  <p className="mt-2 text-sm text-slate-300">
                    {metrics.filterGroups}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-amber-200 bg-amber-50 p-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-700 uppercase">
                  {highlights.outcomeTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {highlights.outcomeBody}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-sky-200 bg-sky-50 p-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
                  {highlights.trustTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {highlights.trustBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
