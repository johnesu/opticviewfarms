"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectionStatus } from "@/components/site/connection-status";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/cn";
import { mainNav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-0">
      <div className="mx-auto w-full max-w-[82rem]">
        <div
          className={cn(
            "border border-sand-300/70 bg-sand-50/95 backdrop-blur-md transition-shadow duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
            scrolled || menuOpen
              ? "shadow-[0_22px_48px_-32px_rgba(31,25,22,0.45)]"
              : "shadow-[0_14px_30px_-30px_rgba(31,25,22,0.35)]",
          )}
        >
          <div className="grid h-[72px] grid-cols-[1fr_auto] items-center gap-6 px-3 md:px-10 xl:px-16 lg:grid-cols-[1fr_auto_1fr]">
            <Logo />

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {mainNav.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative py-2 text-[13.5px] tracking-[0.01em] transition-opacity duration-200 hover:opacity-60",
                          "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-ink-900 after:transition-transform after:duration-300",
                          "hover:after:scale-x-100",
                          active && "after:scale-x-100",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center justify-end gap-3">
              <div className="hidden xl:block">
                <ConnectionStatus />
              </div>
              <div className="hidden sm:block">
                <Button href="/vendors" size="sm" withArrow>
                  Sell with us
                </Button>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="grid h-10 w-10 place-items-center border border-ink-900/15 transition-colors hover:bg-sand-100 lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={cn(
                      "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
                      menuOpen && "top-1/2 rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 top-1/2 h-px bg-current transition-opacity duration-200",
                      menuOpen && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300",
                      menuOpen && "bottom-1/2 -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          <div
            id="mobile-menu"
            className={cn(
              "overflow-y-auto border-t border-sand-200 bg-sand-50 text-ink-900 transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] lg:hidden",
              menuOpen
                ? "max-h-[calc(100svh-96px)] opacity-100"
                : "max-h-0 opacity-0",
            )}
          >
            <div className="flex min-h-[calc(100svh-96px)] flex-col justify-between gap-8 px-3 py-8 md:px-10 xl:px-16">
              <ul className="flex flex-col">
                {mainNav.map((item, index) => (
                  <li
                    key={item.href}
                    className="border-b border-sand-200 last:border-0"
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline gap-4 py-4"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="text-[10px] tabular-nums text-stone-500">
                        0{index + 1}
                      </span>
                      <span className="font-display text-[27px] leading-none tracking-[-0.01em]">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4">
                <Button href="/vendors" withArrow className="w-full">
                  Sell with us
                </Button>
                <div className="flex items-center justify-between text-[12px] text-stone-600">
                  <a href={site.contact.phoneHref} className="hover:text-ink-900">
                    {site.contact.phone}
                  </a>
                  <ConnectionStatus className="text-ink-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
