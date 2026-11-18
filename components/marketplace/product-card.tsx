import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Star } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { formatNaira } from "@/lib/format";
import type { Product } from "@/lib/data/products";

export function ProductCard({
  product,
  className,
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/marketplace/${product.slug}`}
      className={cn(
        "lift group flex flex-col overflow-hidden border border-sand-300/70 bg-sand-50",
        className,
      )}
    >
      <div className="zoom-media relative aspect-[4/3] overflow-hidden bg-sand-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 bg-sand-50/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-900 backdrop-blur">
            {product.badge}
          </span>
        ) : null}
        {product.vendorVerified ? (
          <span
            className="absolute right-3 top-3 grid h-7 w-7 place-items-center bg-sand-50/90 text-bronze-600 backdrop-blur"
            title="Verified vendor"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span className="sr-only">Verified vendor</span>
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-[10.5px] uppercase tracking-[0.1em] text-stone-500">
          <span>{product.location}</span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-ochre-500" />
            <span className="text-ink-900">{product.rating.toFixed(1)}</span>
            <span className="normal-case tracking-normal text-stone-500">
              ({product.reviews})
            </span>
          </span>
        </div>

        <h3 className="mt-3 font-display text-[21px] leading-[1.2] tracking-[-0.01em] text-ink-950 transition-colors duration-300 group-hover:text-bronze-600">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[11.5px] text-stone-500">by {product.vendor}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="font-display text-[23px] leading-none tracking-[-0.01em] text-ink-950">
              {formatNaira(product.retailPrice)}
            </p>
            <p className="mt-1.5 text-[10px] uppercase tracking-[0.12em] text-stone-500">
              per {product.unit}
            </p>
          </div>
          {product.wholesalePrice ? (
            <span className="mb-0.5 border border-sand-300 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.1em] text-stone-600">
              Wholesale
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
