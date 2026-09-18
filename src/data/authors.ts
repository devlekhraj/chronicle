import type { AuthorProfile } from "@/types/content";
import { articleRegistry, type ArticleDetail } from "@/data/articles";

export const authorRegistry: Record<string, AuthorProfile> = {
  "nima-sherpa": {
    slug: "nima-sherpa",
    name: "Nima Sherpa",
    role: "Senior Correspondent",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: "Reporting from the Himalayas on expeditions, climate, communities, conservation and mountain culture.",
    beats: ["Mountaineering", "Environment", "Conservation"],
    location: "Kathmandu, Nepal",
    storyCount: 24,
    sinceYear: 2019,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:desk@everestchronicle.com",
    },
  },
  "bikash-sangroula": {
    slug: "bikash-sangroula",
    name: "Bikash Sangroula",
    role: "Senior Climate & Field Correspondent",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: "Bikash Sangroula has spent over 15 years investigating Himalayan disaster policy, high-altitude search-and-rescue, and alpine environmental degradation.",
    beats: ["Climate Disasters", "Search & Rescue", "Environmental Policy"],
    location: "Kathmandu, Nepal",
    storyCount: 38,
    sinceYear: 2016,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:bikash@everestchronicle.com",
    },
  },
  "pasang-lhamu-sherpa": {
    slug: "pasang-lhamu-sherpa",
    name: "Pasang Lhamu Sherpa",
    role: "Emergency Response Specialist & Photojournalist",
    avatar: "/images/articles/knife-edge-ridge.jpg",
    bio: "Pasang Lhamu covers search-and-rescue logistics, glacial flood mitigation, and community-led emergency response across the central Himalaya.",
    beats: ["Emergency Response", "Photojournalism", "Glacial Hazards"],
    location: "Namche Bazaar, Nepal",
    storyCount: 19,
    sinceYear: 2020,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:pasang@everestchronicle.com",
    },
  },
  "passang-sherpa": {
    slug: "passang-sherpa",
    name: "Passang Sherpa",
    role: "High-Altitude Mountain Guide & Correspondent",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: "Passang has summited Everest seven times and frequently documents structural changes in the Khumbu Icefall for international glaciology teams.",
    beats: ["Expeditions", "Route Fixing", "Icefall Safety"],
    location: "Khumjung, Solukhumbu",
    storyCount: 22,
    sinceYear: 2018,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:passang@everestchronicle.com",
    },
  },
  "dawa-geljen": {
    slug: "dawa-geljen",
    name: "Dawa Geljen",
    role: "Expeditions Editor",
    avatar: "/images/articles/knife-edge-ridge.jpg",
    bio: "Dawa Geljen covers Himalayan mountaineering labor standards, summit economics, regulatory permits, and indigenous community leadership.",
    beats: ["Mountaineering", "Summit Economics", "Sherpa Rights"],
    location: "Kathmandu, Nepal",
    storyCount: 42,
    sinceYear: 2017,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:dawa@everestchronicle.com",
    },
  },
  "lakpa-nuru": {
    slug: "lakpa-nuru",
    name: "Lakpa Nuru",
    role: "Lead Ridge Specialist & Mountain Photojournalist",
    avatar: "/images/articles/knife-edge-ridge.jpg",
    bio: "Lakpa Nuru is a technical climber and visual journalist based in Namche Bazaar documenting extreme alpine ascents and rope-fixing operations.",
    beats: ["8,000m Ascents", "Alpine Technicality", "Ridge Safety"],
    location: "Namche Bazaar, Nepal",
    storyCount: 17,
    sinceYear: 2021,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:lakpa@everestchronicle.com",
    },
  },
  "dr-shailendra-shrestha": {
    slug: "dr-shailendra-shrestha",
    name: "Dr. Shailendra Shrestha",
    role: "Contributing Glaciologist",
    avatar: "/images/articles/glacier-lake.jpg",
    bio: "Dr. Shailendra Shrestha studies glacial lake outburst floods (GLOFs), permafrost degradation, and high mountain hydrological hazard management.",
    beats: ["Glaciology", "GLOF Mitigation", "Hydrology"],
    location: "Kathmandu, Nepal",
    storyCount: 29,
    sinceYear: 2015,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:shailendra@everestchronicle.com",
    },
  },
  "maya-dewan": {
    slug: "maya-dewan",
    name: "Maya Dewan",
    role: "Senior Atmospheric & Environmental Scientist",
    avatar: "/images/articles/glacier-lake.jpg",
    bio: "Maya Dewan reports on transboundary aerosol pollution, black carbon deposition on Himalayan peaks, and high-altitude alpine ecology.",
    beats: ["Atmospheric Science", "Pollution Dispersion", "Ecology"],
    location: "Pokhara, Nepal",
    storyCount: 21,
    sinceYear: 2020,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:maya@everestchronicle.com",
    },
  },
  "tenzi-sherpa": {
    slug: "tenzi-sherpa",
    name: "Tenzi Sherpa",
    role: "High-Altitude Route Reporter",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: "Tenzi Sherpa monitors seasonal trail conditions, geological shifts, and moraine stability across the Upper Khumbu and Rolwaling valleys.",
    beats: ["Khumbu Trails", "Geological Hazards", "Trekking Logistics"],
    location: "Lukla, Solukhumbu",
    storyCount: 16,
    sinceYear: 2021,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:tenzi@everestchronicle.com",
    },
  },
  "prashant-kc": {
    slug: "prashant-kc",
    name: "Prashant KC",
    role: "Wildlife Biologist & Snow Leopard Researcher",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: "Prashant KC has documented snow leopard corridors, predator-prey dynamics, and community-managed livestock insurance programs across the trans-Himalaya for 12 years.",
    beats: ["Wildlife Biology", "Snow Leopards", "Predator Conservation"],
    location: "Mustang, Nepal",
    storyCount: 18,
    sinceYear: 2019,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:prashant@everestchronicle.com",
    },
  },
  "ramesh-poudel": {
    slug: "ramesh-poudel",
    name: "Ramesh Poudel",
    role: "Climate Adaptation & Forestry Analyst",
    avatar: "/images/homepage/nepal-rescue.jpg",
    bio: "Ramesh Poudel writes on indigenous community forestry, carbon offset financing, and renewable energy microgrids across remote mountain districts.",
    beats: ["Community Forestry", "Carbon Markets", "Rural Energy"],
    location: "Kathmandu, Nepal",
    storyCount: 25,
    sinceYear: 2018,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:ramesh@everestchronicle.com",
    },
  },
  "sunita-tamang": {
    slug: "sunita-tamang",
    name: "Sunita Tamang",
    role: "Ecologist & Indigenous Conservationist",
    avatar: "/images/homepage/nepal-rescue.jpg",
    bio: "Sunita Tamang writes on biodiversity loss, endangered alpine flora, and traditional ecological knowledge among mountain communities.",
    beats: ["Biodiversity", "Traditional Knowledge", "High Altitude Flora"],
    location: "Langtang Valley, Nepal",
    storyCount: 20,
    sinceYear: 2020,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:sunita@everestchronicle.com",
    },
  },
  "karma-gurung": {
    slug: "karma-gurung",
    name: "Karma Gurung",
    role: "Annapurna & Western Himalayas Specialist",
    avatar: "/images/articles/knife-edge-ridge.jpg",
    bio: "Karma Gurung reports on trekking safety, trail conditions, and cultural heritage preservation throughout the Annapurna, Manaslu, and Nar-Phu circuits.",
    beats: ["Annapurna Basin", "Trekking Safety", "Tibetan Culture"],
    location: "Manang, Nepal",
    storyCount: 26,
    sinceYear: 2017,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:karma@everestchronicle.com",
    },
  },
  "mingma-sherpa": {
    slug: "mingma-sherpa",
    name: "Mingma Sherpa",
    role: "High-Altitude Environmental Journalist",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: "Mingma Sherpa reports on waste management, renewable energy adoption, and sustainable alpine tourism across Sagarmatha National Park.",
    beats: ["Waste Management", "Solar Microgrids", "Sustainable Tourism"],
    location: "Namche Bazaar, Nepal",
    storyCount: 23,
    sinceYear: 2019,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:mingma@everestchronicle.com",
    },
  },
  "tashi-wangchuk": {
    slug: "tashi-wangchuk",
    name: "Tashi Wangchuk",
    role: "Documentary Filmmaker",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: "Tashi Wangchuk directs visual essays and independent short documentaries on indigenous high-altitude Himalayan cultures.",
    beats: ["Documentary", "Culture", "Visual Dispatches"],
    location: "Gokyo, Solukhumbu",
    storyCount: 14,
    sinceYear: 2021,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:tashi@everestchronicle.com",
    },
  },
  "tenzing-norbu": {
    slug: "tenzing-norbu",
    name: "Tenzing Norbu",
    role: "Visual Journalist",
    avatar: "/images/articles/knife-edge-ridge.jpg",
    bio: "Tenzing Norbu specializes in photo essays across western Nepal's remote trans-Himalayan valleys including Dolpo, Humla, and Mugu.",
    beats: ["Photo Essays", "Western Himalaya", "Nomadic Caravans"],
    location: "Upper Dolpo, Nepal",
    storyCount: 15,
    sinceYear: 2021,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:tenzing@everestchronicle.com",
    },
  },
  "everest-chronicle-desk": {
    slug: "everest-chronicle-desk",
    name: "Everest Chronicle Editorial Desk",
    role: "Editorial Team",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: "Everest Chronicle delivers independent field reporting, scientific investigations, and visual storytelling from Nepal and the high mountains.",
    beats: ["Investigative", "Breaking News", "Himalayan Science"],
    location: "Kathmandu, Nepal",
    storyCount: 56,
    sinceYear: 2015,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:desk@everestchronicle.com",
    },
  },
};

