import Image from "next/image";
import Link from "next/link";

import translations from "../../../assets/translations/jp";

/**
 * Renders the shared footer for public-facing pages.
 *
 * @returns The public footer component.
 */
export default function PublicFooter() {
  const { logoAlt, links } = translations.common.footer;

  const footerLinks = [
    { href: "/company", label: links.company },
    { href: "/information-handling", label: links.informationHandling },
    { href: "/faq", label: links.faq },
    { href: "/client-contact", label: links.clientContact },
    { href: "/vendor-contact", label: links.vendorContact },
    { href: "/listing-request", label: links.listingRequest },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.18),_transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-14 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-16">
        <div className="max-w-md">
          <Link
            href="/"
            className="inline-flex rounded-full border border-white/15 bg-white/6 p-3 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <Image
              src="/Logo.png"
              alt={logoAlt}
              width={164}
              height={52}
              className="h-11 w-auto"
            />
          </Link>
        </div>
        <nav aria-label="Footer" className="w-full lg:max-w-3xl">
          <ul className="grid gap-x-6 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-3 text-white/82 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <span className="h-px w-5 bg-white/35 transition-all group-hover:w-8 group-hover:bg-white" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
