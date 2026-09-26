import type { LayoutKey } from "./i18n";

// Images are self-hosted in /public/img (artist's impressions from the project's marketing set).
const img = (name: string) => `/img/${name}.jpg`;

export const hero = { src: img("hero"), srcMobile: img("hero-m"), w: 2400, h: 1350 };
export const introPhoto = img("drop-off");

// Floor plans are matched to layouts by the type code printed on each plan (checked against
// the Drive "CAPPELLA EMBASSY" plans: A1 2,260 · A2 2,260 · B 1,927 · C 1,625 · D1 1,152 · D2 1,109 · D3 1,119).
export type Layout = { key: LayoutKey; sqft: number; beds: string; baths: string; plans: string[]; special?: boolean };
export const layouts: Layout[] = [
  { key: "A1", sqft: 2260, beds: "3+1", baths: "4+1", plans: [img("plan-a1")] },
  { key: "A2", sqft: 2260, beds: "3+1", baths: "4+1", plans: [img("plan-a2")] },
  { key: "B", sqft: 1927, beds: "3+1", baths: "4+1", plans: [img("plan-b")] },
  { key: "C", sqft: 1625, beds: "3+1", baths: "4+1", plans: [img("plan-c")] },
  { key: "D1", sqft: 1152, beds: "2", baths: "2", plans: [img("plan-d1")] },
  { key: "D2", sqft: 1109, beds: "2", baths: "2", plans: [img("plan-d2")] },
  { key: "D3", sqft: 1119, beds: "2", baths: "2", plans: [img("plan-d3")] },
  { key: "BT", sqft: 3918, beds: "6+2", baths: "8+2", plans: [img("plan-bt")], special: true },
  { key: "PH", sqft: 10635, beds: "5+1", baths: "6+2", plans: [img("plan-ph1"), img("plan-ph2"), img("plan-ph3")], special: true },
];

export const showUnits = {
  C: ["c-living-sunset", "c-dining", "c-kitchen", "c-master-bedroom", "c-bathroom"].map(img),
  D2: ["d2-living-dusk", "d2-living-dining", "d2-kitchen", "d2-master-bedroom", "d2-wardrobe"].map(img),
};

// One photograph per facility zone, in the same order as t.fac.zones.
export const zonePhotos = [img("pool-pavilion"), img("badminton"), img("golf"), img("games"), img("sky-bar")];
export const facilitiesPlan = img("facilities-plan");
export const locationMap = img("location-map");

export const gallery: { key: string; src: string }[] = [
  { key: "aerial", src: img("aerial") },
  { key: "pool", src: img("pool-pavilion") },
  { key: "interior", src: img("interior") },
  { key: "gate", src: img("gate-night") },
  { key: "arrival", src: img("arrival") },
  { key: "lobby", src: img("lift-lobby") },
  { key: "deck", src: img("pool-deck") },
  { key: "lounge", src: img("lounge") },
  { key: "skybar", src: img("sky-bar") },
  { key: "gym", src: img("gym") },
  { key: "golf", src: img("golf") },
  { key: "theatre", src: img("theatre") },
  { key: "games", src: img("games") },
  { key: "kids", src: img("kids-zone") },
  { key: "hall", src: img("hall") },
  { key: "playground", src: img("playground") },
];
