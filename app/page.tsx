import { CapabilityBand } from "@/components/home/capability-band";
import { Divisions } from "@/components/home/divisions";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { MarketplacePreview } from "@/components/home/marketplace-preview";
import { OfflineSection } from "@/components/home/offline-section";
import { Testimonials } from "@/components/home/testimonials";
import { VendorCta } from "@/components/home/vendor-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityBand />
      <HowItWorks />
      <Divisions />
      <MarketplacePreview />
      <OfflineSection />
      <VendorCta />
      <Testimonials />
      <FinalCta />
    </>
  );
}
