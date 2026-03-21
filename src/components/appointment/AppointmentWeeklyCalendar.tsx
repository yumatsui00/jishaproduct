"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AppointmentScheduleSlot } from "@/types/caseStudy";
import translations from "../../../assets/translations/jp";

interface AppointmentWeeklyCalendarProps {
  weekStart: Date;
  minSelectableAt: Date;
  maxSelectableAt: Date;
  selectedSlots: AppointmentScheduleSlot[];
  draftSlots: AppointmentScheduleSlot[];
  onPointerStart: (startAt: Date) => void;
  onPointerEnter: (startAt: Date) => void;
  onPointerEnd: () => void;
  onAllDayToggle: (dayStart: Date) => void;
  onRemoveBlock: (startAt: string, endAt: string) => void;
}

const FIRST_HOUR = 8;
const LAST_HOUR = 20;
const SLOT_HEIGHT = 44;
const HALF_HOUR_IN_MS = 30 * 60 * 1000;

interface CalendarBlock {
  startAt: string;
  endAt: string;
  dayKey: string;
}

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
 * Formats a date as a stable local day key.
 *
 * @param value Source date.
 * @returns Local day key.
 */
function toDayKey(value: Date): string {
  return [
    value.getFullYear(),
    String(value.getMonth() + 1).padStart(2, "0"),
    String(value.getDate()).padStart(2, "0"),
  ].join("-");
}

/**
 * Formats one time value for a block label.
 *
 * @param value Source date.
 * @returns Human-readable time.
 */
function formatTimeLabel(value: Date): string {
  return `${value.getHours()}:${String(value.getMinutes()).padStart(
    2,
    "0",
  )}`;
}

/**
 * Groups consecutive schedule slots into continuous blocks.
 *
 * @param slots Source schedule slots.
 * @returns Merged schedule blocks.
 */
function buildCalendarBlocks(
  slots: AppointmentScheduleSlot[],
): CalendarBlock[] {
  const sortedSlots = [...slots].sort((left, right) =>
    left.startAt.localeCompare(right.startAt),
  );
  const blocks: CalendarBlock[] = [];

  sortedSlots.forEach((slot) => {
    const slotStartAt = new Date(slot.startAt);
    const dayKey = toDayKey(slotStartAt);
    const previousBlock = blocks.at(-1);

    if (
      previousBlock &&
      previousBlock.dayKey === dayKey &&
      previousBlock.endAt === slot.startAt
    ) {
      previousBlock.endAt = slot.endAt;
      return;
    }

    blocks.push({
      startAt: slot.startAt,
      endAt: slot.endAt,
      dayKey,
    });
  });

  return blocks;
}

/**
 * Returns the grid row index for the provided local time.
 *
 * The grid starts with a 7:30 preview row, so 8:00 becomes row 1.
 *
 * @param value Target start time.
 * @returns Matching row index.
 */
