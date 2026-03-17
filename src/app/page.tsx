import PublicTopBar from "@/components/common/PublicTopBar";
import PublicFooter from "@/components/common/PublicFooter";

import translations from "../../assets/translations/jp";

/**
 * Renders the public home page.
 *
 * @returns The home page.
 */
export default function Home() {
  const { title, description } = translations.home.hero;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_46%,#ffffff_100%)]">
      <PublicTopBar />
      <section className="flex min-h-[calc(100vh-9rem)] items-center justify-center px-6 py-20">
        <div className="w-full max-w-3xl rounded-[2rem] border border-slate-200/80 bg-white/80 px-8 py-16 text-center shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
            {description}
          </p>
        </div>
      </section>
      <PublicFooter />
    </main>
  );
}
