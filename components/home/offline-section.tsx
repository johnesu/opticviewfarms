import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check, CloudOff, Refresh } from "@/components/ui/icons";

const offlinePoints = [
  "Field records, harvests, feed logs and cash sales queue on the device.",
  "Stock moves through an append-only ledger, never a silent overwrite.",
  "Conflicts are surfaced for review instead of guessed at.",
  "Photos and receipts upload when a connection is available.",
];

const queue = [
  {
    label: "Harvest · Maize plot B2",
    value: "4.2 t",
    status: "Synced",
    time: "09:41",
  },
  {
    label: "Feed record · Batch PL-14",
    value: "12 bags",
    status: "Synced",
    time: "09:44",
  },
  {
    label: "Cash sale · Tomatoes",
    value: "₦84,500",
    status: "Pending",
    time: "10:02",
  },
  {
    label: "Stock movement · Layers feed",
    value: "−8 bags",
    status: "Conflict",
    time: "10:06",
  },
] as const;

const statusStyles: Record<(typeof queue)[number]["status"], string> = {
  Synced: "border-bronze-500/30 bg-bronze-500/10 text-bronze-600",
  Pending: "border-ochre-500/35 bg-ochre-500/10 text-ochre-600",
  Conflict: "border-clay-500/30 bg-clay-500/10 text-clay-600",
};

export function OfflineSection() {
  return (
    <section className="bg-sand-50 pb-20 md:pb-28" id="offline">
      <div className="container-page">
        <div className="relative overflow-hidden border border-sand-300/80 bg-sand-100 px-6 py-12 md:px-14 md:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_100%_0%,rgba(176,122,63,0.12),transparent_60%)]"
          />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
            <div className="max-w-xl">
              <Eyebrow>Offline-first</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(2.1rem,3.8vw,3.3rem)] leading-[1.03] tracking-[-0.02em] text-ink-950">
                The farm doesn&rsquo;t wait for a{" "}
                <span className="italic text-bronze-600">signal</span>.
              </h2>
              <p className="mt-5 text-[14px] leading-[1.75] text-stone-600">
                Connectivity in the field is unreliable, so the platform is
                built to work without it. Records are written locally first and
                synchronized in order, with the server staying authoritative for
                payments, approvals and permissions.
              </p>

              <ul className="mt-8 space-y-3.5">
                {offlinePoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[13px] leading-relaxed text-ink-800"
                  >
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center border border-bronze-500/30 bg-bronze-500/10">
                      <Check className="h-3 w-3 text-bronze-600" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <Link
                href="/about#offline"
                className="group mt-9 inline-flex items-center gap-2 border-b border-ink-900/25 pb-1 text-[12.5px] text-ink-800 transition-colors hover:border-bronze-500 hover:text-bronze-600"
              >
                <Refresh className="h-3.5 w-3.5" />
                How synchronization works
              </Link>
            </div>

            <div className="relative">
              <div className="border border-sand-300 bg-sand-50 p-5 shadow-[0_30px_60px_-45px_rgba(31,25,22,0.5)] md:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-sand-300/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center border border-sand-300 bg-sand-100">
                      <CloudOff className="h-4 w-4 text-stone-600" />
                    </span>
                    <div>
                      <p className="text-[12px] text-ink-900">Farm tablet 02</p>
                      <p className="text-[9.5px] uppercase tracking-[0.16em] text-stone-500">
                        Sync monitor
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 border border-bronze-500/30 bg-bronze-500/10 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-bronze-600">
                    <span className="h-1 w-1 rounded-full bg-bronze-500" />
                    Online
                  </span>
                </div>

                <ul className="divide-y divide-sand-200">
                  {queue.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 py-3.5">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] text-ink-900">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-[10.5px] text-stone-500">
                          {item.time} · {item.value}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 border px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.1em] ${statusStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex items-center justify-between border-t border-sand-300/80 pt-4">
                  <p className="text-[10.5px] text-stone-500">
                    3 operations queued · last attempt 2 min ago
                  </p>
                  <span className="border border-sand-300 px-3 py-1 text-[10px] text-ink-700">
                    Retry
                  </span>
                </div>
              </div>

              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.18em] text-stone-500">
                Interface preview · live queue appears in the farm app
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
