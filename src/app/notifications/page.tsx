import PageTopBar from "@/components/common/PageTopBar";

import translations from "../../../assets/translations/jp";

/**
 * Renders the notifications page.
 *
 * @returns The notifications page.
 */
export default function NotificationsPage() {
  return (
    <>
      <PageTopBar />
      <main className="min-h-screen pt-[4.5rem]">
        <h1 className="px-6 py-8 text-3xl font-semibold text-slate-900">
          {translations.pages.notifications.title}
        </h1>
      </main>
    </>
  );
}
