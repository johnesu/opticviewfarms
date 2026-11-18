import type { Metadata } from "next";
import { Catalogue } from "@/components/marketplace/catalogue";
import { PageHero } from "@/components/site/page-hero";
import { categories, type CategoryId } from "@/lib/data/products";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Marketplace",
  description:
    "Buy fresh produce, grains, poultry, livestock, fish and agro-inputs directly from OpticsView farms and verified Nigerian vendors. Retail and wholesale quantities.",
};

type SearchParams = Promise<{ category?: string; wholesale?: string }>;

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const requested = params.category;
  const category = categories.some((item) => item.id === requested)
    ? (requested as CategoryId)
    : "all";
  const wholesale = params.wholesale === "1";

  return (
    <>
      <PageHero
        eyebrow="Marketplace"
        breadcrumb="Marketplace"
        image={images.marketAerial}
        title={
          <>
            Food and inputs, straight from the{" "}
            <span className="italic text-bronze-600">source</span>.
          </>
        }
        description="Retail or wholesale, from our own farms and verified vendors. Prices, stock and minimum order quantities are published by the seller, and every vendor is checked before their first listing goes live."
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-ink-900/15 pt-5 text-[10px] uppercase tracking-[0.18em] text-stone-500">
          <span>Retail &amp; wholesale</span>
          <span>Verified vendors</span>
          <span>Delivery nationwide</span>
        </div>
      </PageHero>

      <section className="bg-sand-50 py-12 md:py-16">
        <div className="container-page">
          <Catalogue initialCategory={category} initialWholesale={wholesale} />
        </div>
      </section>
    </>
  );
}
