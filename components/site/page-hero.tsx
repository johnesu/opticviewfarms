import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumb,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  image?: string;
  breadcrumb: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("relative bg-sand-100 pt-[84px] text-ink-900", className)}
    >
      <div
        className={cn(
          "container-page grid gap-10 py-12 md:py-16 lg:gap-14 lg:py-16",
          image && "lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch",
        )}
      >
        <div className={cn("flex flex-col justify-center", !image && "max-w-3xl")}>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-stone-500"
          >
            <Link href="/" className="transition-colors hover:text-ink-900">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink-900">{breadcrumb}</span>
          </nav>

          <div className="mt-9">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,4.6vw,4.2rem)] font-normal leading-[1.02] tracking-[-0.02em]">
              {title}
            </h1>
            {description ? (
              <p className="mt-6 max-w-xl text-[14.5px] leading-[1.75] text-stone-600">
                {description}
              </p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
        </div>

        {image ? (
          <div className="relative min-h-[250px] overflow-hidden bg-sand-200 md:min-h-[320px] lg:min-h-[430px]">
            <Image
              src={image}
              alt=""
              aria-hidden="true"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
