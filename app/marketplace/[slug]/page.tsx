import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/marketplace/product-card";
import { Button } from "@/components/ui/button";
import { Check, MapPin, ShieldCheck, Star, Truck } from "@/components/ui/icons";
import { formatNaira } from "@/lib/format";
import {
  getCategoryLabel,
  getProduct,
  getVendorProducts,
  products,
} from "@/lib/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: [{ url: product.image }],
    },
  };
}

const assurances = [
  {
    icon: ShieldCheck,
    title: "Verified vendor",
    body: "Identity and business documents checked before listing.",
  },
  {
    icon: Truck,
    title: "Delivery arranged",
    body: "Pickup or nationwide delivery, quoted per destination.",
  },
  {
    icon: Check,
    title: "Payments verified",
    body: "Card and transfer payments are confirmed on the server.",
  },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const vendorProducts = getVendorProducts(product.vendorSlug).filter(
    (item) => item.slug !== product.slug,
  );

  // Prefer the vendor's other listings, then the same category, then anything
  // else so the row is always full.
  const seen = new Set<string>([product.slug]);
  const related = [
    ...vendorProducts,
    ...products.filter((item) => item.category === product.category),
    ...products,
  ]
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    })
    .slice(0, 4);

  const relatedTitle =
    vendorProducts.length >= 4
      ? `More from ${product.vendor}`
      : "More like this";

  return (
    <div className="bg-sand-50">
      <div className="container-page pb-20 pt-[108px] md:pt-[124px]">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-stone-500"
        >
          <Link href="/" className="hover:text-ink-900">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/marketplace" className="hover:text-ink-900">
            Marketplace
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            href={`/marketplace?category=${product.category}`}
            className="hover:text-ink-900"
          >
            {getCategoryLabel(product.category)}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink-900">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden bg-sand-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              {product.badge ? (
                <span className="absolute left-4 top-4 bg-sand-50/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-900">
                  {product.badge}
                </span>
              ) : null}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {assurances.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="border border-sand-300/70 bg-sand-100/50 p-3 sm:p-4"
                  >
                    <Icon className="h-4 w-4 text-bronze-600" />
                    <p className="mt-2 text-[10.5px] font-semibold leading-tight text-ink-950 sm:mt-3 sm:text-[11.5px]">
                      {item.title}
                    </p>
                    <p className="mt-1 hidden text-[10.5px] leading-relaxed text-stone-600 sm:block">
                      {item.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-stone-500">
              <span className="border border-sand-300 px-2.5 py-1 text-ink-800">
                {getCategoryLabel(product.category)}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {product.location}
              </span>
            </div>

            <h1 className="mt-5 font-display text-[clamp(2.2rem,3.8vw,3.2rem)] leading-[1.02] tracking-[-0.02em] text-ink-950">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-stone-600">
              <span className="flex items-center gap-1.5">
                <span className="flex text-ochre-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={
                        index < Math.round(product.rating)
                          ? "h-3.5 w-3.5"
                          : "h-3.5 w-3.5 text-sand-300"
                      }
                    />
                  ))}
                </span>
                <span className="text-ink-900">{product.rating.toFixed(1)}</span>
                <span>({product.reviews} reviews)</span>
              </span>
              <span className="h-3 w-px bg-sand-300" aria-hidden="true" />
              <span>Sold by {product.vendor}</span>
            </div>

            <div className="mt-7 flex flex-wrap items-end gap-x-5 gap-y-2 border-y border-sand-300/80 py-6">
              <div>
                <p className="font-display text-[36px] leading-none tracking-[-0.02em] text-ink-950">
                  {formatNaira(product.retailPrice)}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.12em] text-stone-500">
                  per {product.unit} · retail
                </p>
              </div>
              <span
                className={`mb-1 border px-3 py-1 text-[10px] uppercase tracking-[0.1em] ${
                  product.available > 0
                    ? "border-bronze-500/30 bg-bronze-500/10 text-bronze-600"
                    : "border-clay-500/25 bg-clay-500/10 text-clay-600"
                }`}
              >
                {product.available > 0
                  ? `In stock · ${product.available} available`
                  : "Out of stock"}
              </span>
            </div>

            {product.wholesalePrice ? (
              <div className="mt-5 border border-ochre-500/30 bg-ochre-500/[0.07] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ochre-600">
                      Wholesale tier
                    </p>
                    <p className="mt-2 font-display text-[24px] leading-none text-ink-950">
                      {formatNaira(product.wholesalePrice)}
                      <span className="ml-2 font-sans text-[11px] font-normal text-stone-600">
                        per {product.unit}
                      </span>
                    </p>
                  </div>
                  <p className="text-[11.5px] text-stone-600">
                    Minimum order · {product.moq}{" "}
                    {product.unit === "kg" ? "kg" : `× ${product.unit}`}
                  </p>
                </div>
              </div>
            ) : null}

            <p className="mt-6 text-[13.5px] leading-[1.8] text-stone-600">
              {product.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {product.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2.5 text-[12.5px] leading-relaxed text-ink-800"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bronze-600" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={`/contact?topic=buying&product=${product.slug}`}
                size="lg"
                withArrow
              >
                Request a quotation
              </Button>
              <Button
                href={`/contact?topic=support&product=${product.slug}`}
                size="lg"
                variant="outline"
              >
                Ask the vendor a question
              </Button>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-stone-500">
              Quotations are confirmed by the vendor. Nothing is charged until
              you accept a quotation and complete payment online.
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-sand-300/80 pt-6 text-[12px]">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-stone-500">
                  Unit
                </dt>
                <dd className="mt-1 text-ink-900">per {product.unit}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-stone-500">
                  Origin
                </dt>
                <dd className="mt-1 text-ink-900">
                  {product.location}, Nigeria
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-stone-500">
                  Vendor
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-ink-900">
                  {product.vendor}
                  {product.vendorVerified ? (
                    <ShieldCheck className="h-3.5 w-3.5 text-bronze-600" />
                  ) : null}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-stone-500">
                  Category
                </dt>
                <dd className="mt-1 text-ink-900">
                  {getCategoryLabel(product.category)}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-20 border-t border-sand-300/80 pt-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[28px] tracking-[-0.02em] text-ink-950">
                {relatedTitle}
              </h2>
              <Link
                href="/marketplace"
                className="text-[12px] text-stone-600 underline decoration-sand-300 underline-offset-4 hover:text-ink-900"
              >
                Back to the marketplace
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
