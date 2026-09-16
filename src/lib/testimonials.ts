export type Testimonial = {
  handle: string;
  quote: string;
  name?: string;
  href?: string;
  role?: string;
};

export function avatarUrl(handle: string) {
  return `https://unavatar.io/x/${handle.replace("@", "")}`;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    handle: "@sarahm",
    quote: "Our electricity bill dropped 70% in the first month. The installation team was professional and the whole process was seamless.",
    role: "Homeowner, Leeds",
  },
  {
    name: "James K.",
    handle: "@jamesk",
    quote: "Finally switched to solar with Reposit. The calculator showed exactly what we'd save, and it's been spot on.",
    role: "Homeowner, Manchester",
  },
  {
    name: "David L.",
    handle: "@davidl",
    quote: "Best decision we made for the house. Clean install, great monitoring, and the feed-in tariff pays us back every quarter.",
    role: "Homeowner, Bristol",
  },
  {
    name: "Emma T.",
    handle: "@emmat",
    quote: "Reposit made the whole process easy. From quote to installation in under two weeks. Our panels are performing above estimate.",
    role: "Homeowner, York",
  },
  {
    name: "Robert P.",
    handle: "@robertp",
    quote: "We were skeptical about solar in the UK climate. Six months in, we've exported more to the grid than expected.",
    role: "Homeowner, Edinburgh",
  },
  {
    name: "Michelle A.",
    handle: "@michellea",
    quote: "The battery storage means we run almost entirely on solar, even at night. Really impressed with the system.",
    role: "Homeowner, Nottingham",
  },
  {
    name: "Thomas H.",
    handle: "@thomash",
    quote: "Straightforward pricing, no hidden costs, and the team answered every question. Highly recommend Reposit.",
    role: "Homeowner, Cardiff",
  },
  {
    name: "Linda S.",
    handle: "@lindas",
    quote: "Our neighbours keep asking about our panels. The install looks clean and the app shows real-time generation.",
    role: "Homeowner, Belfast",
  },
];
