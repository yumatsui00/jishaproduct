"use client";

import { useEffect, useMemo, useState } from "react";

import AppointmentField from "@/components/appointment/AppointmentField";
import AppointmentScheduleRequirement from "@/components/appointment/AppointmentScheduleRequirement";
import AppointmentScheduleSheet from "@/components/appointment/AppointmentScheduleSheet";
import AppointmentScheduleTrigger from "@/components/appointment/AppointmentScheduleTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  AppointmentFormErrors,
  AppointmentFormValues,
  AppointmentScheduleRequirement as AppointmentScheduleRequirementType,
  AppointmentScheduleSelection,
  AppointmentScheduleSlot,
} from "@/types/caseStudy";
import translations from "../../../assets/translations/jp";

interface AppointmentFormProps {
  selectedArticleCount: number;
  challengeOptions: readonly string[];
  industryOptions: readonly string[];
}

interface AppointmentInputFieldProps {
  id: keyof AppointmentFormValues;
  label: string;
  placeholder: string;
  value: string;
  errorMessage?: string;
  required?: boolean;
  optionalLabel?: string;
  type?: "email" | "tel" | "text";
  onChange: (value: string) => void;
}

interface AppointmentSelectFieldProps {
  id: keyof AppointmentFormValues;
  label: string;
  placeholder: string;
  value: string;
  options: readonly string[];
  errorMessage?: string;
  required?: boolean;
  optionalLabel?: string;
  onChange: (value: string) => void;
}

interface AppointmentTextareaFieldProps {
  id: keyof AppointmentFormValues;
  label: string;
  placeholder: string;
  value: string;
  errorMessage?: string;
  required?: boolean;
  optionalLabel?: string;
  className?: string;
  onChange: (value: string) => void;
}

const HOUR_IN_MS = 60 * 60 * 1000;
const HALF_HOUR_IN_MS = 30 * 60 * 1000;
const DAY_IN_MS = 24 * HOUR_IN_MS;
const FIRST_HOUR = 8;
const LAST_HOUR = 20;

const initialFormValues: AppointmentFormValues = {
  companyName: "",
  contactName: "",
  jobTitle: "",
  email: "",
  phone: "",
  referralSource: "",
  industry: "",
  challenge: "",
  objective: "",
  projectStartTiming: "",
  budget: "",
  details: "",
  scheduleSelection: {
    slots: [],
  },
};

/**
 * Returns whether a string is blank after trimming.
 *
 * @param value User input value.
 * @returns True when the value is empty.
 */
function isBlank(value: string): boolean {
  return value.trim().length === 0;
}

/**
 * Replaces placeholders in translation text.
 *
 * @param template Source translation string.
 * @param replacements Placeholder values.
 * @returns Formatted string.
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
 * Returns the local start of the provided day.
 *
 * @param value Source date.
 * @returns Local day start.
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
 * Builds a local schedule slot for the provided 30-minute boundary.
 *
 * @param startAt Slot start date.
 * @returns One-hour schedule slot.
 */
function createScheduleSlot(
  startAt: Date,
): AppointmentScheduleSlot {
  return {
    startAt: startAt.toISOString(),
    endAt: new Date(startAt.getTime() + HALF_HOUR_IN_MS).toISOString(),
  };
}

/**
 * Returns the requirement for the selected article count.
 *
 * @param selectedArticleCount Number of selected articles.
 * @returns Required minimum days and hours.
 */
function getScheduleRequirement(
  selectedArticleCount: number,
): AppointmentScheduleRequirementType {
  if (selectedArticleCount >= 4) {
    return {
      minimumDays: 4,
      minimumHours: 15,
    };
  }

  if (selectedArticleCount >= 2) {
    return {
      minimumDays: 3,
      minimumHours: 10,
    };
  }

  return {
    minimumDays: 2,
    minimumHours: 5,
  };
}

/**
 * Returns the number of distinct selected local days.
 *
 * @param slots Selected schedule slots.
 * @returns Distinct day count.
 */
function countSelectedDays(
  slots: AppointmentScheduleSlot[],
): number {
  return new Set(
    slots.map((slot) => new Date(slot.startAt).toDateString()),
  ).size;
}

/**
 * Sorts schedule slots by start time and removes duplicates.
 *
 * @param slots Candidate slot list.
 * @returns Normalized slot list.
 */
