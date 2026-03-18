"use client";

import { useState } from "react";

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
  const labels = translations.home.caseStudies.card;
  const mergedCost = item.priceLabel.replace("月額", "");
  const [expanded, setExpanded] = useState(false);
  const shouldShowMore = item.summary.length > 90;

  return (
    <article className="overflow-hidden rounded-[0.9rem] border border-slate-200 bg-white shadow-[0_18px_46px_rgba(15,23,42,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[11rem_1fr_8.25rem]">
        <div className="border-b border-slate-200 bg-white p-4 lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col">
            <div className="flex flex-1 items-center justify-center">
              <div className="relative aspect-square w-full max-w-[7rem] overflow-hidden rounded-[0.8rem] border border-slate-200 bg-white shadow-sm">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 112px, 112px"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-3 flex flex-1 items-center">
              <button
                type="button"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-[0.7rem] border border-sky-200 bg-sky-100 px-4 text-sm font-semibold text-sky-800 transition-colors hover:bg-sky-200"
              >
                {labels.viewArticle}
              </button>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
            {item.serviceName}
          </h3>
          {expanded ? (
            <>
              <p className="mt-3 text-sm leading-6 text-slate-700">
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
            </>
          ) : (
            <div className="relative mt-3 h-[4.55rem] overflow-hidden">
              <p className="text-sm leading-6 text-slate-700">
                {item.summary}
              </p>
              {shouldShowMore ? (
                <div className="absolute inset-x-0 bottom-0 flex h-9 items-end justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.72)_38%,rgba(255,255,255,0.96)_72%,rgba(255,255,255,1)_100%)] pb-0.5">
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
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-[0.65rem] bg-slate-100 px-3 py-1 font-medium text-slate-600">
              {item.industry}
            </span>
            <span className="rounded-[0.65rem] bg-amber-50 px-3 py-1 font-medium text-amber-700">
              {item.challenge}
            </span>
            <span className="rounded-[0.65rem] bg-sky-50 px-3 py-1 font-medium text-sky-700">
              {item.phase}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-stretch gap-3 bg-[linear-gradient(180deg,#eff9ff_0%,#d9f1ff_100%)] p-3 lg:flex-col lg:items-center">
          <div className="flex-1 rounded-[0.8rem] bg-white/72 px-3 py-3 text-center text-xs text-slate-700 shadow-sm lg:w-full">
            <p className="font-semibold text-slate-900">{labels.duration}</p>
            <p className="mt-1">{item.durationLabel}</p>
            <p className="mt-3 font-semibold text-slate-900">{labels.price}</p>
            <p className="mt-1 leading-5">{mergedCost}</p>
          </div>
          <label className="flex min-w-14 items-center justify-center px-1 py-3 lg:w-full">
            <input
              type="checkbox"
              checked={checked}
              onChange={(event) => onCheckedChange(event.target.checked)}
              className="h-5 w-5 rounded-[0.3rem] border-slate-300 bg-white text-slate-950 shadow-sm focus:ring-2 focus:ring-slate-900"
            />
          </label>
        </div>
      </div>
    </article>
  );
}
