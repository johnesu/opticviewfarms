import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { CloudOff, Refresh, ShieldCheck } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Set up your operation",
    body: "Create farms, plots, warehouses, teams and roles. Every record is scoped to the organization, farm or vendor that owns it.",
    meta: "Organizations · RBAC",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Record work as it happens",
    body: "Planting, feeding, spraying, harvests, stock movements and expenses, captured in the field by the person who did the work.",
    meta: "Works offline",
    icon: CloudOff,
  },
  {
    number: "03",
    title: "Sync, sell and reconcile",
    body: "Queued records sync safely when the network returns. Orders, commissions and payouts reconcile against an immutable ledger.",
    meta: "Server-verified",
    icon: Refresh,
  },
];

export function HowItWorks() {
  return (
    <section className="relative bg-sand-50 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              One system, from the first planting record to the{" "}
              <span className="italic text-bronze-600">final payout</span>.
            </>
          }
          description="Most farm tools stop at record keeping. OpticsView carries the same record through inventory, commerce, delivery and finance, so the numbers agree at the end of the month."
          action={
            <Button href="/about" variant="outline" withArrow>
              How the platform fits together
            </Button>
          }
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.number}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
                className="lift group relative flex flex-col border border-sand-300/70 bg-sand-50 p-7 hover:border-ink-900/15"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-medium tabular-nums tracking-[0.14em] text-stone-500">
                    {step.number}
                  </span>
                  <span className="grid h-10 w-10 place-items-center border border-sand-300 bg-sand-100 text-ink-800 transition-colors duration-300 group-hover:border-bronze-400 group-hover:text-bronze-600">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                </div>

                <h3 className="mt-8 font-display text-[24px] leading-tight tracking-[-0.01em] text-ink-950">
                  {step.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-stone-600">
                  {step.body}
                </p>

                <div className="mt-7 flex items-center gap-2 border-t border-sand-300/70 pt-4 text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500">
                  <span className="h-1 w-1 rounded-full bg-bronze-500" />
                  {step.meta}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
