import translations from "../../../assets/translations/jp";

interface SelectionToastProps {
  open: boolean;
  message: string;
}

/**
 * Renders a floating toast for selection-limit feedback.
 *
 * @param props Visibility state and message.
 * @returns The selection toast component.
 */
export default function SelectionToast({
  open,
  message,
}: SelectionToastProps) {
  const { title } = translations.home.caseStudies.toast;

  return (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed right-4 top-24 z-50 transition-all duration-300 sm:right-6 ${
        open
          ? "translate-y-0 opacity-100"
          : "-translate-y-3 opacity-0"
      }`}
    >
      <div className="max-w-sm rounded-[1.4rem] border border-rose-200 bg-white/96 px-5 py-4 shadow-[0_22px_60px_rgba(15,23,42,0.16)] backdrop-blur-sm">
        <p className="text-xs font-semibold tracking-[0.18em] text-rose-600 uppercase">
          {title}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{message}</p>
      </div>
    </div>
  );
}
