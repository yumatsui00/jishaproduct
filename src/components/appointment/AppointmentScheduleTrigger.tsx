import { Button } from "@/components/ui/button";
import type {
  AppointmentScheduleSlot,
} from "@/types/caseStudy";
import translations from "../../../assets/translations/jp";

interface AppointmentScheduleTriggerProps {
  buttonId: string;
  isOpen: boolean;
  selectedSlots: AppointmentScheduleSlot[];
  onOpen: () => void;
}

/**
 * Formats translation strings with numeric placeholders.
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
 * Counts distinct selected days based on slot start times.
 *
 * @param slots Selected schedule slots.
 * @returns Distinct selected day count.
 */
function countSelectedDays(
  slots: AppointmentScheduleSlot[],
): number {
  return new Set(
    slots.map((slot) => new Date(slot.startAt).toDateString()),
  ).size;
}

function formatHourMinute(value: Date): string {
  return `${String(value.getHours()).padStart(2, "0")}:${String(
    value.getMinutes(),
  ).padStart(2, "0")}`;
}

/**
 * Returns grouped selected date and time-range labels.
 *
 * Consecutive 30-minute slots on the same day are merged into one range.
 *
 * @param slots Selected schedule slots.
 * @returns Sorted grouped labels.
 */
function getSelectedDateLabels(
  slots: AppointmentScheduleSlot[],
): string[] {
  const slotsByDay = new Map<string, Date[]>();

  slots.forEach((slot) => {
    const startAt = new Date(slot.startAt);
    const dayKey = [
      startAt.getFullYear(),
      String(startAt.getMonth() + 1).padStart(2, "0"),
      String(startAt.getDate()).padStart(2, "0"),
    ].join("-");
    const daySlots = slotsByDay.get(dayKey) ?? [];

    daySlots.push(startAt);
    slotsByDay.set(dayKey, daySlots);
  });

  return Array.from(slotsByDay.entries())
    .sort(([leftDay], [rightDay]) =>
      leftDay.localeCompare(rightDay),
    )
    .map(([, daySlots]) => {
      const sortedSlots = daySlots.sort(
        (left, right) => left.getTime() - right.getTime(),
      );
      const ranges: Array<{ startAt: Date; endAt: Date }> = [];

      sortedSlots.forEach((startAt) => {
        const endAt = new Date(startAt.getTime() + 30 * 60 * 1000);
        const lastRange = ranges.at(-1);

        if (
          lastRange &&
          lastRange.endAt.getTime() === startAt.getTime()
        ) {
          lastRange.endAt = endAt;
          return;
        }

        ranges.push({ startAt, endAt });
      });

      const dayLabel = new Intl.DateTimeFormat("ja-JP", {
        month: "numeric",
        day: "numeric",
        weekday: "short",
      }).format(sortedSlots[0]);
      const rangeLabel = ranges
        .map(
          (range) =>
            `${formatHourMinute(range.startAt)}~${formatHourMinute(
              range.endAt,
            )}`,
        )
        .join(", ");

      return `${dayLabel}: ${rangeLabel}`;
    });
}

/**
 * Renders the schedule trigger button and current selection summary.
 *
 * @param props Trigger and summary state.
 * @returns Schedule trigger content.
 */
export default function AppointmentScheduleTrigger(
  props: AppointmentScheduleTriggerProps,
) {
  const labels = translations.appointment.schedule.trigger;
  const selectedDays = countSelectedDays(props.selectedSlots);
  const selectedHours = props.selectedSlots.length / 2;
  const selectedDateLabels = getSelectedDateLabels(
    props.selectedSlots,
  );
  const summary =
    props.selectedSlots.length > 0
      ? formatTemplate(labels.selected, {
          days: selectedDays,
          hours: selectedHours,
        })
      : labels.empty;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-600">
            {summary}
          </p>
          {selectedDateLabels.length > 0 ? (
            <div className="text-sm text-slate-500">
              <p>{labels.selectedDatesLabel}</p>
              <div className="mt-1 space-y-1">
                {selectedDateLabels.map((label) => (
                  <p key={label}>{label}</p>
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <Button
          id={props.buttonId}
          type="button"
          variant={props.selectedSlots.length > 0 ? "outline" : "default"}
          className="h-11 rounded-xl px-4"
          onClick={props.onOpen}
          aria-expanded={props.isOpen}
        >
          {props.selectedSlots.length > 0
            ? labels.edit
            : labels.open}
        </Button>
      </div>
    </div>
  );
}