function normalizeSlots(
  slots: AppointmentScheduleSlot[],
): AppointmentScheduleSlot[] {
  const uniqueSlots = new Map(
    slots.map((slot) => [slot.startAt, slot]),
  );

  return [...uniqueSlots.values()].sort((left, right) =>
    left.startAt.localeCompare(right.startAt),
  );
}

/**
 * Returns whether the provided 30-minute slot is selectable.
 *
 * @param startAt Slot start time.
 * @param minSelectableAt Lower bound.
 * @param maxSelectableAt Upper bound.
 * @returns True when the slot is selectable.
 */
function isSelectableSlot(
  startAt: Date,
  minSelectableAt: Date,
  maxSelectableAt: Date,
): boolean {
  const endAt = new Date(startAt.getTime() + HALF_HOUR_IN_MS);

  return (
    startAt >= minSelectableAt && endAt <= maxSelectableAt
  );
}

/**
 * Returns the valid 30-minute slots for a day.
 *
 * @param dayStart Target local day start.
 * @param minSelectableAt Lower bound.
 * @param maxSelectableAt Upper bound.
 * @returns Selectable slots for the day.
 */
function getSelectableDaySlots(
  dayStart: Date,
  minSelectableAt: Date,
  maxSelectableAt: Date,
): AppointmentScheduleSlot[] {
  return Array.from(
    { length: (LAST_HOUR - FIRST_HOUR) * 2 },
    (_, index) => {
      const hour = FIRST_HOUR + Math.floor(index / 2);
      const minute = index % 2 === 0 ? 0 : 30;
      const startAt = new Date(
        dayStart.getFullYear(),
        dayStart.getMonth(),
        dayStart.getDate(),
        hour,
        minute,
        0,
        0,
      );

      return startAt;
    },
  )
    .filter((startAt) =>
      isSelectableSlot(startAt, minSelectableAt, maxSelectableAt),
    )
    .map(createScheduleSlot);
}

/**
 * Validates appointment form values before local submission.
 *
 * @param values Current form values.
 * @param selectedArticleCount Number of selected articles.
 * @param requirement Required minimum schedule values.
 * @returns Field-level validation errors.
 */
function validateForm(
  values: AppointmentFormValues,
  selectedArticleCount: number,
  requirement: AppointmentScheduleRequirementType,
): AppointmentFormErrors {
  const appointmentLabels = translations.appointment;
  const requiredMessage = appointmentLabels.validation.required;
  const errors: AppointmentFormErrors = {};

  if (isBlank(values.companyName)) {
    errors.companyName = requiredMessage;
  }

  if (isBlank(values.contactName)) {
    errors.contactName = requiredMessage;
  }

  if (isBlank(values.email)) {
    errors.email = requiredMessage;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(values.email.trim())) {
    errors.email = appointmentLabels.validation.email;
  }

  if (isBlank(values.phone)) {
    errors.phone = requiredMessage;
  }

  if (isBlank(values.referralSource)) {
    errors.referralSource = requiredMessage;
  }

  if (isBlank(values.industry)) {
    errors.industry = requiredMessage;
  }

  if (isBlank(values.challenge)) {
    errors.challenge = requiredMessage;
  }

  if (isBlank(values.objective)) {
    errors.objective = requiredMessage;
  }

  if (isBlank(values.details)) {
    errors.details = requiredMessage;
  }

  if (selectedArticleCount > 0) {
    const selectedDays = countSelectedDays(
      values.scheduleSelection.slots,
    );
    const selectedHours = values.scheduleSelection.slots.length / 2;

    if (selectedHours === 0) {
      errors.scheduleSelection =
        appointmentLabels.validation.scheduleRequired;
    } else if (
      selectedDays < requirement.minimumDays &&
      selectedHours < requirement.minimumHours
    ) {
      errors.scheduleSelection = formatTemplate(
        appointmentLabels.validation.scheduleCombined,
        {
          days: requirement.minimumDays,
          hours: requirement.minimumHours,
        },
      );
    } else if (selectedDays < requirement.minimumDays) {
      errors.scheduleSelection = formatTemplate(
        appointmentLabels.validation.scheduleMinimumDays,
        { days: requirement.minimumDays },
      );
    } else if (selectedHours < requirement.minimumHours) {
      errors.scheduleSelection = formatTemplate(
        appointmentLabels.validation.scheduleMinimumHours,
        { hours: requirement.minimumHours },
      );
    }
  }

  return errors;
}

