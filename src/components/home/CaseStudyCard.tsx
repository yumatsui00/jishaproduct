"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import translations from "../../../assets/translations/jp";

import type { CaseStudyRecord } from "@/types/caseStudy";

interface CaseStudyCardProps {
  item: CaseStudyRecord;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

/**
 * Renders a single landing-page case-study card.
 *
 * @param props Card data.
 * @returns A case-study card.
 */
export default function CaseStudyCard({
  item,
  checked,
  onCheckedChange,
}: CaseStudyCardProps) {
  const filterLabels = translations.home.caseStudies.filters;
  const labels = translations.home.caseStudies.card;
  const mergedCost = item.priceLabel.replace("月額", "");
  const [expanded, setExpanded] = useState(false);
  const [shouldShowMore, setShouldShowMore] = useState(false);
  const summaryContainerRef = useRef<HTMLDivElement | null>(null);
  const summaryTextRef = useRef<HTMLParagraphElement | null>(null);
  const rows = [0, 1].map((index) => ({
    challenge: item.challenge[index] ?? "",
    industry: item.industry[index] ?? "",
    phase: item.phase[index] ?? "",
  }));

  useEffect(() => {
    function updateOverflowState() {
      const container = summaryContainerRef.current;
      const text = summaryTextRef.current;

      if (!container || !text) {
        return;
      }

      setShouldShowMore(text.scrollHeight > container.clientHeight);
    }

    updateOverflowState();
    window.addEventListener("resize", updateOverflowState);

    return () => {
      window.removeEventListener("resize", updateOverflowState);
    };
  }, [item.summary]);

  return (
    <article className="overflow-hidden rounded-[0.9rem] border border-slate-200 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.08)] lg:min-h-[19rem]">
      <div className="grid gap-0 lg:grid-cols-[11rem_minmax(0,1fr)_8.25rem]">
        <div className="h-full border-b border-slate-200 bg-white p-5 lg:border-b-0 lg:border-r">
          <div className="flex h-full min-h-[19rem] flex-col justify-center">
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[8rem] overflow-hidden rounded-[0.8rem] border border-slate-200 bg-white shadow-sm">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 128px, 128px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-5 flex items-center">
              <button
                type="button"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-[0.8rem] border border-sky-500 bg-sky-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
              >
                {labels.viewArticle}
              </button>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col p-5 sm:p-6">
          <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
            {item.serviceName}
          </h3>
          {expanded ? (
            <div className="mt-4 min-h-[6rem]">
              <p className="text-sm leading-6 text-slate-700">
                {item.summary}
              </p>
              {shouldShowMore ? (
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="mt-2 text-sm font-semibold text-sky-700 transition-colors hover:text-sky-800"
                >
                  ...{labels.closeArticle}
                </button>
              ) : null}
            </div>
          ) : (
            <div
              ref={summaryContainerRef}
              className="relative mt-4 h-[6rem] overflow-hidden"
            >
              <p
                ref={summaryTextRef}
                className="text-sm leading-6 text-slate-700"
              >
                {item.summary}
              </p>
              {shouldShowMore ? (
                <div className="absolute inset-x-0 bottom-0 flex h-10 items-end justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.72)_38%,rgba(255,255,255,0.96)_72%,rgba(255,255,255,1)_100%)] pb-1">
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="rounded-[0.45rem] border border-slate-200 bg-white px-2 py-0 text-sm font-medium leading-6 text-slate-500 transition-colors hover:text-slate-600"
                  >
                    {labels.moreArticle}
                  </button>
                </div>
              ) : null}
            </div>
          )}
          <div className="mt-auto pt-4">
            <div className="overflow-hidden rounded-[1rem] border border-slate-200 bg-white">
              <div className="grid grid-cols-3 border-b border-slate-200 bg-white text-xs font-semibold tracking-[0.14em] text-slate-500 uppercase">
                <div className="border-r border-slate-200 px-3 py-3 text-center">
                  {filterLabels.challenge}
                </div>
                <div className="border-r border-slate-200 px-3 py-3 text-center">
                  {filterLabels.industry}
                </div>
                <div className="px-3 py-3 text-center">
                  {filterLabels.phase}
                </div>
              </div>
              {rows.map((row, index) => (
                <div
                  key={`${item.id}-row-${index}`}
                  className="grid min-h-11 grid-cols-3 text-sm text-slate-700"
                >
                  <div className="border-r border-slate-200 px-2 py-2">
                    {row.challenge ? (
                      <div className="flex items-center justify-center rounded-[0.8rem] border border-amber-200 bg-amber-50 px-3 py-3 text-center text-sm font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                        {row.challenge}
                      </div>
                    ) : null}
                  </div>
                  <div className="border-r border-slate-200 px-2 py-2">
                    {row.industry ? (
                      <div className="flex items-center justify-center rounded-[0.8rem] border border-slate-200 bg-slate-50 px-3 py-3 text-center text-sm font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                        {row.industry}
                      </div>
                    ) : null}
                  </div>
                  <div className="px-2 py-2">
                    {row.phase ? (
                      <div className="flex items-center justify-center rounded-[0.8rem] border border-sky-200 bg-sky-50 px-3 py-3 text-center text-sm font-semibold text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                        {row.phase}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-full min-h-[19rem] flex-row items-center gap-2 border-t border-slate-200 bg-[linear-gradient(180deg,#f2fbff_0%,#e0f2fe_100%)] p-3 lg:flex-col lg:justify-center lg:items-center lg:border-t-0 lg:border-l">
          <div className="rounded-[1rem] border border-sky-100 bg-white/90 px-3 py-3 text-center text-xs text-slate-700 shadow-[0_14px_34px_rgba(14,165,233,0.10)] lg:w-full">
            <p className="font-semibold text-slate-900">{labels.duration}</p>
            <p className="mt-1">{item.durationLabel}</p>
            <p className="mt-3 font-semibold text-slate-900">{labels.price}</p>
            <p className="mt-1 leading-5">{mergedCost}</p>
          </div>
          <label className="flex min-w-12 items-center justify-center rounded-[0.95rem] bg-transparent px-2 py-2 lg:w-full">
            <input
              type="checkbox"
              checked={checked}
              onChange={(event) => onCheckedChange(event.target.checked)}
              className="h-5 w-5 rounded-[0.35rem] border-slate-300 bg-white text-sky-600 shadow-sm focus:ring-2 focus:ring-sky-500"
            />
          </label>
        </div>
      </div>
    </article>
  );
}
