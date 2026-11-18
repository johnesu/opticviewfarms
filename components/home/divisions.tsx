import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { images } from "@/lib/images";

const divisions = [
  {
    label: "Crops",
    title: "Crops & horticulture",
    detail: "Maize, soybean, tomato, pepper",
    metric: "620 ha",
    image: images.fieldRows,
    href: "/our-farms#crops",
  },
  {
    label: "Livestock",
    title: "Livestock",
    detail: "Cattle, goats and sheep",
    metric: "62 head",
    image: images.cattle,
    href: "/our-farms#livestock",
  },
  {
    label: "Poultry",
    title: "Poultry & eggs",
    detail: "Broilers, layers, hatchery",
    metric: "48k birds",
    image: images.poultry,
    href: "/our-farms#poultry",
  },
  {
    label: "Fishery",
    title: "Fishery",
    detail: "Catfish, tilapia, fingerlings",
    metric: "26 ponds",
    image: images.fish,
    href: "/our-farms#fishery",
  },
];

export function Divisions() {
  return (
    <section className="bg-sand-100 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Four production divisions"
          title={
            <>
              What we grow, and the{" "}
              <span className="italic text-bronze-600">discipline</span> behind it.
            </>
          }
          description="Each division runs on the same operating records: inputs, labour, yields, costs and stock. That is what makes the marketplace credible, because every listing starts from a real production record."
          action={
            <Button href="/our-farms" variant="outline" withArrow>
              Tour our farms
            </Button>
          }
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {divisions.map((division, index) => (
            <Link
              key={division.label}
              href={division.href}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
              className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden bg-ink-900 p-6 text-sand-50 sm:aspect-[3/4]"
            >
              <Image
                src={division.image}
                alt={division.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="-z-10 object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(23,18,15,0.08)_0%,rgba(23,18,15,0.36)_45%,rgba(23,18,15,0.9)_100%)]"
              />

              <div className="[text-shadow:0_1px_18px_rgba(23,18,15,0.55)]">
                <div className="flex items-center justify-between">
                  <span className="text-[9.5px] font-medium uppercase tracking-[0.22em] text-sand-50/80">
                    {division.label}
                  </span>
                  <span className="grid h-8 w-8 translate-y-1 place-items-center border border-white/30 bg-white/5 text-sand-50 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <h3 className="mt-3 font-display text-[25px] leading-[1.1] tracking-[-0.01em]">
                  {division.title}
                </h3>
                <p className="mt-2 text-[11.5px] leading-relaxed text-sand-50/70">
                  {division.detail}
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-white/20 pt-3.5">
                  <span className="h-1 w-1 rounded-full bg-ochre-400" />
                  <span className="text-[10px] uppercase tracking-[0.16em] text-sand-50/80">
                    {division.metric}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
