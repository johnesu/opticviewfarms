export const site = {
  name: "OpticsView Farms",
  shortName: "OpticsView",
  legalName: "OpticsView Agribusiness Ltd.",
  tagline: "Data-driven agriculture, from soil to market.",
  description:
    "OpticsView Farms runs its own farms and a verified agricultural marketplace across Nigeria. Track crops, livestock, poultry and fishery, manage stock and sell to buyers, online or off.",
  founded: 2016,
  contact: {
    phone: "+234 812 345 6789",
    phoneHref: "tel:+2348123456789",
    email: "hello@opticsviewfarms.ng",
    support: "support@opticsviewfarms.ng",
    address: "Km 12, Ibadan–Oyo Road, Oyo State, Nigeria",
    hours: "Mon–Fri, 8:00–18:00 WAT",
  },
  stats: {
    farms: 18,
    hectares: "1,240",
    states: 6,
    vendors: "240+",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "X", href: "https://x.com" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: "Our farms", href: "/our-farms" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Vendors", href: "/vendors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Platform",
    items: [
      { label: "Marketplace", href: "/marketplace" },
      { label: "Wholesale", href: "/marketplace?wholesale=1" },
      { label: "Become a vendor", href: "/vendors" },
      { label: "Our farms", href: "/our-farms" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About us", href: "/about" },
      { label: "How sync works", href: "/about#offline" },
      { label: "Delivery", href: "/about#delivery" },
      { label: "Photo credits", href: "/credits" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Crop production", href: "/our-farms#crops" },
      { label: "Livestock & poultry", href: "/our-farms#livestock" },
      { label: "Fishery", href: "/our-farms#fishery" },
      { label: "Vendor applications", href: "/vendors" },
    ],
  },
];

export const capabilities = [
  "Crop cycles",
  "Livestock records",
  "Poultry batches",
  "Fishery ponds",
  "Warehouse stock",
  "Procurement",
  "Multi-vendor orders",
  "Route delivery",
  "Commissions",
  "Farm finance",
  "Offline sync",
];
