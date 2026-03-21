import type {
  AppointmentScheduleRequirement,
  AppointmentScheduleSlot,
} from "@/types/caseStudy";
import translations from "../../../assets/translations/jp";

interface AppointmentScheduleRequirementProps {
  requirement: AppointmentScheduleRequirement;
  selectedSlots: AppointmentScheduleSlot[];
}

/**
 * Replaces numbered placeholders in translation strings.
 *
 * @param template Source translation text.
 * @param replacements Placeholder values.
 * @returns Formatted text.
 */
function formatTemplate(
  template: string,
  replacements: Record<string, number>,
): string {
  return Object.entries(replacements).reduce(
    (result, [key, value]) =>
      result.replace(`{${key}}`, String(value)),
    template,
  );
}

/**
 * Returns the number of distinct local days in the selected slots.
 *
 * @param slots Selected schedule slots.
 * @returns Count of selected days.
 */
function countSelectedDays(
  slots: AppointmentScheduleSlot[],
): number {
  const days = new Set(
    slots.map((slot) => {
      const start = new Date(slot.startAt);

      return [
        start.getFullYear(),
        String(start.getMonth() + 1).padStart(2, "0"),
        String(start.getDate()).padStart(2, "0"),
      ].join("-");
    }),
  );

  return days.size;
}

/**
 * Renders the required minimum schedule conditions.
 *
 * @param props Requirement values and current selection.
 * @returns Requirement summary.
 */
export default function AppointmentScheduleRequirement(
  props: AppointmentScheduleRequirementProps,
) {
  const labels = translations.appointment.schedule.requirement;
  const selectedDays = countSelectedDays(props.selectedSlots);
  const selectedHours = props.selectedSlots.length / 2;
  const hasMinimumDays =
    selectedDays >= props.requirement.minimumDays;
  const hasMinimumHours =
    selectedHours >= props.requirement.minimumHours;
  const achievedClass =
    "bg-emerald-100 text-emerald-800";
  const pendingClass = "bg-rose-100 text-rose-700";

  return (
    <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4">
      <p className="text-sm font-semibold text-slate-950">
        {labels.title}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <span
          className={
            "rounded-full px-3 py-1 text-xs font-medium " +
            (hasMinimumDays ? achievedClass : pendingClass)
          }
        >
          {formatTemplate(labels.days, {
            days: props.requirement.minimumDays,
          })}
        </span>
        <span
          className={
            "rounded-full px-3 py-1 text-xs font-medium " +
            (hasMinimumHours ? achievedClass : pendingClass)
          }
        >
          {formatTemplate(labels.hours, {
            hours: props.requirement.minimumHours,
          })}
        </span>
      </div>
    </div>
  );
}
