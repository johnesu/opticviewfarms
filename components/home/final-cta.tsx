import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-sand-300/70 bg-sand-200 py-20 text-ink-900 md:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_0%,rgba(255,255,255,0.55),transparent_65%)]"
      />

      <div className="container-page relative flex flex-col items-center text-center">
        <Eyebrow>Start here</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.4rem,4.8vw,4.1rem)] leading-[1.02] tracking-[-0.02em] text-ink-950">
          Bring the whole operation onto{" "}
          <span className="italic">one page</span>.
        </h2>
        <p className="mt-6 max-w-xl text-[14px] leading-[1.75] text-ink-700">
          Whether you are buying a crate of eggs or running 400 hectares, the
          same records connect the work to the market.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/marketplace" size="lg" withArrow>
            Shop the marketplace
          </Button>
          <Button href="/contact" size="lg" variant="outline" withArrow>
            Talk to our team
          </Button>
        </div>

        <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-stone-600">
          Retail and wholesale · Verified vendors · Delivery nationwide
        </p>
      </div>
    </section>
  );
}
