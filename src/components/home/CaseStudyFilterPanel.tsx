import translations from "../../../assets/translations/jp";

import type { CaseStudyFilterGroups } from "@/types/caseStudy";

interface DraftFilters {
  challenge: string[];
  industry: string[];
  phase: string[];
}

interface CaseStudyFilterPanelProps {
  availableFilters: CaseStudyFilterGroups;
  draftFilters: DraftFilters;
  isLoading: boolean;
  onToggle: (group: keyof DraftFilters, value: string) => void;
  onSearch: () => void;
}

/**
 * Renders grouped checkbox filters for the case-study list.
 *
 * @param props Filter state and callbacks.
 * @returns The case-study filter panel.
 */
export default function CaseStudyFilterPanel(
  props: CaseStudyFilterPanelProps,
) {
  const { actions, filters, layout } = translations.home.caseStudies;
  const groups = [
    { key: "challenge", label: filters.challenge },
    { key: "industry", label: filters.industry },
    { key: "phase", label: filters.phase },
  ] as const;

  return (
    <aside className="rounded-[2rem] border border-slate-200 bg-white/92 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:sticky lg:top-24 lg:flex lg:max-h-[calc(100vh-8rem)] lg:flex-col lg:overflow-hidden">
      <div className="mb-6 shrink-0">
        <p className="text-xs font-semibold tracking-[0.18em] text-slate-500 uppercase">
          {layout.filterPanelEyebrow}
        </p>
      </div>
      <div
        className="space-y-8 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2 lg:[&::-webkit-scrollbar]:hidden"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
              {group.label}
            </h3>
            <div className="mt-4 space-y-3">
              {props.availableFilters[group.key].map((option) => {
                const checked = props.draftFilters[group.key].includes(
                  option.value,
                );

                return (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 transition-colors hover:border-slate-950 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() =>
                        props.onToggle(group.key, option.value)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-900"
                    />
                    <span className="text-sm text-slate-700">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-20 shrink-0 items-center border-t border-slate-200">
        <button
          type="button"
          onClick={props.onSearch}
          disabled={props.isLoading}
          className="inline-flex min-h-12 w-full items-center justify-center rounded-[0.8rem] bg-slate-950 px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actions.search}
        </button>
      </div>
    </aside>
  );
}
