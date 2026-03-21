import PageTopBar from "@/components/common/PageTopBar";
import VendorLandingPage from "@/components/vendor/VendorLandingPage";

/**
 * Renders the public vendor landing page.
 *
 * @returns Vendor landing page.
 */
export default function VendorPage() {
  return (
    <>
      <PageTopBar />
      <VendorLandingPage />
    </>
  );
}
