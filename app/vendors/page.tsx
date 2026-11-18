import type { Metadata } from "next";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "@/components/ui/icons";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Sell with us",
  description:
    "Apply to sell produce, livestock, inputs or processed goods on the OpticsView marketplace. Verified vendors only, transparent commission, payouts to your bank.",
};

const sellerTypes = [
  {
    title: "Farms & producers",
    body: "Crop farmers, livestock and poultry producers, fish farms and horticulture businesses selling what they produce.",
  },
  {
    title: "Co-operatives & aggregators",
    body: "Groups that aggregate from smallholders, grade and pack, and can meet consistent volumes and quality.",
  },
  {
    title: "Agribusinesses & input dealers",
    body: "Feed mills, seed and fertiliser dealers, equipment suppliers and processors with traceable stock.",
  },
];

const benefits = [
  {
    title: "Buyers who are contactable",
    body: "Accounts, delivery addresses and order history are attached to every order, so you are not chasing a stranger.",
  },
  {
    title: "Your prices, your tiers",
    body: "Set retail and wholesale prices, minimum order quantities and bulk tiers. Commission is calculated from your price, not ours.",
  },
  {
    title: "Stock that works offline",
    body: "Confirm orders and update stock from the farm. Records queue locally and sync when the network returns.",
  },
  {
    title: "Payouts that reconcile",
    body: "Every order, commission deduction and payout appears on one statement you can audit line by line.",
  },
];

const requirements = [
  "A registered business name or co-operative, with CAC details where applicable",
  "A valid government ID for the primary contact",
  "A farm, warehouse or operating address we can verify",
  "A bank account in the business or co-operative name",
  "A product list with units, pack sizes and minimum quantities",
  "Agreement to our quality, packaging and delivery standards",
];

const onboarding = [
  {
    step: "01",
    title: "Create your account",
    body: "Name, phone, email and a password. You can start the application and finish it later.",
  },
  {
    step: "02",
    title: "Describe the business",
    body: "What you sell, where you operate and the volumes you can supply consistently.",
  },
  {
    step: "03",
    title: "Upload documents",
    body: "Identity, business registration and bank details. Files are stored privately.",
  },
  {
    step: "04",
    title: "Human review",
    body: "Our team checks the documents and may call to confirm your operating location.",
  },
  {
    step: "05",
    title: "Build your storefront",
    body: "Add products, images, units, retail and wholesale prices once you are approved.",
  },
  {
    step: "06",
    title: "Start selling",
    body: "Orders arrive with buyer details, delivery zone and the commission already calculated.",
  },
];

const faqs = [
  {
    question: "Do I need my own website?",
    answer:
      "No. Your storefront, product pages and checkout are part of OpticsView. Buyers can find you by product, category or location.",
  },
  {
    question: "Can I sell wholesale only?",
    answer:
      "Yes. You can publish wholesale-only listings with a minimum order quantity, or offer both retail and wholesale tiers on the same product.",
  },
  {
    question: "How long does verification take?",
    answer:
      "Most complete applications are reviewed within three working days. Incomplete or unclear documents take longer, so upload clear copies.",
  },
  {
    question: "I do not have CAC registration. Can I still apply?",
    answer:
      "Co-operatives and smallholder groups can apply with alternative documentation. Tell us about your structure in the application and our team will advise.",
  },
  {
    question: "When do I get paid?",
    answer:
      "Payouts are requested against delivered orders and paid to your verified bank account. Commission and any refunds are shown on the payout statement.",
  },
];

