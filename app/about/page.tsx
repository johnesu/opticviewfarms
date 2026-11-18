import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check, CloudOff, ShieldCheck, Truck } from "@/components/ui/icons";
import { milestones } from "@/lib/data/farms";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About",
  description:
    "OpticsView Farms is an integrated agricultural company and verified marketplace. We build the offline-first systems our own farms run on, then open them to vendors.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Verify before you sell",
    body: "A vendor listing is only credible if someone checked the business behind it. Every application is reviewed by a person.",
  },
  {
    icon: CloudOff,
    title: "Design for the field",
    body: "A supervisor should not lose an hour of work because the network dropped. The app records locally and syncs later.",
  },
  {
    icon: Check,
    title: "Numbers must agree",
    body: "Stock, orders, commissions and payouts all trace back to the same ledger. If they disagree, we fix the record, not the report.",
  },
  {
    icon: Truck,
    title: "Own the last mile",
    body: "Produce is only as good as its delivery. We plan routes, record dispatch and capture proof of delivery per shipment.",
  },
];

const syncColumns = [
  {
    step: "01",
    title: "Local first",
    body: "A write is saved to the device database and added to an ordered operation queue before anything touches the network.",
  },
  {
    step: "02",
    title: "Ordered push",
    body: "Queued operations are pushed in sequence with idempotency keys, so a retry can never create a duplicate harvest or sale.",
  },
  {
    step: "03",
    title: "Server authority",
    body: "Payments, permissions, approvals and payouts are always confirmed by the server. A local record cannot grant access or money.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About OpticsView"
        breadcrumb="About"
        image={images.farmer}
        title={
          <>
            We built the system we needed in the{" "}
            <span className="italic text-bronze-600">field</span>.
          </>
        }
        description="OpticsView started on 40 hectares in Oyo State with a paper ledger and a recurring problem: the numbers never matched at the end of the month. Everything we build now starts from that problem."
      />

      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <div>
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
              A farming company that had to become a software company.
            </h2>
            <div className="mt-6 space-y-4 text-[14px] leading-[1.8] text-stone-600">
              <p>
                We were losing money in places that never showed up in the
                accounts: feed that left the store without a record, harvests
                that were weighed twice, expenses agreed on a phone call and
                forgotten by Friday.
              </p>
              <p>
                The first fix was discipline. The second was software. Our field
                teams needed something that worked in a place with one bar of
                signal, so we stopped treating offline as an edge case and made
                it the default.
              </p>
              <p>
                Today the same platform runs our farms, our warehouses and our
                marketplace. Vendors use it because it solves the problem we had,
                and buyers use it because the listing behind the price is real.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-sand-300/70 pt-6 sm:grid-cols-3">
              {[
                { value: "2016", label: "Founded in Oyo" },
                { value: "18", label: "Farms today" },
                { value: "240+", label: "Verified vendors" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-[26px] leading-none text-ink-950">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-stone-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-sand-200">
              <Image
                src={images.greenhouse}
                alt="Rows of crops under protective cover"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-4 max-w-[15rem] border border-sand-300/70 bg-sand-50 p-5 shadow-[0_30px_60px_-40px_rgba(31,25,22,0.45)] sm:left-6">
              <p className="font-display text-[16px] leading-snug text-ink-950">
                &ldquo;If it is not recorded, it did not happen.&rdquo;
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-stone-500">
                Our first operating rule
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-100 py-16 md:py-24">
        <div className="container-page">
          <Eyebrow>How we got here</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
            Ten years, one direction.
          </h2>

          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone, index) => (
              <li
                key={milestone.year}
                data-reveal
                style={{ "--reveal-delay": `${index * 60}ms` } as CSSProperties}
                className="border-t border-sand-300 pt-5"
              >
                <p className="font-display text-[16px] text-bronze-600">
                  {milestone.year}
                </p>
                <h3 className="mt-2 font-display text-[21px] leading-tight tracking-[-0.01em] text-ink-950">
                  {milestone.title}
                </h3>
                <p className="mt-2.5 text-[12.5px] leading-[1.7] text-stone-600">
                  {milestone.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-page">
          <Eyebrow>What we believe</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
            Four rules we do not bend.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className="border border-sand-300/70 bg-sand-50 p-6"
                >
                  <span className="grid h-10 w-10 place-items-center border border-sand-300 bg-sand-100 text-ink-800">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="mt-6 text-[14px] font-semibold text-ink-950">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-[1.7] text-stone-600">
                    {value.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="offline"
        className="scroll-mt-28 border-y border-sand-300/70 bg-sand-200 py-16 md:py-24"
      >
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow>Offline architecture</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
                Offline is not a fallback. It is the{" "}
                <span className="italic text-bronze-600">default</span>.
              </h2>
              <p className="mt-5 max-w-md text-[14px] leading-[1.8] text-ink-700">
                Records are written to the device first, then synchronized in
                order. That design decision shapes everything: how we generate
                IDs, how we resolve conflicts and what we refuse to guess.
              </p>
              <p className="mt-4 max-w-md text-[12.5px] leading-[1.8] text-stone-600">
                Some actions stay online-only on purpose: payments, vendor
                approval, payouts and permission changes. A local device is never
                allowed to certify money or access.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {syncColumns.map((column) => (
                <div
                  key={column.step}
                  className="border border-sand-300/80 bg-sand-50 p-5"
                >
                  <p className="text-[10px] tracking-[0.18em] text-bronze-600">
                    {column.step}
                  </p>
                  <h3 className="mt-4 font-display text-[19px] leading-tight text-ink-950">
                    {column.title}
                  </h3>
                  <p className="mt-2.5 text-[11.5px] leading-[1.7] text-stone-600">
                    {column.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="delivery"
        className="scroll-mt-28 bg-sand-50 py-16 md:py-24"
      >
        <div className="container-page grid gap-10 border border-sand-300/70 bg-sand-50 p-8 md:p-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow>Delivery &amp; logistics</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.95rem,3.2vw,2.65rem)] leading-[1.04] tracking-[-0.02em] text-ink-950">
              From the farm gate to the buyer&rsquo;s door.
            </h2>
            <p className="mt-4 max-w-md text-[13.5px] leading-[1.8] text-stone-600">
              Delivery is quoted per destination at checkout. Perishables move on
              cold-chain routes where available, and every shipment has a
              recorded dispatch time, driver and proof of delivery.
            </p>
            <Button href="/contact?topic=buying" className="mt-7" withArrow>
              Ask about delivery to your area
            </Button>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Delivery zones",
                body: "Rates are set by zone and weight, shown before payment.",
              },
              {
                title: "Cold chain",
                body: "Perishable routes use insulated transport where available.",
              },
              {
                title: "Proof of delivery",
                body: "Signature or photo captured against the shipment record.",
              },
              {
                title: "Exceptions",
                body: "Failed or returned deliveries are recorded, never hidden.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="border border-sand-300/70 bg-sand-100/60 p-5"
              >
                <p className="text-[12.5px] font-semibold text-ink-950">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-stone-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand-100 py-16 md:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-xl font-display text-[clamp(1.9rem,3.2vw,2.6rem)] leading-[1.06] tracking-[-0.02em] text-ink-950">
              Work with a team that keeps records.
            </h2>
            <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-stone-600">
              Whether you are buying, selling, supplying or partnering, start
              with a conversation.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/contact" withArrow>
              Contact us
            </Button>
            <Button href="/vendors" variant="outline" withArrow>
              Become a vendor
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
