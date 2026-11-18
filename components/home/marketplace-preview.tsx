import Link from "next/link";
import { ProductCard } from "@/components/marketplace/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data/products";

const featuredSlugs = [
  "fresh-roma-tomatoes",
  "yellow-maize-cleaned",
  "live-broiler-chicken",
  "live-catfish",
];

const featured = featuredSlugs
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

export function MarketplacePreview() {
  return (
    <section className="bg-sand-50 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Marketplace"
          title={
            <>
              Buy direct from the farm that{" "}
              <span className="italic text-bronze-600">grew it</span>.
            </>
          }
          description="Retail quantities or wholesale loads, from our own farms and verified vendors. Every price is set by the seller, and every vendor is checked before their first listing goes live."
          action={
            <Button href="/marketplace" variant="outline" withArrow>
              Browse all products
            </Button>
          }
        />

        <div className="mt-10 flex flex-wrap gap-2">
          {[
            { label: "Fresh produce", href: "/marketplace?category=produce" },
            { label: "Grains & staples", href: "/marketplace?category=grains" },
            { label: "Poultry & eggs", href: "/marketplace?category=poultry" },
            { label: "Fish", href: "/marketplace?category=fish" },
            { label: "Wholesale lots", href: "/marketplace?wholesale=1" },
          ].map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className="border border-sand-300 bg-sand-50 px-4 py-2 text-[11.5px] text-ink-700 transition-colors duration-300 hover:border-ink-900/30 hover:text-ink-900"
            >
              {chip.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <ProductCard
              key={product.slug}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>

        <p className="mt-8 text-[12px] text-stone-500">
          Wholesale tiers start at the seller&rsquo;s minimum order quantity.
          Multi-vendor baskets are split into separate fulfilment orders at
          checkout.
        </p>
      </div>
    </section>
  );
}