export function authorSlugFromName(name: string): string {
  if (!name) return "everest-chronicle-desk";
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/^dr\.\s*/i, "dr-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return authorRegistry[slug] ? slug : slug;
}

export function getAuthorBySlug(slug: string): AuthorProfile {
  if (authorRegistry[slug]) {
    return authorRegistry[slug];
  }
  // Fallback author for any slug
  const titleName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    slug,
    name: titleName,
    role: "Field Correspondent",
    avatar: "/images/homepage/sherpa-featured.jpg",
    bio: `${titleName} reports on alpine expeditions, environmental shifts, and community resilience in Nepal and the high Himalayas.`,
    beats: ["Mountaineering", "Environment", "Conservation"],
    location: "Kathmandu, Nepal",
    storyCount: 12,
    sinceYear: 2020,
    socials: {
      twitter: "https://twitter.com/everestchron",
      linkedin: "https://linkedin.com",
      email: "mailto:desk@everestchronicle.com",
    },
  };
}

export function getAuthorArticles(authorSlug: string): ArticleDetail[] {
  const author = getAuthorBySlug(authorSlug);
  const targetName = author.name.toLowerCase();
  const allArticles = Object.values(articleRegistry);

  // Match articles where author is in the authors list
  const matched = allArticles.filter((art) =>
    art.authors?.some(
      (a) =>
        a.name.toLowerCase() === targetName ||
        (a.slug && a.slug === authorSlug) ||
        authorSlugFromName(a.name) === authorSlug
    )
  );

  // If specific matched articles are found, return them.
  // If author has few or no matches (e.g. nima-sherpa demo profile), supplement with representative articles
  if (matched.length >= 13) {
    return matched;
  }

  const existingSlugs = new Set(matched.map((m) => m.slug));
  const supplemented = [...matched];

  for (const art of allArticles) {
    if (!existingSlugs.has(art.slug)) {
      supplemented.push(art);
      existingSlugs.add(art.slug);
      if (supplemented.length >= 13) break;
    }
  }

  return supplemented;
}
