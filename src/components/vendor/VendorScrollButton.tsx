"use client";

import { Button } from "@/components/ui/button";

interface VendorScrollButtonProps {
  label: string;
  className: string;
  variant?: "default" | "outline";
  size?: "default" | "lg";
}

const FORM_TARGET_ID = "vendor-download-form-anchor";

/**
 * Smoothly scrolls the vendor page to the document request form.
 *
 * @param props - Button presentation props.
 * @param props.label - Visible button label.
 * @param props.className - Tailwind classes forwarded to the button.
 * @param props.variant - Visual button variant.
 * @param props.size - Visual button size.
 * @returns A button that scrolls to the vendor download form.
 */
export default function VendorScrollButton({
  label,
  className,
  variant = "default",
  size = "lg",
}: VendorScrollButtonProps) {
  /**
   * Moves the viewport to the vendor download form without hash jumping.
   *
   * @returns Nothing.
   */
  function handleClick() {
    const form = document.getElementById(FORM_TARGET_ID);

    if (!form) {
      return;
    }

    form.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
}
