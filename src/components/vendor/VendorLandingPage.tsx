import PublicFooter from "@/components/common/PublicFooter";
import PublicTopBar from "@/components/common/PublicTopBar";
import VendorDownloadForm from "@/components/vendor/VendorDownloadForm";
import { Button } from "@/components/ui/button";
import type { VendorFaqItem } from "@/types/vendor";
import translations from "../../../assets/translations/jp";

/**
 * Renders the public vendor landing page.
 *
 * @returns Vendor landing page.
 */
export default function VendorLandingPage() {
  const { hero, sections, faq, finalCta, form } = translations.vendor;
  const faqItems: VendorFaqItem[] = [
    {
      question: faq.free.question,
      answer: faq.free.answer,
    },
    {
      question: faq.privateSettings.question,
      answer: faq.privateSettings.answer,
    },
    {
      question: faq.requestApproval.question,
      answer: faq.requestApproval.answer,
    },
    {
      question: faq.technicalDisclosure.question,
      answer: faq.technicalDisclosure.answer,
    },
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffdf5_0%,#f4f8ff_38%,#f8fbff_68%,#ffffff_100%)] pt-[4.5rem]">
      <PublicTopBar />
      <section className="relative overflow-hidden px-6 pb-18 pt-10 sm:px-8 lg:px-10">
        <div className="absolute inset-x-0 top-8 mx-auto h-64 w-[min(76rem,92vw)] rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.24),_transparent_54%)] blur-3xl" />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(14,165,233,0.18),_transparent_68%)] blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-slate-600 uppercase shadow-sm backdrop-blur-sm">
              {hero.eyebrow}
            </div>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
              {hero.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                type="button"
                size="lg"
                className="h-16 rounded-[1rem] bg-sky-600 px-10 text-base font-semibold text-white hover:bg-sky-500"
              >
                {hero.primaryCta}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-16 rounded-[1rem] border-slate-300 bg-white/92 px-10 text-base font-semibold text-slate-900 hover:border-slate-950 hover:bg-white"
              >
                {hero.secondaryCta}
              </Button>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.9))] p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <div className="rounded-[1.6rem] border border-sky-100 bg-[linear-gradient(160deg,#f8fcff_0%,#eef7ff_100%)] p-6 text-slate-950">
              <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
                {hero.panelEyebrow}
              </p>
              <p className="mt-4 text-2xl font-semibold leading-tight">
                {hero.panelTitle}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {hero.panelDescription}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-sky-100 bg-white p-4">
                  <p className="text-3xl font-semibold text-slate-950">
                    SEO
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {hero.panelItems.search}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-sky-100 bg-white p-4">
                  <p className="text-3xl font-semibold text-slate-950">
                    FIT
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {hero.panelItems.comparison}
                  </p>
                </div>
                <div className="rounded-[1.25rem] border border-sky-100 bg-white p-4">
                  <p className="text-3xl font-semibold text-slate-950">
                    SAFE
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {hero.panelItems.approval}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-amber-200 bg-amber-50 p-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-amber-700 uppercase">
                  {hero.supportCards.accumulationTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {hero.supportCards.accumulationBody}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-sky-200 bg-sky-50 p-5">
                <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
                  {hero.supportCards.approvalTitle}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {hero.supportCards.approvalBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white/88 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
              {sections.accumulation.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
              {sections.accumulation.title}
            </h2>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {[
              sections.accumulation.painPoints.first,
              sections.accumulation.painPoints.second,
              sections.accumulation.painPoints.third,
              sections.accumulation.painPoints.fourth,
            ].map((item, index) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                  0{index + 1}
                </p>
                <p className="mt-3 text-lg font-medium leading-8 text-slate-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-sky-100 bg-[linear-gradient(165deg,#f6fbff_0%,#edf6ff_100%)] p-8 text-slate-950 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-10">
            <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
              {sections.search.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {sections.search.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
              {sections.search.description}
            </p>
            <p className="mt-5 text-base leading-8 text-slate-700">
              {sections.search.comparisonNote}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              sections.search.dimensions.industry,
              sections.search.dimensions.challenge,
              sections.search.dimensions.outcome,
              sections.search.dimensions.dataCondition,
              sections.search.dimensions.phase,
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-sky-100 bg-sky-50 p-6"
              >
                <p className="text-sm font-semibold tracking-[0.16em] text-sky-700 uppercase">
                  {sections.search.dimensionLabel}
                </p>
                <p className="mt-3 text-xl font-semibold text-slate-900">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-emerald-200 bg-emerald-50 p-8 lg:p-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
            {sections.approval.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
            {sections.approval.title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
            {sections.approval.description}
          </p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">
            {sections.approval.note}
          </p>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] lg:p-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            {sections.contactFlow.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
            {sections.contactFlow.title}
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {[
              {
                step: sections.contactFlow.steps.first.step,
                body: sections.contactFlow.steps.first.body,
              },
              {
                step: sections.contactFlow.steps.second.step,
                body: sections.contactFlow.steps.second.body,
              },
              {
                step: sections.contactFlow.steps.third.step,
                body: sections.contactFlow.steps.third.body,
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-sm font-semibold tracking-[0.16em] text-slate-500 uppercase">
                  {item.step}
                </p>
                <p className="mt-3 text-base leading-8 text-slate-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {[
            {
              title: sections.features.requestTitle,
              body: sections.features.requestBody,
            },
            {
              title: sections.features.performanceTitle,
              body: sections.features.performanceBody,
            },
            {
              title: sections.features.selfServeTitle,
              body: sections.features.selfServeBody,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
            >
              <p className="text-sm font-semibold tracking-[0.16em] text-sky-700 uppercase">
                {sections.features.label}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-8 text-slate-700">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(248,250,252,0.92))] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:p-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            {sections.listingFlow.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
            {sections.listingFlow.title}
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {[
              sections.listingFlow.steps.first,
              sections.listingFlow.steps.second,
              sections.listingFlow.steps.third,
              sections.listingFlow.steps.fourth,
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-slate-400 uppercase">
                  {item.step}
                </p>
                <p className="mt-3 text-lg font-semibold leading-8 text-slate-900">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] lg:p-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
            {faq.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
            {faq.title}
          </h2>
          <div className="mt-8 grid gap-4">
            {faqItems.map((item) => (
              <div
                key={item.question}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6"
              >
                <p className="text-lg font-semibold text-slate-950">
                  {item.question}
                </p>
                <p className="mt-3 text-base leading-8 text-slate-700">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-18 pt-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-sky-100 bg-[linear-gradient(160deg,#f8fcff_0%,#eef6ff_100%)] p-8 text-slate-950 shadow-[0_32px_80px_rgba(15,23,42,0.10)] lg:p-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-sky-700 uppercase">
              {finalCta.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              {finalCta.title}
            </h2>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                type="button"
                size="lg"
                className="h-16 rounded-[1rem] bg-sky-600 px-10 text-base font-semibold text-white hover:bg-sky-500"
              >
                {finalCta.primaryCta}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-20 rounded-[1.15rem] border-slate-300 bg-white px-12 text-lg font-semibold text-slate-900 shadow-[0_20px_45px_rgba(14,165,233,0.14)] hover:border-slate-950 hover:bg-slate-50"
              >
                {finalCta.secondaryCta}
              </Button>
            </div>
          </div>
          <div className="mt-10 rounded-[1.8rem] bg-white/96 p-4 text-slate-950 sm:p-6">
            <div className="mb-6 max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
                {form.eyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-950">
                {form.title}
              </h3>
              <p className="mt-3 text-base leading-8 text-slate-700">
                {form.description}
              </p>
            </div>
            <VendorDownloadForm />
          </div>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