export default function VendorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Vendor programme"
        breadcrumb="Vendors"
        image={images.greenhouse}
        title={
          <>
            Sell what you grow, to buyers who are ready to{" "}
            <span className="italic text-bronze-600">pay</span>.
          </>
        }
        description="Apply to sell on OpticsView. Every application is reviewed by a person, and only verified vendors can publish listings or accept marketplace orders."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?topic=vendor" size="lg" withArrow>
            Start an application
          </Button>
          <Button href="#requirements" size="lg" variant="outline">
            Read the requirements
          </Button>
        </div>
      </PageHero>

      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-page">
          <Eyebrow>Who can sell</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
            Producers and businesses with something real to sell.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {sellerTypes.map((type, index) => (
              <article
                key={type.title}
                className="border border-sand-300/70 bg-sand-50 p-7"
              >
                <p className="text-[11px] tabular-nums tracking-[0.14em] text-stone-500">
                  0{index + 1}
                </p>
                <h3 className="mt-6 font-display text-[23px] leading-tight tracking-[-0.01em] text-ink-950">
                  {type.title}
                </h3>
                <p className="mt-3 text-[12.5px] leading-[1.7] text-stone-600">
                  {type.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-100 py-16 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Why vendors stay</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
              A marketplace should make selling{" "}
              <span className="italic text-bronze-600">simpler</span>.
            </h2>
            <p className="mt-5 max-w-md text-[13.5px] leading-[1.8] text-stone-600">
              No listing fees to start, no bidding war on your own product, and no
              mystery deductions. You keep control of price and stock; we bring
              the buyers and the records.
            </p>
            <Button href="/contact?topic=vendor" className="mt-7" withArrow>
              Talk to the vendor team
            </Button>
          </div>

          <ol className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <li key={benefit.title} className="border-t border-sand-300 pt-5">
                <span className="text-[10.5px] tabular-nums tracking-[0.14em] text-bronze-600">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-[14px] font-semibold text-ink-950">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-[1.7] text-stone-600">
                  {benefit.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="requirements"
        className="scroll-mt-24 bg-sand-50 py-16 md:py-24"
      >
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Requirements</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
              What we need before your first listing.
            </h2>
            <p className="mt-5 text-[13.5px] leading-[1.8] text-stone-600">
              These are not formalities. A verified vendor protects every buyer
              on the marketplace, including the ones who will pay you.
            </p>

            <ul className="mt-8 space-y-3.5">
              {requirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex gap-3 text-[13px] leading-relaxed text-ink-800"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-bronze-500/30 bg-bronze-500/10">
                    <Check className="h-3 w-3 text-bronze-600" />
                  </span>
                  {requirement}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-ochre-500/30 bg-ochre-500/[0.07] p-7 md:p-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ochre-600">
              Commission, explained
            </p>
            <h3 className="mt-4 font-display text-[28px] leading-tight tracking-[-0.015em] text-ink-950">
              Transparent from the first order.
            </h3>
            <ul className="mt-6 space-y-4 text-[12.5px] leading-[1.7] text-ink-700">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ochre-600" />
                Commission is set per category and agreed in writing during
                onboarding.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ochre-600" />
                The rate is locked at the time of each order, so later changes
                never rewrite history.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ochre-600" />
                Every order and payout statement shows the gross amount,
                commission and net payable.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ochre-600" />
                Refunds and disputes are recorded against the original order, not
                deducted quietly from later sales.
              </li>
            </ul>
            <p className="mt-6 border-t border-ochre-500/20 pt-5 text-[11px] leading-relaxed text-stone-600">
              Current rates are shared during onboarding and depend on category
              and order volume.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sand-100 py-16 md:py-24">
        <div className="container-page">
          <Eyebrow>From application to first order</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.1rem,3.6vw,3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
            Six steps, no guessing.
          </h2>

          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {onboarding.map((item) => (
              <li key={item.step} className="border-t border-sand-300 pt-5">
                <p className="text-[10.5px] tabular-nums tracking-[0.16em] text-stone-500">
                  {item.step}
                </p>
                <h3 className="mt-3 font-display text-[21px] leading-tight tracking-[-0.01em] text-ink-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-[1.7] text-stone-600">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand-50 py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Eyebrow>Questions</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.1rem,3.4vw,2.8rem)] leading-[1.04] tracking-[-0.02em] text-ink-950">
              Before you apply.
            </h2>
            <p className="mt-4 text-[13px] leading-relaxed text-stone-600">
              Still unsure? Email{" "}
              <a
                href="mailto:vendors@opticsviewfarms.ng"
                className="text-ink-900 underline decoration-sand-300 underline-offset-4"
              >
                vendors@opticsviewfarms.ng
              </a>{" "}
              and a person will reply.
            </p>
          </div>

          <div className="divide-y divide-sand-300/70 border-y border-sand-300/70">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[13.5px] font-medium text-ink-950">
                  {faq.question}
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-sand-300 text-stone-600 transition-transform duration-300 group-open:rotate-45">
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      aria-hidden="true"
                    >
                      <path d="M6 1v10M1 6h10" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 max-w-xl pr-10 text-[12.5px] leading-[1.75] text-stone-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-sand-300/70 bg-sand-200 py-16 md:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="max-w-xl font-display text-[clamp(2rem,3.4vw,2.8rem)] leading-[1.04] tracking-[-0.02em] text-ink-950">
              Ready to put your products in front of buyers?
            </h2>
            <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-ink-700">
              Send us your details and we will start the verification
              conversation.
            </p>
          </div>
          <Button href="/contact?topic=vendor" size="lg" withArrow>
            Apply to become a vendor
          </Button>
        </div>
      </section>
    </>
  );
}
