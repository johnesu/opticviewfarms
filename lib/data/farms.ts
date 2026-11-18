import { images } from "@/lib/images";

export type Farm = {
  slug: string;
  name: string;
  state: string;
  region: string;
  hectares: number;
  established: number;
  focus: string[];
  manager: string;
  summary: string;
  image: string;
  stats: { label: string; value: string }[];
};

export const farms: Farm[] = [
  {
    slug: "awe-estate",
    name: "Awe Farm Estate",
    state: "Oyo",
    region: "South West",
    hectares: 420,
    established: 2016,
    focus: ["Maize", "Soybean", "Cassava"],
    manager: "Tunde Alabi",
    summary:
      "The estate where OpticsView started. Rain-fed and mechanised grain production with an on-site drying floor, 1,200-tonne store and a soil lab that serves neighbouring co-operatives.",
    image: images.hero,
    stats: [
      { label: "Under cultivation", value: "382 ha" },
      { label: "Storage", value: "1,200 t" },
      { label: "Season yield", value: "4.6 t/ha" },
    ],
  },
  {
    slug: "rigachikun",
    name: "Rigachikun Irrigation Farm",
    state: "Kaduna",
    region: "North West",
    hectares: 310,
    established: 2018,
    focus: ["Tomatoes", "Pepper", "Onions"],
    manager: "Hauwa Bello",
    summary:
      "Drip-irrigated horticulture that keeps tomatoes and peppers in the market through the dry season. Two boreholes, a 400,000-litre reservoir and a grading shed built for export packing.",
    image: images.fieldRows,
    stats: [
      { label: "Irrigated", value: "260 ha" },
      { label: "Packing shed", value: "900 m²" },
      { label: "Weekly output", value: "34 t" },
    ],
  },
  {
    slug: "obafemi-poultry",
    name: "Obafemi Poultry & Feed Mill",
    state: "Ogun",
    region: "South West",
    hectares: 180,
    established: 2019,
    focus: ["Broilers", "Layers", "Feed"],
    manager: "Segun Oduya",
    summary:
      "Eight broiler houses, two layer houses and a 6-tonne-per-hour feed mill that supplies our farms and verified marketplace vendors. Every batch carries its vaccination record.",
    image: images.poultry,
    stats: [
      { label: "Bird capacity", value: "48,000" },
      { label: "Feed mill", value: "6 t/hr" },
      { label: "Eggs weekly", value: "21,000" },
    ],
  },
  {
    slug: "ossiomo",
    name: "Ossiomo Fishery Cluster",
    state: "Delta",
    region: "South South",
    hectares: 90,
    established: 2021,
    focus: ["Catfish", "Tilapia", "Fingerlings"],
    manager: "Efe Okonkwo",
    summary:
      "Earthen ponds and concrete tanks with logged water quality, a hatchery for fingerlings and a smokehouse that turns surplus stock into vacuum-packed product with a longer shelf life.",
    image: images.fish,
    stats: [
      { label: "Ponds", value: "26" },
      { label: "Standing stock", value: "38 t" },
      { label: "Hatchery", value: "120k fry" },
    ],
  },
  {
    slug: "dawakin-grains",
    name: "Dawakin Grains Hub",
    state: "Kano",
    region: "North West",
    hectares: 240,
    established: 2022,
    focus: ["Maize", "Rice", "Warehousing"],
    manager: "Musa Ibrahim",
    summary:
      "A aggregation and warehousing hub that buys from 300+ smallholder farmers, cleans and grades grain, and holds stock for the marketplace under a first-expiry-first-out policy.",
    image: images.grainMarket,
    stats: [
      { label: "Farmers served", value: "312" },
      { label: "Warehouse", value: "2,400 t" },
      { label: "Turnover", value: "18 days" },
    ],
  },
];

export const testimonialList = [
  {
    quote:
      "Before this, our field records lived in three exercise books and a WhatsApp group. Now the supervisor logs a harvest on the plot, and by the time I reach the office the yield is already in the report.",
    name: "Hauwa Bello",
    role: "Farm manager",
    org: "Rigachikun, Kaduna",
  },
  {
    quote:
      "The part that matters to me is stock. We used to find shortages at the end of the month and argue about it. Every bag that moves now has a name and a time on it.",
    name: "Segun Oduya",
    role: "Operations lead",
    org: "Obafemi Poultry, Ogun",
  },
  {
    quote:
      "I sell eggs and broilers through the marketplace. Orders come in, I confirm, and the payout statement tells me exactly what commission was taken. No guessing.",
    name: "Ngozi Eze",
    role: "Verified vendor",
    org: "Agbeloba Poultry",
  },
] as const;

export const milestones = [
  {
    year: "2016",
    title: "One farm, one ledger",
    body: "OpticsView starts on 40 hectares in Awe, Oyo State, with a simple rule: every input and every harvest gets recorded.",
  },
  {
    year: "2018",
    title: "Irrigation and horticulture",
    body: "The Kaduna farm opens, taking tomato and pepper production into the dry season instead of ending it at the first rains.",
  },
  {
    year: "2020",
    title: "Offline-first operations",
    body: "Field teams move to a local-first app so records survive bad networks. The sync engine becomes the backbone of the platform.",
  },
  {
    year: "2022",
    title: "Warehousing and aggregation",
    body: "Dawakin hub opens, connecting 300+ smallholder farmers to grading, storage and a wider buyer base.",
  },
  {
    year: "2024",
    title: "Multi-vendor marketplace",
    body: "Verified farmers and agribusinesses begin selling alongside our own farms, with commissions and payouts tracked per order.",
  },
  {
    year: "2026",
    title: "Across six states",
    body: "18 farms, five divisions and a marketplace serving retail and wholesale buyers nationwide.",
  },
] as const;
