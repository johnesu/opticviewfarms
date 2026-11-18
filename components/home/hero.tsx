import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { formatNaira } from "@/lib/format";
import { images } from "@/lib/images";
import { products } from "@/lib/data/products";

const heroStats = [
  { value: "18", label: "farms in six states" },
  { value: "1,240", label: "hectares managed" },
  { value: "240+", label: "verified vendors" },
  { value: "99.9%", label: "sync success rate" },
];

const featured = products.find(
  (product) => product.slug === "fresh-roma-tomatoes",
);

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(105deg,#f2e7d8_0%,#e9d9c6_48%,#dcc3a7_100%)] pt-[84px] text-ink-900">
      <Image
        src={images.hero}
        alt="Rows of crops on an OpticsView farm in Oyo State"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[62%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(247,241,232,0.96)_0%,rgba(247,241,232,0.88)_46%,rgba(239,227,211,0.82)_100%)] lg:bg-[linear-gradient(96deg,rgba(247,241,232,0.98)_0%,rgba(247,241,232,0.93)_32%,rgba(240,227,211,0.5)_60%,rgba(226,208,186,0.18)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(176,209,234,0.9)_0%,rgba(176,209,234,0.55)_22%,transparent_50%)]"
      />

      <div className="container-page flex min-h-[calc(100svh-84px)] flex-col gap-10 py-12 md:py-14 lg:grid lg:grid-cols-2 lg:gap-10 lg:py-14">
        <div className="flex flex-col justify-between gap-9 md:gap-10">
          <h1 className="max-w-[640px] font-display text-[clamp(3rem,4.8vw,4.8rem)] font-normal leading-[1.02] tracking-[-0.02em]">
            Grown with care,
            <br />
            traded with proof,
            <br />
            <em className="italic">delivered fresh.</em>
          </h1>

          {featured ? (
            <FeaturedCard
              slug={featured.slug}
              name={featured.name}
              price={featured.retailPrice}
              unit={featured.unit}
              image={featured.image}
              className="self-start"
            />
          ) : null}
        </div>

        <div className="flex flex-col items-start justify-between gap-8 lg:items-end lg:gap-10">
          <SocialProof className="lg:mt-auto" />

          <div className="w-full max-w-[420px]">
            <p className="text-[14.5px] leading-[1.6] text-ink-800 [text-shadow:0_1px_14px_rgba(247,241,232,0.7)]">
              Produce from our own farms and verified vendors across Nigeria,
              with the harvest record attached. Retail crates or wholesale
              loads, delivered to your door.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button
                href="/marketplace"
                size="lg"
                withArrow
                className="whitespace-nowrap px-5"
              >
                Shop the marketplace
              </Button>
              <Button
                href="/our-farms"
                size="lg"
                variant="outline-light"
                className="whitespace-nowrap bg-sand-50 px-5 hover:border-ink-900"
              >
                Tour our farms
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet proof band beneath the hero */}
      <div className="relative border-t border-ink-900/10 bg-sand-50">
        <div className="container-page grid grid-cols-2 gap-y-7 py-8 md:grid-cols-4 md:py-9">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "md:px-8",
                index === 0 && "md:pl-0",
                index > 0 && "md:border-l md:border-ink-900/10",
              )}
            >
              <p className="font-display text-[27px] leading-none tracking-[-0.01em]">
                {stat.value}
              </p>
              <p className="mt-2.5 text-[10px] uppercase tracking-[0.18em] text-stone-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({
  slug,
  name,
  price,
  unit,
  image,
  className,
}: {
  slug: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  className?: string;
}) {
  return (
    <Link
      href={`/marketplace/${slug}`}
      className={cn(
        "group relative block w-[245px] bg-sand-50 px-5 pb-0 pt-7 text-center shadow-[0_20px_40px_rgba(31,25,22,0.08)] transition-shadow duration-500 hover:shadow-[0_26px_50px_rgba(31,25,22,0.14)]",
        className,
      )}
    >
      <p className="text-[13.5px] font-medium text-ink-900">{name}</p>
      <p className="mt-1.5 text-[14px] font-semibold text-ink-900">
        {formatNaira(price)}
      </p>

      <div className="mt-5 flex h-[120px] items-end justify-center overflow-hidden">
        <Image
          src={image}
          alt=""
          width={220}
          height={170}
          sizes="220px"
          className="h-[120px] w-[170px] object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>

      <span
        aria-hidden="true"
        className="absolute -bottom-5 left-1/2 grid h-[42px] w-[42px] -translate-x-1/2 place-items-center rounded-full bg-sand-50 text-ink-900 shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
      >
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12 12 4M5.5 4H12v6.5" />
        </svg>
      </span>
      <span className="sr-only">View {name}</span>
      <span className="sr-only">{unit}</span>
    </Link>
  );
}

function SocialProof({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* Compact proof row on phones so the hero keeps its pacing. */}
      <div className="flex items-center gap-3 sm:hidden">
        <span className="flex -space-x-2.5">
          {[images.tomatoes, images.farmer, images.poultry].map((src) => (
            <span
              key={src}
              className="block h-8 w-8 overflow-hidden rounded-full border-2 border-sand-50"
            >
              <Image
                src={src}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </span>
          ))}
        </span>
        <p className="text-[10px] uppercase tracking-[0.16em] text-ink-700">
          <span className="mr-1 font-display text-[16px] normal-case tracking-normal text-ink-950">
            240+
          </span>
          verified vendors
        </p>
      </div>

      <div className="relative hidden h-[190px] w-[150px] sm:block">
        <span className="sr-only">
          Photographs from our farms and verified vendor network
        </span>

        <span className="absolute right-2.5 top-0 block h-[38px] w-[38px] overflow-hidden rounded-full border-2 border-sand-50/90 shadow-[0_6px_15px_rgba(0,0,0,0.12)]">
          <Image
            src={images.tomatoes}
            alt=""
            width={76}
            height={76}
            className="h-full w-full object-cover"
          />
        </span>

        <span className="absolute left-[22px] top-[34px] block h-[52px] w-[52px] overflow-hidden rounded-full border-2 border-sand-50/90 shadow-[0_6px_15px_rgba(0,0,0,0.12)]">
          <Image
            src={images.farmer}
            alt=""
            width={104}
            height={104}
            className="h-full w-full object-cover"
          />
        </span>

        <span className="absolute right-[56px] top-[86px] block h-[32px] w-[32px] overflow-hidden rounded-full border-2 border-sand-50/90 shadow-[0_6px_15px_rgba(0,0,0,0.12)]">
          <Image
            src={images.poultry}
            alt=""
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </span>

        <span className="absolute bottom-3 right-3 grid h-[58px] w-[58px] place-items-center rounded-full bg-ink-800 font-display text-[19px] text-sand-50 shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
          240+
        </span>

        <span className="sr-only">240+ verified vendors</span>
      </div>
    </div>
  );
}
