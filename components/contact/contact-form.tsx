"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

const topics = [
  { value: "buying", label: "Buying or wholesale" },
  { value: "vendor", label: "Vendor application" },
  { value: "partnership", label: "Partnership or supply" },
  { value: "support", label: "Order or product question" },
  { value: "careers", label: "Careers" },
  { value: "general", label: "Something else" },
];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({
  defaultTopic = "general",
  defaultMessage = "",
}: {
  defaultTopic?: string;
  defaultMessage?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState(defaultTopic);
  const [message, setMessage] = useState(defaultMessage);
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};
    if (!name.trim()) nextErrors.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (message.trim().length < 10) {
      nextErrors.message = "A little more detail helps us respond properly.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setOpened(false);
      return;
    }

    const topicLabel =
      topics.find((item) => item.value === topic)?.label ?? "Enquiry";

    const subject = `${topicLabel} — ${name.trim()}`;
    const body = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      `Topic: ${topicLabel}`,
      "",
      message.trim(),
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const fieldClass = (invalid: boolean) =>
    cn(
      "h-12 w-full border bg-sand-100/60 px-4 text-[13px] text-ink-950 placeholder:text-stone-500 focus:bg-sand-50 focus:outline-none",
      invalid
        ? "border-clay-500/60 focus:border-clay-500"
        : "border-sand-300 focus:border-ink-900/40",
    );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600"
          >
            Your name
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClass(Boolean(errors.name))}
            placeholder="Amina Yusuf"
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-[11px] text-clay-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClass(Boolean(errors.email))}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-[11px] text-clay-600">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600"
          >
            Phone{" "}
            <span className="font-normal normal-case tracking-normal text-stone-500">
              (optional)
            </span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            className={fieldClass(false)}
            placeholder="+234 800 000 0000"
          />
        </div>

        <div>
          <label
            htmlFor="topic"
            className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600"
          >
            What is this about?
          </label>
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className={fieldClass(false)}
          >
            {topics.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(
            "w-full resize-y border bg-sand-100/60 px-4 py-3.5 text-[13px] leading-relaxed text-ink-950 placeholder:text-stone-500 focus:bg-sand-50 focus:outline-none",
            errors.message
              ? "border-clay-500/60 focus:border-clay-500"
              : "border-sand-300 focus:border-ink-900/40",
          )}
          placeholder="Tell us about your farm, the products you need or the question you have."
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-[11px] text-clay-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="group/btn inline-flex h-12 items-center justify-center gap-2.5 bg-ink-800 px-6 text-[13px] font-medium text-sand-50 transition-colors duration-300 hover:bg-ink-700"
        >
          Open in email app
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 12 12 4M5.5 4H12v6.5" />
          </svg>
        </button>
        <p className="text-[11px] leading-relaxed text-stone-500">
          Opens your mail app with the message ready to send.
        </p>
      </div>

      <div aria-live="polite" role="status">
        {opened ? (
          <p className="border border-bronze-500/30 bg-bronze-500/10 px-4 py-3 text-[12px] leading-relaxed text-ink-800">
            Your mail app should have opened. If it did not, email{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="underline underline-offset-4"
            >
              {site.contact.email}
            </a>{" "}
            or call {site.contact.phone}.
          </p>
        ) : null}
      </div>
    </form>
  );
}
