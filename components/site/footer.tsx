import Link from "next/link";
import { ConnectionStatus } from "@/components/site/connection-status";
import { Logo } from "@/components/site/logo";
import { footerNav, site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-sand-300/70 bg-sand-100 text-ink-900">
      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-6 text-[13px] leading-[1.75] text-stone-600">
              An integrated agricultural company and verified marketplace.
              Grown in Nigeria, built to keep working when the network does not.
            </p>

            <address className="mt-7 space-y-2.5 text-[12.5px] not-italic text-stone-600">
              <p>{site.contact.address}</p>
              <p>
                <a
                  href={site.contact.phoneHref}
                  className="transition-colors hover:text-bronze-600"
                >
                  {site.contact.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="transition-colors hover:text-bronze-600"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>

            <div className="mt-7 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.16em] text-stone-500">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition-colors hover:text-ink-900"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[12.5px] text-ink-800 transition-colors hover:text-bronze-600"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-sand-300/70 pt-6 text-[11px] text-stone-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName} · Ibadan, Nigeria
          </p>
          <div className="flex items-center gap-5">
            <ConnectionStatus className="text-ink-700" />
            <a href="#top" className="transition-colors hover:text-ink-900">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
