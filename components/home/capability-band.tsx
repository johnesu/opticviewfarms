import { capabilities } from "@/lib/site";

export function CapabilityBand() {
  return (
    <section
      aria-label="What the platform covers"
      className="border-y border-sand-300/70 bg-sand-100/70 py-4"
    >
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-center gap-9 pr-9"
              aria-hidden={copy === 1}
            >
              {capabilities.map((capability) => (
                <span
                  key={`${copy}-${capability}`}
                  className="flex items-center gap-9 whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.2em] text-stone-600"
                >
                  {capability}
                  <span className="h-[3px] w-[3px] rounded-full bg-bronze-400" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