function getRowIndex(value: string): number {
  const date = new Date(value);

  return (
    (date.getHours() - (FIRST_HOUR - 1)) * 2 +
    (date.getMinutes() === 30 ? 1 : 0) -
    1
  );
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
  const labels = translations.appointment.schedule.calendar;
  const days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(props.weekStart);
    day.setDate(props.weekStart.getDate() + index);

    return day;
  });
  const visibleSlotTimes = getVisibleSlotTimes(props.weekStart);
  const selectedBlocks = buildCalendarBlocks(props.selectedSlots);
  const draftBlocks = buildCalendarBlocks(props.draftSlots);

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
        <div
          className="relative"
          style={{
            height: visibleSlotTimes.length * SLOT_HEIGHT,
          }}
        >
          <div className="pointer-events-none absolute inset-0 z-10">
            {days.map((day, dayIndex) => {
              const dayKey = toDayKey(day);
              const dayBlocks = selectedBlocks.filter(
                (block) => block.dayKey === dayKey,
              );
              const dayDraftBlocks = draftBlocks.filter(
                (block) => block.dayKey === dayKey,
              );

              return (
                <div
                  key={day.toISOString()}
                  className="absolute bottom-0 top-0"
                  style={{
                    left: `${(dayIndex / 7) * 100}%`,
                    width: "calc(100% / 7)",
                  }}
                >
                  {dayBlocks.map((block) => {
                    const topIndex = getRowIndex(block.startAt);

                    if (topIndex < 0) {
                      return null;
                    }

                    const blockHeight =
                      (new Date(block.endAt).getTime() -
                        new Date(block.startAt).getTime()) /
                      HALF_HOUR_IN_MS;

                    return (
                      <div
                        key={`${block.startAt}-${block.endAt}`}
                        className="pointer-events-none absolute inset-x-1 rounded-2xl bg-sky-500/85 px-2 py-1 text-white shadow-[0_8px_24px_rgba(14,116,144,0.28)]"
                        style={{
                          top: topIndex * SLOT_HEIGHT + 2,
                          height: blockHeight * SLOT_HEIGHT - 4,
                        }}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="pointer-events-auto absolute right-1 top-1 size-5 rounded-full text-white hover:bg-transparent hover:text-white"
                          aria-label={labels.removeBlock}
                          onClick={() =>
                            props.onRemoveBlock(
                              block.startAt,
                              block.endAt,
                            )
                          }
                        >
                          <X className="size-3" />
                        </Button>
                        <span className="block pr-6 text-[11px] font-medium leading-4">
                          {`${formatTimeLabel(
                            new Date(block.startAt),
                          )} ~ ${formatTimeLabel(
                            new Date(block.endAt),
                          )}`}
                        </span>
                      </div>
                    );
                  })}
                  {dayDraftBlocks.map((block) => {
                    const topIndex = getRowIndex(block.startAt);

                    if (topIndex < 0) {
                      return null;
                    }

                    const blockHeight =
                      (new Date(block.endAt).getTime() -
                        new Date(block.startAt).getTime()) /
                      HALF_HOUR_IN_MS;

                    return (
                      <div
                        key={`draft-${block.startAt}-${block.endAt}`}
                        className="pointer-events-none absolute inset-x-1 rounded-2xl border border-dashed border-sky-500 bg-sky-200/70 px-2 py-1 text-sky-950 shadow-[0_8px_24px_rgba(14,116,144,0.12)]"
                        style={{
                          top: topIndex * SLOT_HEIGHT + 2,
                          height: blockHeight * SLOT_HEIGHT - 4,
                        }}
                      >
                        <span className="block pr-5 text-[11px] font-medium leading-4">
                          {`${formatTimeLabel(
                            new Date(block.startAt),
                          )} ~ ${formatTimeLabel(
                            new Date(block.endAt),
                          )}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {visibleSlotTimes.map((slotTime) => (
            <div
              key={slotTime.toISOString()}
              className="relative z-0"
            >
              <div className="grid grid-cols-[repeat(7,minmax(0,1fr))]">
                {days.map((day, dayIndex) => {
                  const startAt = buildSlotDate(
                    day,
                    slotTime.getHours(),
                    slotTime.getMinutes() === 0 ? 0 : 30,
                  );
                  const slotKey = toSlotKey(startAt);
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
                      aria-label={`${new Intl.DateTimeFormat("ja-JP", {
                        month: "numeric",
                        day: "numeric",
                        weekday: "short",
                      }).format(day)} ${String(startAt.getHours()).padStart(
                        2,
                        "0",
                      )}:${String(startAt.getMinutes()).padStart(2, "0")} ${
                        selectable ? labels.selected : labels.unavailable
                      }`}
                      className={
                        "relative h-11 border-r border-b border-slate-200 px-1 transition-colors last:border-r-0 " +
                        (selectable
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

                        props.onPointerStart(startAt);
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
    </div>
  );
}
