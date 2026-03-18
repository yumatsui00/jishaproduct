import Image from "next/image";
import Link from "next/link";

import translations from "../../../assets/translations/jp";

/**
 * Renders the shared top bar for non-authenticated pages.
 *
 * @returns The global public top bar.
 */
export default function PublicTopBar() {
  const { vendorLinkLabel } = translations.common.topBar;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-black/6 bg-white/68 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="shrink-0">
          <Image
            src="/Logo.png"
            alt=""
            width={160}
            height={48}
            priority
            className="h-10 w-auto"
          />
        </Link>
        <Link
          href="/vendor"
          className="text-sm font-medium text-black transition-opacity hover:opacity-70"
        >
          {vendorLinkLabel}
        </Link>
      </div>
    </header>
  );
}
