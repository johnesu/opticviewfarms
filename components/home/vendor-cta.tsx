import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { images } from "@/lib/images";

const steps = [
  {
    title: "Apply",
    body: "Tell us about your farm or business, where you operate and what you sell.",
  },
  {
    title: "Get verified",
    body: "Our team checks identity, business documents and your operating location.",
  },
  {
    title: "Publish",
    body: "Build a storefront, add products and set retail and wholesale pricing.",
  },
  {
    title: "Get paid",
    body: "Commission is recorded per order and payouts go to your verified bank account.",
  },
];

export function VendorCta() {
  return (
    <section className="bg-sand-100 py-20 md:py-28">
      <div className="container-page grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand-200 sm:aspect-[5/5]">
            <Image
              src={images.farmer}
              alt="A farmer inspecting crops in a field"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 border border-sand-300/60 bg-sand-50/95 p-4 backdrop-blur-md">
              <div className="grid grid-cols-3 divide-x divide-sand-300 text-ink-900">
                <div className="pr-3">
                  <p className="font-display text-[21px] leading-none">240+</p>
                  <p className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-stone-500">
                    Vendors
                  </p>
                </div>
                <div className="px-3">
                  <p className="font-display text-[21px] leading-none">6</p>
                  <p className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-stone-500">
                    States
                  </p>
                </div>
                <div className="pl-3">
                  <p className="font-display text-[21px] leading-none">3 days</p>
                  <p className="mt-1.5 text-[9px] uppercase tracking-[0.12em] text-stone-500">
                    Avg. review
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Eyebrow>Vendor programme</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-[clamp(2.1rem,3.8vw,3.3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
            Sell what you grow. Keep a record of what you{" "}
            <span className="italic text-bronze-600">earn</span>.
          </h2>
          <p className="mt-5 max-w-xl text-[14px] leading-[1.75] text-stone-600">
            Farmers, co-operatives and agribusinesses can sell alongside our own
            farms. Every application is reviewed by a person, and only verified
            vendors can publish listings or accept marketplace orders.
          </p>

          <ol className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center border border-sand-300 bg-sand-50 text-[10.5px] font-medium tabular-nums text-ink-800">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-[13.5px] font-semibold text-ink-950">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-stone-600">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href="/vendors" withArrow>
              Apply to become a vendor
            </Button>
            <Button href="/vendors#requirements" variant="ghost" withArrow>
              See vendor requirements
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
