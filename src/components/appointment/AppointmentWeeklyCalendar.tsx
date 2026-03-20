"use client";

import type { AppointmentScheduleSlot } from "@/types/caseStudy";
import translations from "../../../assets/translations/jp";

interface AppointmentWeeklyCalendarProps {
  weekStart: Date;
  minSelectableAt: Date;
  maxSelectableAt: Date;
  selectedSlots: AppointmentScheduleSlot[];
  draggingMode: "select" | "remove" | null;
  onPointerStart: (startAt: Date, isSelected: boolean) => void;
  onPointerEnter: (startAt: Date) => void;
  onPointerEnd: () => void;
  onAllDayToggle: (dayStart: Date) => void;
}

const FIRST_HOUR = 8;
const LAST_HOUR = 20;

/**
 * Builds a date at the provided hour and minute in local time.
 *
 * @param day Base local day.
 * @param hour Target hour.
 * @param minute Target minute.
 * @returns Local date at the target time.
 */
function buildSlotDate(
  day: Date,
  hour: number,
  minute: 0 | 30,
): Date {
  return new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    hour,
    minute,
    0,
    0,
  );
}

/**
 * Returns the local start of the provided day.
 *
 * @param value Source date.
 * @returns Date at 00:00 local time.
 */
function startOfDay(value: Date): Date {
  return new Date(
    value.getFullYear(),
    value.getMonth(),
    value.getDate(),
    0,
    0,
    0,
    0,
  );
}

/**
 * Converts a date to a stable slot key.
 *
 * @param value Source date.
 * @returns Key string.
 */
function toSlotKey(value: Date): string {
  return value.toISOString();
}

/**
 * Returns the slots rendered in the visible calendar grid.
 *
 * The first row starts at 7:30 as a visual lead-in and remains
 * unselectable. Selectable rows then continue every 30 minutes.
 *
 * @param weekStart First visible day.
 * @returns Visible slot definitions.
 */
function getVisibleSlotTimes(weekStart: Date): Date[] {
  const previewStart = new Date(
    weekStart.getFullYear(),
    weekStart.getMonth(),
    weekStart.getDate(),
    FIRST_HOUR - 1,
    30,
    0,
    0,
  );

  return Array.from(
    { length: (LAST_HOUR - FIRST_HOUR) * 2 + 2 },
    (_, index) =>
      new Date(previewStart.getTime() + index * 30 * 60 * 1000),
  );
}

/**
 * Returns whether the 30-minute slot is selectable.
 *
 * @param startAt Slot start time.
 * @param minSelectableAt Lower bound.
 * @param maxSelectableAt Upper bound.
 * @returns True when selectable.
 */
function isSelectable(
  startAt: Date,
  minSelectableAt: Date,
  maxSelectableAt: Date,
): boolean {
  const endAt = new Date(startAt.getTime() + 30 * 60 * 1000);
  const startsBeforeClosing =
    startAt.getHours() < LAST_HOUR;

  return (
    startsBeforeClosing &&
    startAt >= minSelectableAt &&
    endAt <= maxSelectableAt
  );
}

/**
 * Renders the weekly schedule grid for slot selection.
 *
 * @param props Weekly calendar state and handlers.
 * @returns Weekly calendar.
 */
export default function AppointmentWeeklyCalendar(
  props: AppointmentWeeklyCalendarProps,
) {
  const selectedKeys = new Set(
    props.selectedSlots.map((slot) => slot.startAt),
  );
  const labels = translations.appointment.schedule.calendar;
  const days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(props.weekStart);
    day.setDate(props.weekStart.getDate() + index);

    return day;
  });
  const visibleSlotTimes = getVisibleSlotTimes(props.weekStart);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid grid-cols-[repeat(7,minmax(0,1fr))] border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="border-r border-slate-200 px-2 py-3 last:border-r-0"
          >
            <div className="text-center font-medium text-slate-700">
              {new Intl.DateTimeFormat("ja-JP", {
                month: "numeric",
                day: "numeric",
                weekday: "short",
              }).format(day)}
            </div>
            <button
              type="button"
              className="mt-2 w-full rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50"
              onClick={() => props.onAllDayToggle(startOfDay(day))}
            >
              {labels.allDay}
            </button>
          </div>
        ))}
      </div>
      <div className="max-h-[58vh] overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {visibleSlotTimes.map((slotTime) => (
          <div
            key={slotTime.toISOString()}
            className="relative"
          >
            <div className="grid grid-cols-[repeat(7,minmax(0,1fr))]">
              {days.map((day, dayIndex) => {
                const startAt = buildSlotDate(
                  day,
                  slotTime.getHours(),
                  slotTime.getMinutes() === 0 ? 0 : 30,
                );
                const slotKey = toSlotKey(startAt);
                const selected = selectedKeys.has(slotKey);
                const selectable = isSelectable(
                  startAt,
                  props.minSelectableAt,
                  props.maxSelectableAt,
                ) && slotTime.getHours() >= FIRST_HOUR;

                return (
                  <button
                    key={slotKey}
                    type="button"
                    disabled={!selectable}
                    aria-pressed={selected}
                    aria-label={`${new Intl.DateTimeFormat("ja-JP", {
                      month: "numeric",
                      day: "numeric",
                      weekday: "short",
                    }).format(day)} ${String(startAt.getHours()).padStart(
                      2,
                      "0",
                    )}:${String(startAt.getMinutes()).padStart(2, "0")} ${
                      selected
                        ? labels.selected
                        : selectable
                          ? ""
                          : labels.unavailable
                    }`}
                    className={
                      "relative h-11 border-r border-b border-slate-200 px-1 transition-colors last:border-r-0 " +
                      (selected
                        ? "bg-sky-500/85"
                        : selectable
                          ? dayIndex === 0
                            ? "bg-slate-50 hover:bg-sky-50"
                            : "bg-white hover:bg-sky-50"
                          : dayIndex === 0
                            ? "cursor-not-allowed bg-slate-50"
                            : "cursor-not-allowed bg-slate-100")
                    }
                    onPointerDown={() => {
                      if (!selectable) {
                        return;
                      }

                      props.onPointerStart(startAt, selected);
                    }}
                    onPointerEnter={() => {
                      if (!selectable) {
                        return;
                      }

                      props.onPointerEnter(startAt);
                    }}
                    onPointerUp={props.onPointerEnd}
                  >
                      {dayIndex === 0 &&
                      (slotTime.getMinutes() === 0 ||
                        slotTime.getMinutes() === 30) ? (
                        <span className="pointer-events-none absolute left-2 top-1 text-xs font-medium text-slate-500">
                          {`${String(startAt.getHours()).padStart(2, "0")}:${String(
                            startAt.getMinutes(),
                          ).padStart(2, "0")}~`}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
