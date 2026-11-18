import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-sand-50 py-24">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="font-display text-[clamp(4rem,10vw,7rem)] leading-none tracking-[-0.03em] text-sand-300">
            404
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,4.2vw,3.2rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
            This page has not been planted.
          </h1>
          <p className="mt-4 text-[14px] leading-[1.8] text-stone-600">
            The link may be old, or the page may have moved. The marketplace and
            the farms are still where you left them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" withArrow>
              Back to the home page
            </Button>
            <Button href="/marketplace" variant="outline" withArrow>
              Browse the marketplace
            </Button>
          </div>
          <div className="mt-12">
            <Logo />
          </div>
          <p className="mt-4 text-[11.5px] text-stone-500">
            Looking for something specific?{" "}
            <Link
              href="/contact"
              className="text-ink-900 underline decoration-sand-300 underline-offset-4"
            >
              Contact the team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
