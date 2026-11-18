import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="OpticsView Farms — home"
      className={cn(
        "group inline-flex items-baseline gap-2.5 transition-opacity duration-300 hover:opacity-70",
        tone === "light" ? "text-sand-50" : "text-ink-900",
        className,
      )}
    >
      <span className="font-display text-[26px] font-medium leading-none tracking-[0.035em]">
        OpticsView
      </span>
      <span
        className={cn(
          "text-[9px] font-medium uppercase leading-none tracking-[0.34em]",
          tone === "light" ? "text-sand-50/60" : "text-stone-600",
        )}
      >
        Farms
      </span>
    </Link>
  );
}
