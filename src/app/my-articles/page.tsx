import PageTopBar from "@/components/common/PageTopBar";

import translations from "../../../assets/translations/jp";

/**
 * Renders the my articles page.
 *
 * @returns The my articles page.
 */
export default function MyArticlesPage() {
  return (
    <>
      <PageTopBar />
      <main className="min-h-screen pt-[4.5rem]">
        <h1 className="px-6 py-8 text-3xl font-semibold text-slate-900">
          {translations.pages.myArticles.title}
        </h1>
      </main>
    </>
  );
}
