import PageTopBar from "@/components/common/PageTopBar";
import PublicFooter from "@/components/common/PublicFooter";
import CaseStudySection from "@/components/home/CaseStudySection";
import HomeHeroSection from "@/components/home/HomeHeroSection";

/**
 * Renders the public home page.
 *
 * @returns The home page.
 */
export default function Home() {
  return (
    <>
      <PageTopBar />
      <main className="min-h-screen bg-[linear-gradient(180deg,#fffdf5_0%,#f4f8ff_38%,#f8fbff_68%,#ffffff_100%)] pt-[4.5rem]">
        <HomeHeroSection />
        <CaseStudySection />
        <PublicFooter />
      </main>
    </>
  );
}
