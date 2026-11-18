import type { CSSProperties } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Quote } from "@/components/ui/icons";
import { testimonialList } from "@/lib/data/farms";

export function Testimonials() {
  return (
    <section className="bg-sand-50 py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="From the field"
          title={
            <>
              Built with the people who do the{" "}
              <span className="italic text-bronze-600">work</span>.
            </>
          }
          description="Supervisors, operations leads and vendors use the platform every day. These are the things they told us actually changed."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {testimonialList.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="flex flex-col border border-sand-300/70 bg-sand-50 p-7"
            >
              <Quote className="h-6 w-6 text-ochre-500/80" />
              <blockquote className="mt-5 flex-1 text-[14px] leading-[1.75] text-ink-800">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-sand-300/70 pt-5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-800 text-[11px] font-medium text-sand-50">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-[12.5px] font-medium text-ink-950">
                    {testimonial.name}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    {testimonial.role} · {testimonial.org}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
