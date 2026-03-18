import translations from "../../../assets/translations/jp";

interface SelectionActionBarProps {
  open: boolean;
  selectedCount: number;
}

/**
 * Renders the bottom floating action bar for selected articles.
 *
 * @param props Visibility and minimize state.
 * @returns The floating selection action bar.
 */
export default function SelectionActionBar(
  props: SelectionActionBarProps,
) {
  const labels = translations.home.caseStudies.selectionBar;
  const actionLabel = `${labels.requestAppointment} (${props.selectedCount})`;
  const selectionLabel = `${props.selectedCount}件${translations.home.caseStudies.layout.selectedCountLabel}`;
  const maxSelectionLabel = `*${translations.home.caseStudies.card.maxSelectionError}`;

  return (
    <div
      aria-live="polite"
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ${
        props.open
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full bg-slate-950/68 shadow-[0_-18px_50px_rgba(15,23,42,0.26)] backdrop-blur-md">
        <div className="relative flex min-h-42 items-center justify-center px-5 py-9">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-center text-white">
              <p className="text-base font-semibold">{selectionLabel}</p>
              <p className="mt-1 text-[11px] text-white/70">
                {maxSelectionLabel}
              </p>
            </div>
            <button
              type="button"
              aria-label={actionLabel}
              className="inline-flex min-h-16 items-center justify-center rounded-none bg-sky-600 px-10 text-base font-semibold text-white transition-colors hover:bg-sky-500"
            >
              {labels.requestAppointment}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
