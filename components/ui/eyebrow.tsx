import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.26em]",
        tone === "light" ? "text-bronze-600" : "text-bronze-600",
        className,
      )}
    >
      <span className="h-px w-7 bg-bronze-400/70" />
      {children}
    </p>
  );
}
