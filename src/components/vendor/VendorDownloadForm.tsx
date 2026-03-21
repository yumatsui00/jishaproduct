"use client";

import { useState } from "react";

import VendorField from "@/components/vendor/VendorField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type {
  VendorDownloadFormErrors,
  VendorDownloadFormValues,
} from "@/types/vendor";
import translations from "../../../assets/translations/jp";

const initialFormValues: VendorDownloadFormValues = {
  companyName: "",
  contactName: "",
  jobTitle: "",
  email: "",
  phone: "",
  referralSource: "",
  details: "",
};

const fieldOrder: (keyof VendorDownloadFormValues)[] = [
  "companyName",
  "contactName",
  "jobTitle",
  "email",
  "phone",
  "referralSource",
  "details",
];

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
 * Validates vendor download-form values before local submission.
 *
 * @param values Current form values.
 * @returns Field-level validation errors.
 */
function validateForm(
  values: VendorDownloadFormValues,
): VendorDownloadFormErrors {
  const errors: VendorDownloadFormErrors = {};
  const requiredMessage = translations.vendor.validation.required;

  if (isBlank(values.companyName)) {
    errors.companyName = requiredMessage;
  }

  if (isBlank(values.contactName)) {
    errors.contactName = requiredMessage;
  }

  if (isBlank(values.email)) {
    errors.email = requiredMessage;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(values.email.trim())) {
    errors.email = translations.vendor.validation.email;
  }

  if (isBlank(values.phone)) {
    errors.phone = requiredMessage;
  }

  if (isBlank(values.referralSource)) {
    errors.referralSource = requiredMessage;
  }

  return errors;
}

/**
 * Renders the vendor document-download form and local validation state.
 *
 * @returns Interactive vendor download form.
 */
export default function VendorDownloadForm() {
  const labels = translations.vendor.form;
  const placeholders = labels.placeholders;
  const [values, setValues] =
    useState<VendorDownloadFormValues>(initialFormValues);
  const [errors, setErrors] = useState<VendorDownloadFormErrors>({});

  /**
   * Updates one form field value.
   *
   * @param field Target field name.
   * @param value Next field value.
   * @returns Nothing.
   */
  function handleChange(
    field: keyof VendorDownloadFormValues,
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
   * Validates the form on submit and blocks invalid submission.
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
      id="vendor-download-form"
      noValidate
      onSubmit={handleSubmit}
      className="scroll-mt-28 grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] md:grid-cols-2 md:p-8"
    >
      <VendorField
        id="companyName"
        label={labels.companyName}
        required
        errorMessage={errors.companyName}
      >
        <Input
          id="companyName"
          name="companyName"
          aria-invalid={Boolean(errors.companyName)}
          placeholder={placeholders.companyName}
          value={values.companyName}
          onChange={(event) =>
            handleChange("companyName", event.target.value)
          }
        />
      </VendorField>
      <VendorField
        id="contactName"
        label={labels.contactName}
        required
        errorMessage={errors.contactName}
      >
        <Input
          id="contactName"
          name="contactName"
          aria-invalid={Boolean(errors.contactName)}
          placeholder={placeholders.contactName}
          value={values.contactName}
          onChange={(event) =>
            handleChange("contactName", event.target.value)
          }
        />
      </VendorField>
      <VendorField
        id="jobTitle"
        label={labels.jobTitle}
        optionalLabel={labels.optional}
      >
        <Input
          id="jobTitle"
          name="jobTitle"
          aria-invalid={Boolean(errors.jobTitle)}
          placeholder={placeholders.jobTitle}
          value={values.jobTitle}
          onChange={(event) =>
            handleChange("jobTitle", event.target.value)
          }
        />
      </VendorField>
      <VendorField
        id="email"
        label={labels.email}
        required
        errorMessage={errors.email}
      >
        <Input
          id="email"
          name="email"
          type="email"
          aria-invalid={Boolean(errors.email)}
          placeholder={placeholders.email}
          value={values.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
      </VendorField>
      <VendorField
        id="phone"
        label={labels.phone}
        required
        errorMessage={errors.phone}
      >
        <Input
          id="phone"
          name="phone"
          type="tel"
          aria-invalid={Boolean(errors.phone)}
          placeholder={placeholders.phone}
          value={values.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
        />
      </VendorField>
      <VendorField
        id="referralSource"
        label={labels.referralSource}
        required
        errorMessage={errors.referralSource}
      >
        <Input
          id="referralSource"
          name="referralSource"
          aria-invalid={Boolean(errors.referralSource)}
          placeholder={placeholders.referralSource}
          value={values.referralSource}
          onChange={(event) =>
            handleChange("referralSource", event.target.value)
          }
        />
      </VendorField>
      <div className="md:col-span-2">
        <VendorField
          id="details"
          label={labels.details}
          optionalLabel={labels.optional}
          errorMessage={errors.details}
        >
          <Textarea
            id="details"
            name="details"
            aria-invalid={Boolean(errors.details)}
            placeholder={placeholders.details}
            value={values.details}
            onChange={(event) =>
              handleChange("details", event.target.value)
            }
            className="min-h-32"
          />
        </VendorField>
      </div>
      <div className="md:col-span-2 flex justify-center">
        <Button
          type="submit"
          size="lg"
          className="h-12 rounded-[1rem] bg-sky-600 px-8 text-sm font-semibold text-white hover:bg-sky-500"
        >
          {labels.submit}
        </Button>
      </div>
    </form>
  );
}
