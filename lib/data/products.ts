import { images } from "@/lib/images";

export type CategoryId =
  | "produce"
  | "grains"
  | "poultry"
  | "livestock"
  | "fish"
  | "inputs"
  | "processed";

export type Category = { id: CategoryId; label: string };

export const categories: Category[] = [
  { id: "produce", label: "Fruit & vegetables" },
  { id: "grains", label: "Grains & staples" },
  { id: "poultry", label: "Poultry & eggs" },
  { id: "livestock", label: "Livestock" },
  { id: "fish", label: "Fish & fingerlings" },
  { id: "inputs", label: "Agro-inputs" },
  { id: "processed", label: "Processed" },
];

export type Product = {
  slug: string;
  name: string;
  vendor: string;
  vendorSlug: string;
  vendorVerified: boolean;
  category: CategoryId;
  unit: string;
  /** Minor units — kobo. */
  retailPrice: number;
  /** Minor units — kobo. Null when no wholesale tier exists. */
  wholesalePrice: number | null;
  /** Minimum order quantity for the wholesale tier, in `unit`s. */
  moq: number | null;
  location: string;
  image: string;
  available: number;
  rating: number;
  reviews: number;
  badge?: "Harvest fresh" | "Best seller" | "Low stock" | "New";
  description: string;
  highlights: string[];
  wholesaleOnly?: boolean;
};

