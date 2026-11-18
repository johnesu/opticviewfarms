/**
 * Site photography. Files live in `public/images` and are downloaded by
 * `scripts/download-images.mjs`. Attribution for each file is in
 * `lib/data/credits.json` and rendered on /credits.
 */
export const images = {
  hero: "/images/hero.jpg",
  fieldRows: "/images/fieldRows.jpg",
  aerial: "/images/aerial.jpg",
  farmer: "/images/farmer.jpg",
  greenhouse: "/images/greenhouse.jpg",
  poultry: "/images/poultry.jpg",
  cattle: "/images/cattle.jpg",
  fish: "/images/fish.jpg",
  eggs: "/images/eggs.jpg",
  tomatoes: "/images/tomatoes.jpg",
  maize: "/images/maize.jpg",
  rice: "/images/rice.jpg",
  yam: "/images/yam.jpg",
  plantain: "/images/plantain.jpg",
  fertilizer: "/images/fertilizer.jpg",
  smokedFish: "/images/smokedFish.jpg",
  grainMarket: "/images/grainMarket.jpg",
  soybean: "/images/soybean.jpg",
  marketAerial: "/images/marketAerial.jpg",
  pepper: "/images/pepper.jpg",
} as const;

export type ImageKey = keyof typeof images;
