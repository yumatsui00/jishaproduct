import PageTopBar from "@/components/common/PageTopBar";

import translations from "../../../assets/translations/jp";

/**
 * Renders the invoices page.
 *
 * @returns The invoices page.
 */
export default function InvoicesPage() {
  return (
    <>
      <PageTopBar />
      <main className="min-h-screen pt-[4.5rem]">
        <h1 className="px-6 py-8 text-3xl font-semibold text-slate-900">
          {translations.pages.invoices.title}
        </h1>
      </main>
    </>
  );
}