export const products: Product[] = [
  {
    slug: "fresh-roma-tomatoes",
    name: "Fresh Roma Tomatoes",
    vendor: "Green Ridge Farms",
    vendorSlug: "green-ridge-farms",
    vendorVerified: true,
    category: "produce",
    unit: "50 kg basket",
    retailPrice: 4_800_000,
    wholesalePrice: 4_200_000,
    moq: 5,
    location: "Kaduna",
    image: images.tomatoes,
    available: 84,
    rating: 4.8,
    reviews: 126,
    badge: "Harvest fresh",
    description:
      "Firm, deep-red Roma tomatoes graded and packed the same morning they are harvested. Grown under drip irrigation on our Kaduna plots and packed in ventilated 50 kg baskets to reduce travel bruising.",
    highlights: [
      "Graded B+ or better, no green shoulders",
      "Harvested within 24 hours of dispatch",
      "Cold-chain option available for Lagos and Abuja",
    ],
  },
  {
    slug: "yellow-maize-cleaned",
    name: "Yellow Maize, cleaned",
    vendor: "Sahel Grains Co-op",
    vendorSlug: "sahel-grains-co-op",
    vendorVerified: true,
    category: "grains",
    unit: "100 kg bag",
    retailPrice: 6_250_000,
    wholesalePrice: 5_900_000,
    moq: 10,
    location: "Kano",
    image: images.maize,
    available: 1240,
    rating: 4.7,
    reviews: 208,
    badge: "Best seller",
    description:
      "Cleaned and dried yellow maize at 13.5% moisture, double-sorted and bagged in new 100 kg polypropylene sacks. Stored in our Dawakin warehouse and available for full-truck or part-load collection.",
    highlights: [
      "Moisture tested at intake, certificate on request",
      "Aflatoxin screening on every lot",
      "Truck-load pricing available from 300 bags",
    ],
  },
  {
    slug: "live-broiler-chicken",
    name: "Live Broiler Chicken",
    vendor: "Agbeloba Poultry",
    vendorSlug: "agbeloba-poultry",
    vendorVerified: true,
    category: "poultry",
    unit: "bird",
    retailPrice: 980_000,
    wholesalePrice: 900_000,
    moq: 50,
    location: "Ogun",
    image: images.poultry,
    available: 3200,
    rating: 4.6,
    reviews: 94,
    description:
      "Six-week broilers averaging 2.2 kg live weight, raised on a maize-soya ration with a full vaccination record. Birds are caught and crated at dawn so they reach your kitchen or processing line in condition.",
    highlights: [
      "Average live weight 2.1–2.4 kg",
      "Vaccination and medication record supplied",
      "Same-day dispatch within 120 km of Abeokuta",
    ],
  },
  {
    slug: "live-catfish",
    name: "Live Catfish",
    vendor: "Delta Blue Aquaculture",
    vendorSlug: "delta-blue-aquaculture",
    vendorVerified: true,
    category: "fish",
    unit: "kg",
    retailPrice: 320_000,
    wholesalePrice: 295_000,
    moq: 100,
    location: "Delta",
    image: images.fish,
    available: 4800,
    rating: 4.9,
    reviews: 158,
    badge: "Best seller",
    description:
      "Table-size Clarias catfish at 1.0–1.4 kg, pumped from earthen ponds into oxygenated tanks the morning of dispatch. Pond water quality is logged twice daily and shared with buyers on request.",
    highlights: [
      "1.0–1.4 kg table size",
      "Oxygenated transport for long routes",
      "Weekly pond water-quality report",
    ],
  },
  {
    slug: "table-eggs-crate",
    name: "Table Eggs, crate of 30",
    vendor: "Agbeloba Poultry",
    vendorSlug: "agbeloba-poultry",
    vendorVerified: true,
    category: "poultry",
    unit: "crate of 30",
    retailPrice: 540_000,
    wholesalePrice: 500_000,
    moq: 40,
    location: "Ogun",
    image: images.eggs,
    available: 960,
    rating: 4.5,
    reviews: 312,
    description:
      "Fresh brown table eggs from layer houses, candled and packed in reinforced crates. Collected daily and held at 18°C before loading, with a lay date stamped on every crate.",
    highlights: [
      "Lay date on every crate",
      "Reinforced crates, less than 1% breakage",
      "Daily collection for freshness",
    ],
  },
  {
    slug: "ofada-rice-destoned",
    name: "Ofada Rice, destoned",
    vendor: "Mama Nkechi Produce",
    vendorSlug: "mama-nkechi-produce",
    vendorVerified: true,
    category: "grains",
    unit: "50 kg bag",
    retailPrice: 9_500_000,
    wholesalePrice: 8_900_000,
    moq: 5,
    location: "Enugu",
    image: images.rice,
    available: 260,
    rating: 4.8,
    reviews: 176,
    description:
      "Locally grown Ofada rice, parboiled and destoned in Enugu. Nutty aroma and separate grains after cooking, packed in 50 kg bags with a batch number for traceability.",
    highlights: [
      "Stone content below 0.1%",
      "Parboiled for firmer grains",
      "Batch code on every bag",
    ],
  },
  {
    slug: "habanero-pepper",
    name: "Habanero Pepper",
    vendor: "Green Ridge Farms",
    vendorSlug: "green-ridge-farms",
    vendorVerified: true,
    category: "produce",
    unit: "25 kg bag",
    retailPrice: 2_100_000,
    wholesalePrice: 1_850_000,
    moq: 4,
    location: "Kaduna",
    image: images.pepper,
    available: 140,
    rating: 4.4,
    reviews: 61,
    description:
      "Hot, bright habanero peppers picked at full colour for sauce makers and processors. Packed loose in ventilated bags and dispatched within a day of picking.",
    highlights: [
      "Full-colour, high pungency",
      "Ideal for sauce and pepper-mash processors",
      "Sold by weight, not by count",
    ],
  },
  {
    slug: "puna-yam-tubers",
    name: "Puna Yam Tubers",
    vendor: "Mama Nkechi Produce",
    vendorSlug: "mama-nkechi-produce",
    vendorVerified: true,
    category: "produce",
    unit: "100 tubers",
    retailPrice: 15_000_000,
    wholesalePrice: 14_200_000,
    moq: 2,
    location: "Benue",
    image: images.yam,
    available: 46,
    rating: 4.6,
    reviews: 88,
    description:
      "Mature puna yam tubers from Benue, cured for two weeks before dispatch so they store well. Sorted by size and freed of field soil, with a low bruise rate on delivery.",
    highlights: [
      "Cured for longer shelf life",
      "Size-sorted lots",
      "Bulk truck pricing on request",
    ],
  },
  {
    slug: "plantain-large-bunch",
    name: "Plantain, large bunch",
    vendor: "Green Ridge Farms",
    vendorSlug: "green-ridge-farms",
    vendorVerified: true,
    category: "produce",
    unit: "large bunch",
    retailPrice: 850_000,
    wholesalePrice: 780_000,
    moq: 20,
    location: "Edo",
    image: images.plantain,
    available: 310,
    rating: 4.3,
    reviews: 42,
    badge: "New",
    description:
      "Green-mature plantain bunches cut to order, sized for ripening rooms and market resale. Cut and loaded the same day to keep the ripening window predictable.",
    highlights: [
      "Green-mature, controlled ripening",
      "Cut to order, not from cold store",
      "Bunch weight 12–18 kg",
    ],
  },
  {
    slug: "npk-20-10-10",
    name: "NPK 20-10-10 Fertiliser",
    vendor: "Sahel Agro Inputs",
    vendorSlug: "sahel-agro-inputs",
    vendorVerified: true,
    category: "inputs",
    unit: "50 kg bag",
    retailPrice: 5_800_000,
    wholesalePrice: 5_500_000,
    moq: 20,
    location: "Kano",
    image: images.fertilizer,
    available: 2200,
    rating: 4.7,
    reviews: 133,
    description:
      "Granular NPK 20-10-10 blended and bagged with a registered product number. Suitable for maize, sorghum and vegetable basal application. Stored dry and dispatched on pallets.",
    highlights: [
      "Registered, traceable product number",
      "Palletised dispatch",
      "Agronomist guidance included",
    ],
  },
  {
    slug: "soybean-cleaned",
    name: "Soybean, cleaned",
    vendor: "Sahel Grains Co-op",
    vendorSlug: "sahel-grains-co-op",
    vendorVerified: true,
    category: "grains",
    unit: "100 kg bag",
    retailPrice: 7_800_000,
    wholesalePrice: 7_450_000,
    moq: 10,
    location: "Kaduna",
    image: images.soybean,
    available: 780,
    rating: 4.5,
    reviews: 97,
    description:
      "Cleaned soybean with high oil content, double-screened and bagged for feed millers and processors. Consistent lot sizes make it easy to plan a production run.",
    highlights: [
      "Oil content tested per lot",
      "Double-screened, low foreign matter",
      "Feed-mill contract volumes available",
    ],
  },
  {
    slug: "smoked-catfish",
    name: "Smoked Catfish",
    vendor: "Delta Blue Aquaculture",
    vendorSlug: "delta-blue-aquaculture",
    vendorVerified: true,
    category: "processed",
    unit: "kg",
    retailPrice: 4_100_000,
    wholesalePrice: null,
    moq: null,
    location: "Delta",
    image: images.smokedFish,
    available: 96,
    rating: 4.8,
    reviews: 74,
    description:
      "Catfish smoked over hardwood for 18 hours, vacuum-packed in 1 kg packs for longer storage and export. Sold as a single retail pack; bulk volumes are quoted on request. No additives, no artificial colour, moisture checked before packing.",
    highlights: [
      "18-hour hardwood smoke",
      "Vacuum-packed in 1 kg packs",
      "Moisture checked before packing",
    ],
  },
  {
    slug: "live-cattle",
    name: "Live Cattle, 350–400 kg",
    vendor: "OpticsView Own Farms",
    vendorSlug: "opticsview-own-farms",
    vendorVerified: true,
    category: "livestock",
    unit: "head",
    retailPrice: 85_000_000,
    wholesalePrice: 82_000_000,
    moq: 5,
    location: "Oyo",
    image: images.cattle,
    available: 62,
    rating: 4.4,
    reviews: 38,
    description:
      "Grass-raised White Fulani cattle from our Oyo ranch, weighed on a certified scale before sale and accompanied by a veterinary health certificate. Transport can be arranged.",
    highlights: [
      "Certified live-weight weighing",
      "Veterinary health certificate",
      "Transport arranged on request",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategoryLabel(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.label ?? id;
}

export function getVendorProducts(vendorSlug: string): Product[] {
  return products.filter((product) => product.vendorSlug === vendorSlug);
}
