import type { Metadata, Viewport } from "next";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://opticsviewfarms.ng"),
  title: {
    default: "OpticsView Farms — Data-driven agriculture, from soil to market",
    template: "%s · OpticsView Farms",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Nigerian agriculture",
    "farm management",
    "agricultural marketplace",
    "wholesale produce",
    "poultry",
    "catfish",
    "grains",
    "farm ERP",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: site.name,
    title: "OpticsView Farms — Data-driven agriculture, from soil to market",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "OpticsView Farms",
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const fontStylesheet =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Plus+Jakarta+Sans:wght@300..700&display=swap";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={fontStylesheet} />
        <script
          // Enables reveal animations only when JS is available.
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body id="top" className="min-h-svh bg-sand-50 font-sans text-ink-900">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:text-sand-50"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
