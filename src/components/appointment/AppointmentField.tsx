import type { ReactNode } from "react";

interface AppointmentFieldProps {
  id: string;
  label: string;
  required?: boolean;
  errorMessage?: string;
  children: ReactNode;
}

/**
 * Wraps one appointment form control with label and validation feedback.
 *
 * @param props Field content and metadata.
 * @returns Field wrapper for appointment inputs.
 */
export default function AppointmentField(
  props: AppointmentFieldProps,
) {
  return (
    <div className="space-y-2">
      <div className="min-h-5">
        {props.errorMessage ? (
          <p className="text-sm font-medium text-red-600">
            {props.errorMessage}
          </p>
        ) : null}
      </div>
      <label
        htmlFor={props.id}
        className="flex items-center gap-2 text-sm font-medium text-slate-900"
      >
        <span>{props.label}</span>
        {props.required ? (
          <span className="text-xs font-semibold text-red-600">
            *
          </span>
        ) : null}
      </label>
      {props.children}
    </div>
  );
}