const fieldOrder: (keyof AppointmentFormValues)[] = [
  "companyName",
  "contactName",
  "jobTitle",
  "email",
  "phone",
  "referralSource",
  "industry",
  "challenge",
  "objective",
  "projectStartTiming",
  "budget",
  "details",
  "scheduleSelection",
];

/**
 * Renders one appointment text input field.
 *
 * @param props Input field metadata and handlers.
 * @returns One wrapped text input.
 */
function AppointmentInputField(
  props: AppointmentInputFieldProps,
) {
  return (
    <AppointmentField
      id={props.id}
      label={props.label}
      required={props.required}
      optionalLabel={props.optionalLabel}
      errorMessage={props.errorMessage}
    >
      <Input
        id={props.id}
        name={props.id}
        type={props.type ?? "text"}
        aria-invalid={Boolean(props.errorMessage)}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
      />
    </AppointmentField>
  );
}

/**
 * Renders one appointment select field.
 *
 * @param props Select field metadata and handlers.
 * @returns One wrapped select input.
 */
function AppointmentSelectField(
  props: AppointmentSelectFieldProps,
) {
  return (
    <AppointmentField
      id={props.id}
      label={props.label}
      required={props.required}
      optionalLabel={props.optionalLabel}
      errorMessage={props.errorMessage}
    >
      <Select
        value={props.value}
        onValueChange={props.onChange}
      >
        <SelectTrigger
          id={props.id}
          aria-invalid={Boolean(props.errorMessage)}
          className="rounded-md"
        >
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {props.options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </AppointmentField>
  );
}

/**
 * Renders one appointment textarea field.
 *
 * @param props Textarea field metadata and handlers.
 * @returns One wrapped textarea input.
 */
function AppointmentTextareaField(
  props: AppointmentTextareaFieldProps,
) {
  return (
    <AppointmentField
      id={props.id}
      label={props.label}
      required={props.required}
      optionalLabel={props.optionalLabel}
      errorMessage={props.errorMessage}
    >
      <Textarea
        id={props.id}
        name={props.id}
        aria-invalid={Boolean(props.errorMessage)}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value)}
        className={props.className}
      />
    </AppointmentField>
  );
}

/**
 * Scrolls to and focuses the first invalid field after submission.
 *
 * @param field Target invalid field name.
 * @returns Nothing.
 */
function focusField(field: keyof AppointmentFormValues) {
  const target = document.getElementById(field);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  window.setTimeout(() => {
    target.focus();
  }, 150);
}

/**
 * Renders the appointment form and local validation state.
 *
 * @param props Select input options and article count.
 * @returns Interactive appointment form.
 */
