import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MapPin } from "@/components/ui/icons";
import { farms } from "@/lib/data/farms";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Our farms",
  description:
    "Five production sites across Oyo, Kaduna, Ogun, Delta and Kano: crops, livestock, poultry, fishery and grain warehousing.",
};

const divisions = [
  {
    id: "crops",
    title: "Crops & horticulture",
    body: "Maize, soybean, cassava, tomato, pepper and plantain, grown on rain-fed and drip-irrigated plots with soil records per plot.",
    image: images.fieldRows,
  },
  {
    id: "livestock",
    title: "Livestock",
    body: "Grass-raised cattle and small ruminants, managed in batches with weight, health and vaccination records tied to the herd.",
    image: images.cattle,
  },
  {
    id: "poultry",
    title: "Poultry & eggs",
    body: "Broiler and layer houses plus a hatchery, with feed conversion, mortality and egg production tracked per batch.",
    image: images.poultry,
  },
  {
    id: "fishery",
    title: "Fishery",
    body: "Earthen ponds and concrete tanks with twice-daily water quality logs, a fingerling hatchery and a smokehouse for value addition.",
    image: images.fish,
  },
];

const anchors = [
  { href: "#crops", label: "Crops" },
  { href: "#livestock", label: "Livestock" },
  { href: "#poultry", label: "Poultry" },
  { href: "#fishery", label: "Fishery" },
  { href: "#farms", label: "The farms" },
];

export default function FarmsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our farms"
        breadcrumb="Our farms"
        image={images.aerial}
        title={
          <>
            Five sites. One standard of{" "}
            <span className="italic text-bronze-600">record-keeping</span>.
          </>
        }
        description="We run our own production because it keeps us honest. Every hectare, batch and harvest on these farms is recorded in the same system we sell to vendors."
      >
        <div className="grid max-w-lg grid-cols-2 gap-6 border-t border-ink-900/15 pt-6 sm:grid-cols-4">
          {[
            { value: "5", label: "Sites" },
            { value: "1,240", label: "Hectares" },
            { value: "6", label: "States" },
            { value: "4", label: "Divisions" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-[28px] leading-none text-ink-950">
                {stat.value}
              </p>
              <p className="mt-2 text-[9.5px] uppercase tracking-[0.16em] text-stone-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </PageHero>

      <div className="sticky top-[84px] z-30 border-y border-sand-300/70 bg-sand-50/95 backdrop-blur">
        <div className="container-page no-scrollbar flex gap-2 overflow-x-auto py-3">
          {anchors.map((anchor) => (
            <a
              key={anchor.href}
              href={anchor.href}
              className="whitespace-nowrap border border-sand-300 px-4 py-2 text-[11.5px] text-ink-700 transition-colors hover:border-ink-900/30 hover:text-ink-900"
            >
              {anchor.label}
            </a>
          ))}
        </div>
      </div>

      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-page">
          <Eyebrow>What we produce</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
            Four production divisions, each with its own records and its own
            supervisors.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {divisions.map((division, index) => (
              <article
                key={division.id}
                id={division.id}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
                className="scroll-mt-40 overflow-hidden border border-sand-300/70 bg-sand-50"
              >
                <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative aspect-[4/3] sm:aspect-auto">
                    <Image
                      src={division.image}
                      alt={division.title}
                      fill
                      sizes="(min-width: 768px) 25vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-[23px] leading-tight tracking-[-0.01em] text-ink-950">
                      {division.title}
                    </h3>
                    <p className="mt-3 text-[12.5px] leading-[1.7] text-stone-600">
                      {division.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="farms" className="scroll-mt-32 bg-sand-100 py-16 md:py-24">
        <div className="container-page">
          <Eyebrow>The farms</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
            Where the work happens.
          </h2>
          <p className="mt-5 max-w-xl text-[13.5px] leading-[1.8] text-stone-600">
            These five sites carry the bulk of our production and buying volume.
            They sit within a wider network of eighteen farms across six states.
          </p>

          <div className="mt-12 divide-y divide-sand-300/70">
            {farms.map((farm, index) => (
              <article
                key={farm.slug}
                id={farm.slug}
                data-reveal
                className="grid scroll-mt-40 items-center gap-8 py-12 first:pt-0 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden bg-sand-200 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={farm.image}
                    alt={`${farm.name}, ${farm.state} State`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {farm.state}
                    </span>
                    <span className="h-3 w-px bg-sand-300" aria-hidden="true" />
                    <span>{farm.region}</span>
                    <span className="h-3 w-px bg-sand-300" aria-hidden="true" />
                    <span>Est. {farm.established}</span>
                  </div>

                  <h3 className="mt-4 font-display text-[clamp(1.8rem,2.8vw,2.45rem)] leading-[1.05] tracking-[-0.02em] text-ink-950">
                    {farm.name}
                  </h3>

                  <p className="mt-4 max-w-lg text-[13.5px] leading-[1.75] text-stone-600">
                    {farm.summary}
                  </p>

                  <div className="mt-7 grid max-w-lg grid-cols-3 gap-4 border-t border-sand-300/70 pt-5">
                    {farm.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display text-[21px] leading-none text-ink-950">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-[9.5px] uppercase tracking-[0.12em] text-stone-500">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-stone-600">
                    <span>
                      Manager:{" "}
                      <span className="text-ink-900">{farm.manager}</span>
                    </span>
                    <span className="h-3 w-px bg-sand-300" aria-hidden="true" />
                    <span>{farm.focus.join(" · ")}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border border-sand-300 bg-sand-50 p-6">
            <p className="flex-1 text-[13px] leading-relaxed text-stone-600">
              Want to visit a farm, buy at scale or supply us with inputs? Our
              team arranges site visits and supplier meetings on weekdays.
            </p>
            <Button href="/contact?topic=partnership" withArrow>
              Arrange a visit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
