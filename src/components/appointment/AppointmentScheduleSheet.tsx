"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AppointmentScheduleSlot } from "@/types/caseStudy";
import translations from "../../../assets/translations/jp";
import AppointmentWeeklyCalendar from "./AppointmentWeeklyCalendar";

interface AppointmentScheduleSheetProps {
  isOpen: boolean;
  weekStart: Date;
  minSelectableAt: Date;
  maxSelectableAt: Date;
  selectedSlots: AppointmentScheduleSlot[];
  draggingMode: "select" | "remove" | null;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onClose: () => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onPointerStart: (startAt: Date, isSelected: boolean) => void;
  onPointerEnter: (startAt: Date) => void;
  onPointerEnd: () => void;
  onAllDayToggle: (dayStart: Date) => void;
}

/**
 * Renders the bottom slide-in scheduling sheet.
 *
 * @param props Sheet state and calendar handlers.
 * @returns Slide-in schedule panel.
 */
export default function AppointmentScheduleSheet(
  props: AppointmentScheduleSheetProps,
) {
  const labels = translations.appointment.schedule.sheet;

  return (
    <div
      className={
        "fixed inset-0 z-50 transition-opacity " +
        (props.isOpen
          ? "pointer-events-auto bg-slate-950/35"
          : "pointer-events-none bg-transparent")
      }
      aria-hidden={!props.isOpen}
      onClick={props.onClose}
    >
      <div
        className={
          "absolute inset-x-0 bottom-0 mx-auto max-w-6xl rounded-t-[2rem] bg-[#fffdf7] shadow-[0_-24px_80px_rgba(15,23,42,0.22)] transition-transform duration-300 " +
          (props.isOpen ? "translate-y-0" : "translate-y-full")
        }
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              {labels.title}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {labels.description}
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={props.onClose}
            aria-label={labels.close}
          >
            <X className="size-4" />
          </Button>
        </div>
        <div className="px-6 py-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700">
              {new Intl.DateTimeFormat("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(props.weekStart)}
            </p>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!props.canGoPrevious}
                onClick={props.onPreviousWeek}
              >
                {labels.previousWeek}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!props.canGoNext}
                onClick={props.onNextWeek}
              >
                {labels.nextWeek}
              </Button>
            </div>
          </div>
          <AppointmentWeeklyCalendar
            weekStart={props.weekStart}
            minSelectableAt={props.minSelectableAt}
            maxSelectableAt={props.maxSelectableAt}
            selectedSlots={props.selectedSlots}
            draggingMode={props.draggingMode}
            onPointerStart={props.onPointerStart}
            onPointerEnter={props.onPointerEnter}
            onPointerEnd={props.onPointerEnd}
            onAllDayToggle={props.onAllDayToggle}
          />
        </div>
      </div>
    </div>
  );
}