export default function AppointmentForm(
  props: AppointmentFormProps,
) {
  const labels = translations.appointment.form;
  const scheduleLabels = translations.appointment.schedule;
  const placeholders = labels.placeholders;
  const scheduleEnabled = props.selectedArticleCount > 0;
  const requirement = getScheduleRequirement(props.selectedArticleCount);
  const [currentTime] = useState(() => new Date());
  const minSelectableAt = useMemo(
    () => new Date(currentTime.getTime() + DAY_IN_MS),
    [currentTime],
  );
  const maxSelectableAt = useMemo(
    () => new Date(currentTime.getTime() + 15 * DAY_IN_MS),
    [currentTime],
  );
  const [values, setValues] =
    useState<AppointmentFormValues>(initialFormValues);
  const [errors, setErrors] = useState<AppointmentFormErrors>({});
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [draggingMode, setDraggingMode] = useState<
    "select" | "remove" | null
  >(null);
  const [weekStart, setWeekStart] = useState(() =>
    startOfDay(currentTime),
  );

  useEffect(() => {
    function handlePointerUp() {
      setDraggingMode(null);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsScheduleOpen(false);
        setDraggingMode(null);
      }
    }

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /**
   * Updates one form field value.
   *
   * @param field Target field name.
   * @param value Next field value.
   * @returns Nothing.
   */
  function handleChange(
    field: keyof AppointmentFormValues,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  /**
   * Replaces the full schedule selection.
   *
   * @param updater Next schedule selection or updater.
   * @returns Nothing.
   */
  function updateScheduleSelection(
    updater:
      | AppointmentScheduleSelection
      | ((
          current: AppointmentScheduleSelection,
        ) => AppointmentScheduleSelection),
  ) {
    setValues((current) => ({
      ...current,
      scheduleSelection:
        typeof updater === "function"
          ? updater(current.scheduleSelection)
          : updater,
    }));
    setErrors((current) => ({
      ...current,
      scheduleSelection: undefined,
    }));
  }

  /**
   * Applies one slot change during click or drag selection.
   *
   * @param startAt Slot start time.
   * @param mode Selection mode.
   * @returns Nothing.
   */
  function applySlot(
    startAt: Date,
    mode: "select" | "remove",
  ) {
    updateScheduleSelection((currentSelection) => ({
      slots: ((currentSlots) => {
        const nextSlot = createScheduleSlot(startAt);

        if (mode === "select") {
          return normalizeSlots([...currentSlots, nextSlot]);
        }

        return currentSlots.filter(
          (slot) => slot.startAt !== nextSlot.startAt,
        );
      })(currentSelection.slots),
    }));
  }

  /**
   * Handles starting pointer-based slot selection.
   *
   * @param startAt Slot start time.
   * @param isSelected Whether the slot is already selected.
   * @returns Nothing.
   */
  function handleSchedulePointerStart(
    startAt: Date,
    isSelected: boolean,
  ) {
    const mode = isSelected ? "remove" : "select";
    setDraggingMode(mode);
    applySlot(startAt, mode);
  }

  /**
   * Handles pointer entry while dragging across the schedule grid.
   *
   * @param startAt Slot start time.
   * @returns Nothing.
   */
  function handleSchedulePointerEnter(startAt: Date) {
    if (!draggingMode) {
      return;
    }

    applySlot(startAt, draggingMode);
  }

  /**
   * Toggles all selectable hours for a given day.
   *
   * @param dayStart Start of the target day.
   * @returns Nothing.
   */
  function handleAllDayToggle(dayStart: Date) {
    const daySlots = getSelectableDaySlots(
      dayStart,
      minSelectableAt,
      maxSelectableAt,
    );
    updateScheduleSelection((currentSelection) => {
      const selectedKeys = new Set(
        currentSelection.slots.map((slot) => slot.startAt),
      );
      const allSelected = daySlots.every((slot) =>
        selectedKeys.has(slot.startAt),
      );

      if (allSelected) {
        return {
          slots: currentSelection.slots.filter((slot) => {
            const slotDate = new Date(slot.startAt);

            return (
              slotDate.getFullYear() !== dayStart.getFullYear() ||
              slotDate.getMonth() !== dayStart.getMonth() ||
              slotDate.getDate() !== dayStart.getDate()
            );
          }),
        };
      }

      return {
        slots: normalizeSlots([
          ...currentSelection.slots,
          ...daySlots,
        ]),
      };
    });
  }

  /**
   * Validates the form on submit and blocks invalid submissions.
   *
   * @param event Submit event from the form.
   * @returns Nothing.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(
      values,
      props.selectedArticleCount,
      requirement,
    );
    setErrors(nextErrors);

    const firstErrorField = fieldOrder.find((field) =>
      Boolean(nextErrors[field]),
    );

    if (!firstErrorField) {
      return;
    }

    if (firstErrorField === "scheduleSelection") {
      setIsScheduleOpen(true);
    }

    focusField(firstErrorField);
  }

  const maxWeekStart = startOfDay(maxSelectableAt);
  const canGoPrevious = weekStart > startOfDay(currentTime);
  const nextWeekStart = new Date(weekStart.getTime() + 7 * DAY_IN_MS);
  const canGoNext = nextWeekStart <= maxWeekStart;

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:grid-cols-2 md:p-8"
      >
        <AppointmentInputField
          id="companyName"
          label={labels.companyName}
          placeholder={placeholders.companyName}
          value={values.companyName}
          errorMessage={errors.companyName}
          required
          onChange={(value) => handleChange("companyName", value)}
        />
        <AppointmentInputField
          id="contactName"
          label={labels.contactName}
          placeholder={placeholders.contactName}
          value={values.contactName}
          errorMessage={errors.contactName}
          required
          onChange={(value) => handleChange("contactName", value)}
        />
        <AppointmentInputField
          id="jobTitle"
          label={labels.jobTitle}
          placeholder={placeholders.jobTitle}
          value={values.jobTitle}
          optionalLabel={labels.optional}
          onChange={(value) => handleChange("jobTitle", value)}
        />
        <AppointmentInputField
          id="email"
          label={labels.email}
          type="email"
          placeholder={placeholders.email}
          value={values.email}
          errorMessage={errors.email}
          required
          onChange={(value) => handleChange("email", value)}
        />
        <AppointmentInputField
          id="phone"
          label={labels.phone}
          type="tel"
          placeholder={placeholders.phone}
          value={values.phone}
          errorMessage={errors.phone}
          required
          onChange={(value) => handleChange("phone", value)}
        />
        <AppointmentInputField
          id="referralSource"
          label={labels.referralSource}
          placeholder={placeholders.referralSource}
          value={values.referralSource}
          errorMessage={errors.referralSource}
          required
          onChange={(value) => handleChange("referralSource", value)}
        />
        <AppointmentSelectField
          id="industry"
          label={labels.industry}
          placeholder={placeholders.industry}
          value={values.industry}
          options={props.industryOptions}
          errorMessage={errors.industry}
          required
          onChange={(value) => handleChange("industry", value)}
        />
        <AppointmentSelectField
          id="challenge"
          label={labels.challenge}
          placeholder={placeholders.challenge}
          value={values.challenge}
          options={props.challengeOptions}
          errorMessage={errors.challenge}
          required
          onChange={(value) => handleChange("challenge", value)}
        />
        <div className="md:col-span-2">
          <AppointmentTextareaField
            id="objective"
            label={labels.objective}
            placeholder={placeholders.objective}
            value={values.objective}
            errorMessage={errors.objective}
            required
            className="min-h-28"
            onChange={(value) => handleChange("objective", value)}
          />
        </div>
        <AppointmentInputField
          id="projectStartTiming"
          label={labels.projectStartTiming}
          placeholder={placeholders.projectStartTiming}
          value={values.projectStartTiming}
          optionalLabel={labels.optional}
          onChange={(value) =>
            handleChange("projectStartTiming", value)
          }
        />
        <AppointmentInputField
          id="budget"
          label={labels.budget}
          placeholder={placeholders.budget}
          value={values.budget}
          optionalLabel={labels.optional}
          onChange={(value) => handleChange("budget", value)}
        />
        <div className="md:col-span-2">
          <AppointmentTextareaField
            id="details"
            label={labels.details}
            placeholder={placeholders.details}
            value={values.details}
            errorMessage={errors.details}
            required
            className="min-h-36"
            onChange={(value) => handleChange("details", value)}
          />
        </div>
        {scheduleEnabled ? (
          <div className="md:col-span-2">
            <AppointmentField
              id="scheduleSelection"
              label={scheduleLabels.label}
              required
              errorMessage={errors.scheduleSelection}
            >
              <div className="space-y-4">
                <p className="text-sm leading-7 text-slate-600">
                  {scheduleLabels.helper}
                </p>
                <AppointmentScheduleRequirement
                  requirement={requirement}
                  selectedSlots={values.scheduleSelection.slots}
                />
                <AppointmentScheduleTrigger
                  buttonId="scheduleSelection"
                  isOpen={isScheduleOpen}
                  selectedSlots={values.scheduleSelection.slots}
                  onOpen={() => setIsScheduleOpen(true)}
                />
              </div>
            </AppointmentField>
          </div>
        ) : null}
        <div className="md:col-span-2 flex justify-center">
          <Button
            type="submit"
            variant="outline"
            size="lg"
            className="h-12 rounded-md bg-white px-10 text-sm"
          >
            {labels.submit}
          </Button>
        </div>
      </form>
      {scheduleEnabled ? (
        <AppointmentScheduleSheet
          isOpen={isScheduleOpen}
          weekStart={weekStart}
          minSelectableAt={minSelectableAt}
          maxSelectableAt={maxSelectableAt}
          selectedSlots={values.scheduleSelection.slots}
          draggingMode={draggingMode}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          onClose={() => {
            setIsScheduleOpen(false);
            setDraggingMode(null);
          }}
          onPreviousWeek={() => {
            setWeekStart(
              (current) =>
                new Date(current.getTime() - 7 * DAY_IN_MS),
            );
          }}
          onNextWeek={() => {
            setWeekStart(
              (current) =>
                new Date(current.getTime() + 7 * DAY_IN_MS),
            );
          }}
          onPointerStart={handleSchedulePointerStart}
          onPointerEnter={handleSchedulePointerEnter}
          onPointerEnd={() => setDraggingMode(null)}
          onAllDayToggle={handleAllDayToggle}
        />
      ) : null}
    </>
  );
}
