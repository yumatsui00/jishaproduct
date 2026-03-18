"use client";

import { useState } from "react";

import AppointmentField from "@/components/appointment/AppointmentField";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  AppointmentFormErrors,
  AppointmentFormValues,
} from "@/types/caseStudy";
import translations from "../../../assets/translations/jp";

interface AppointmentFormProps {
  challengeOptions: readonly string[];
  industryOptions: readonly string[];
}

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
 * Validates appointment form values before local submission.
 *
 * @param values Current form values.
 * @returns Field-level validation errors.
 */
function validateForm(
  values: AppointmentFormValues,
): AppointmentFormErrors {
  const requiredMessage = translations.appointment.validation.required;
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
    errors.email = translations.appointment.validation.email;
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
];

/**
 * Renders the appointment form and local validation state.
 *
 * @param props Select input options.
 * @returns Interactive appointment form.
 */
export default function AppointmentForm(
  props: AppointmentFormProps,
) {
  const labels = translations.appointment.form;
  const [values, setValues] =
    useState<AppointmentFormValues>(initialFormValues);
  const [errors, setErrors] = useState<AppointmentFormErrors>({});

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
   * Validates the form on submit and blocks invalid submissions.
   *
   * @param event Submit event from the form.
   * @returns Nothing.
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    const firstErrorField = fieldOrder.find((field) =>
      Boolean(nextErrors[field]),
    );

    if (!firstErrorField) {
      return;
    }

    const target = document.getElementById(firstErrorField);

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

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:grid-cols-2 md:p-8"
    >
      <AppointmentField
        id="companyName"
        label={labels.companyName}
        required
        errorMessage={errors.companyName}
      >
        <Input
          id="companyName"
          name="companyName"
          value={values.companyName}
          onChange={(event) =>
            handleChange("companyName", event.target.value)
          }
        />
      </AppointmentField>
      <AppointmentField
        id="contactName"
        label={labels.contactName}
        required
        errorMessage={errors.contactName}
      >
        <Input
          id="contactName"
          name="contactName"
          value={values.contactName}
          onChange={(event) =>
            handleChange("contactName", event.target.value)
          }
        />
      </AppointmentField>
      <AppointmentField
        id="jobTitle"
        label={labels.jobTitle}
      >
        <Input
          id="jobTitle"
          name="jobTitle"
          value={values.jobTitle}
          onChange={(event) =>
            handleChange("jobTitle", event.target.value)
          }
        />
      </AppointmentField>
      <AppointmentField
        id="email"
        label={labels.email}
        required
        errorMessage={errors.email}
      >
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
      </AppointmentField>
      <AppointmentField
        id="phone"
        label={labels.phone}
        required
        errorMessage={errors.phone}
      >
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
        />
      </AppointmentField>
      <AppointmentField
        id="referralSource"
        label={labels.referralSource}
        required
        errorMessage={errors.referralSource}
      >
        <Input
          id="referralSource"
          name="referralSource"
          value={values.referralSource}
          onChange={(event) =>
            handleChange("referralSource", event.target.value)
          }
        />
      </AppointmentField>
      <AppointmentField
        id="industry"
        label={labels.industry}
        required
        errorMessage={errors.industry}
      >
        <Select
          id="industry"
          name="industry"
          value={values.industry}
          onChange={(event) =>
            handleChange("industry", event.target.value)
          }
        >
          <option value=""></option>
          {props.industryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </AppointmentField>
      <AppointmentField
        id="challenge"
        label={labels.challenge}
        required
        errorMessage={errors.challenge}
      >
        <Select
          id="challenge"
          name="challenge"
          value={values.challenge}
          onChange={(event) =>
            handleChange("challenge", event.target.value)
          }
        >
          <option value=""></option>
          {props.challengeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </AppointmentField>
      <div className="md:col-span-2">
        <AppointmentField
          id="objective"
          label={labels.objective}
          required
          errorMessage={errors.objective}
        >
          <Textarea
            id="objective"
            name="objective"
            value={values.objective}
            onChange={(event) =>
              handleChange("objective", event.target.value)
            }
            className="min-h-28"
          />
        </AppointmentField>
      </div>
      <AppointmentField
        id="projectStartTiming"
        label={labels.projectStartTiming}
      >
        <Input
          id="projectStartTiming"
          name="projectStartTiming"
          value={values.projectStartTiming}
          onChange={(event) =>
            handleChange("projectStartTiming", event.target.value)
          }
        />
      </AppointmentField>
      <AppointmentField
        id="budget"
        label={labels.budget}
      >
        <Input
          id="budget"
          name="budget"
          value={values.budget}
          onChange={(event) => handleChange("budget", event.target.value)}
        />
      </AppointmentField>
      <div className="md:col-span-2">
        <AppointmentField
          id="details"
          label={labels.details}
          required
          errorMessage={errors.details}
        >
          <Textarea
            id="details"
            name="details"
            value={values.details}
            onChange={(event) =>
              handleChange("details", event.target.value)
            }
            className="min-h-36"
          />
        </AppointmentField>
      </div>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="mx-auto flex min-h-12 w-fit items-center justify-center rounded-md border border-slate-300 bg-white px-10 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
        >
          {labels.submit}
        </button>
      </div>
    </form>
  );
}
