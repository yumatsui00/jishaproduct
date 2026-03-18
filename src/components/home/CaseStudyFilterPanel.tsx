import translations from "../../../assets/translations/jp";

import type {
  CaseStudyDraftFilters,
  CaseStudyFilterGroups,
} from "@/types/caseStudy";

interface CaseStudyFilterPanelProps {
  availableFilters: CaseStudyFilterGroups;
  draftFilters: CaseStudyDraftFilters;
  isLoading: boolean;
  onToggle: (
    group: keyof CaseStudyDraftFilters,
    value: string,
  ) => void;
  onToggleChallengeCategory: (categoryId: string) => void;
  onSearch: () => void;
}

interface FlatFilterGroup {
  key: "industry" | "phase";
  label: string;
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
  const groups: FlatFilterGroup[] = [
    { key: "industry", label: filters.industry },
    { key: "phase", label: filters.phase },
  ];

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
        <div>
          <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase">
            {filters.challenge}
          </h3>
          <div className="mt-4 space-y-4">
            {props.availableFilters.challenge.map((category) => {
              const checkedCount = category.items.filter((item) =>
                props.draftFilters.challenge.includes(item.value),
              ).length;
              const allChecked = checkedCount === category.items.length;

              return (
                <section
                  key={category.id}
                  className="rounded-[1.4rem] border border-slate-200 bg-slate-50/70 p-4"
                >
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-slate-950 hover:bg-slate-50">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={() =>
                        props.onToggleChallengeCategory(category.id)
                      }
                      className="h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-900"
                    />
                    <span className="text-sm font-semibold text-slate-900">
                      {category.label}
                    </span>
                  </label>
                  <div className="mt-3 space-y-2">
                    {category.items.map((option) => {
                      const checked =
                        props.draftFilters.challenge.includes(option.value);

                      return (
                        <label
                          key={option.value}
                          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition-colors hover:border-slate-950 hover:bg-slate-50"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              props.onToggle("challenge", option.value)
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
                </section>
              );
            })}
          </div>
        </div>
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
          className="inline-flex min-h-12 w-full items-center justify-center rounded-[0.8rem] bg-sky-600 px-5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {actions.search}
        </button>
      </div>
    </aside>
  );
}
