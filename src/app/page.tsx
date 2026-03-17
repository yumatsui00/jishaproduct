import translations from "../../assets/translations/jp";

export default function Home() {
  const { title, description } = translations.home.hero;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-3xl rounded-3xl border border-black/10 bg-white px-8 py-16 text-center shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-black/70 sm:text-lg">
          {description}
        </p>
      </div>
    </main>
  );
}
