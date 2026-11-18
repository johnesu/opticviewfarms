import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Eyebrow } from "@/components/ui/eyebrow";
import { photoCredits } from "@/lib/data/credits";

export const metadata: Metadata = {
  title: "Photo credits",
  description:
    "Attribution and licence details for the photography used across the OpticsView Farms website.",
};

export default function CreditsPage() {
  const commonsCount = photoCredits.filter((credit) =>
    credit.source.includes("commons.wikimedia.org"),
  ).length;

  return (
    <>
      <PageHero
        eyebrow="Photography"
        breadcrumb="Photo credits"
        title={
          <>
            Where the pictures{" "}
            <span className="italic text-bronze-600">come from</span>.
          </>
        }
        description="The photography on this site is openly licensed stock imagery. Each image below is credited to its author with the licence it was published under and a link to the original."
      />

      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Eyebrow>Licences</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.3vw,2.8rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
                Openly licensed, properly credited.
              </h2>
              <div className="mt-5 space-y-4 text-[13.5px] leading-[1.8] text-stone-600">
                <p>
                  {commonsCount} of the photographs come from Wikimedia Commons
                  under Creative Commons or public domain terms. Where a licence
                  requires attribution, the author and licence are shown beside
                  the image and repeated here.
                </p>
                <p>
                  The remainder are published under the Unsplash License, which
                  allows commercial use without attribution. We credit them
                  anyway.
                </p>
                <p className="text-[12px] text-stone-500">
                  Photography is illustrative. Products are described by the
                  listing, not by the stock image.
                </p>
              </div>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {photoCredits.map((credit) => (
                <li
                  key={credit.file}
                  className="flex gap-4 border border-sand-300/70 bg-sand-50 p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-sand-100">
                    <Image
                      src={credit.file}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-medium text-ink-950">
                      {credit.title.replace(/\.(jpe?g|png)$/i, "")}
                    </p>
                    <p className="mt-1 text-[11px] text-stone-500">
                      {credit.artist}
                    </p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-stone-500">
                      {credit.license}
                    </p>
                    <a
                      href={credit.source}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-1.5 inline-block text-[11px] text-bronze-600 underline decoration-sand-300 underline-offset-4 hover:text-ink-900"
                    >
                      View original
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
