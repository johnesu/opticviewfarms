import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/site/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { getProduct } from "@/lib/data/products";
import { formatNaira } from "@/lib/format";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the OpticsView team about buying, wholesale, vendor applications, supply partnerships or delivery.",
};

const topicValues = new Set([
  "buying",
  "vendor",
  "partnership",
  "support",
  "careers",
  "general",
]);

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; product?: string }>;
}) {
  const params = await searchParams;
  const topic =
    params.topic && topicValues.has(params.topic) ? params.topic : "general";

  const product = params.product ? getProduct(params.product) : undefined;
  const defaultMessage = product
    ? `I would like a quotation for ${product.name} (${formatNaira(
        product.retailPrice,
      )} per ${product.unit}) from ${product.vendor}. Please confirm availability and delivery to my location.`
    : "";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        breadcrumb="Contact"
        image={images.grainMarket}
        title={
          <>
            Tell us what you{" "}
            <span className="italic text-bronze-600">need</span>.
          </>
        }
        description="A person reads every message. Tell us whether you are buying, selling, supplying or just trying to understand how the platform works."
      />

      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <Eyebrow>Direct lines</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-[1.04] tracking-[-0.02em] text-ink-950">
              Reach the right desk.
            </h2>

            <div className="mt-8 divide-y divide-sand-300/70 border-y border-sand-300/70">
              <div className="py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Head office
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-800">
                  {site.contact.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    site.contact.address,
                  )}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-2 inline-block text-[11.5px] text-bronze-600 underline decoration-sand-300 underline-offset-4 hover:text-ink-900"
                >
                  Open in Google Maps
                </a>
              </div>

              <div className="py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Phone &amp; email
                </p>
                <p className="mt-2 text-[13px] text-ink-800">
                  <a
                    href={site.contact.phoneHref}
                    className="transition-colors hover:text-bronze-600"
                  >
                    {site.contact.phone}
                  </a>
                </p>
                <p className="mt-1 text-[13px] text-ink-800">
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="transition-colors hover:text-bronze-600"
                  >
                    {site.contact.email}
                  </a>
                </p>
                <p className="mt-1 text-[13px] text-ink-800">
                  <a
                    href={`mailto:${site.contact.support}`}
                    className="transition-colors hover:text-bronze-600"
                  >
                    {site.contact.support}
                  </a>
                </p>
              </div>

              <div className="py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Vendors
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-stone-600">
                  Applying to sell, or already selling and need help with an
                  order?
                </p>
                <a
                  href="mailto:vendors@opticsviewfarms.ng"
                  className="mt-2 inline-block text-[12.5px] text-bronze-600 underline decoration-sand-300 underline-offset-4 hover:text-ink-900"
                >
                  vendors@opticsviewfarms.ng
                </a>
              </div>

              <div className="py-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Opening hours
                </p>
                <p className="mt-2 text-[13px] text-ink-800">
                  {site.contact.hours}
                </p>
                <p className="mt-1 text-[11.5px] text-stone-500">
                  Farm visits by appointment only.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-sand-300/70 bg-sand-50 p-7 md:p-9">
            <h2 className="font-display text-[28px] leading-tight tracking-[-0.015em] text-ink-950">
              Send a message
            </h2>
            <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-stone-600">
              Fill this in and your mail app opens with the message ready to
              send, from your own address. Nothing is submitted to a server.
            </p>
            <div className="mt-7">
              <ContactForm defaultTopic={topic} defaultMessage={defaultMessage} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
