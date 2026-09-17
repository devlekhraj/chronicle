import type { ArticleSummary, ShortItem } from "@/types/content";

export const heroStory: ArticleSummary = {
  id: "hero-1",
  title: "Nepal's next rescue should not be a body recovery",
  slug: "nepals-next-rescue-should-not-be-a-body-recovery",
  excerpt:
    "As climate change makes disasters more frequent and deadly, Nepal must move beyond recovering victims after tragedy and build a modern fire and rescue service capable of saving lives during the critical golden hour.",
  categories: ["Climate", "Mountaineering"],
  publishedAt: "July 10, 2026",
  author: "Author name here",
  image: "/images/homepage/nepal-rescue.jpg",
};

export const featuredStory: ArticleSummary = {
  id: "featured-1",
  title: "Sherpas demand stricter safety standards as Everest commercialization peaks",
  slug: "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
  excerpt:
    "Veteran high-altitude guides call for systemic reform in summit permits and commercial expedition management following unprecedented congestion across the Khumbu Icefall.",
  categories: ["Expeditions", "Conservation"],
  publishedAt: "July 9, 2026",
  author: "Passang Sherpa",
  image: "/images/homepage/sherpa-featured.jpg",
};

export const latestStories: ArticleSummary[] = [
  {
    id: "latest-1",
    title: "Nepal signs rescue pact with airlines, drone and rafting groups for disaster response",
    slug: "nepal-signs-rescue-pact-with-airlines-drone-and-rafting-groups",
    publishedAt: "2 hours ago",
    categories: ["Expeditions"],
  },
  {
    id: "latest-2",
    title: "Nepal to review Everest summit event after corruption complaint",
    slug: "nepal-to-review-everest-summit-event-after-corruption-complaint",
    publishedAt: "4 hours ago",
    categories: ["Governance"],
  },
  {
    id: "latest-3",
    title: "Monsoon rains paralyse Nepal as landslides block key highways",
    slug: "monsoon-rains-paralyse-nepal-as-landslides-block-key-highways",
    publishedAt: "6 hours ago",
    categories: ["Environment"],
  },
  {
    id: "latest-4",
    title: "Flood washes away road to Ghandruk village, stranding hundreds of tourists",
    slug: "flood-washes-away-road-to-ghandruk-village-stranding-tourists",
    publishedAt: "8 hours ago",
    categories: ["Travel"],
  },
  {
    id: "latest-5",
    title: "Nepal signs rescue pact with airlines, drone and rafting groups for disaster response",
    slug: "nepal-signs-rescue-pact-disaster-response-round-2",
    publishedAt: "10 hours ago",
    categories: ["Expeditions"],
  },
  {
    id: "latest-6",
    title: "Nepal to review Everest summit event after corruption complaint",
    slug: "nepal-to-review-everest-summit-corruption-complaint",
    publishedAt: "12 hours ago",
    categories: ["Governance"],
  },
  {
    id: "latest-7",
    title: "Monsoon rains paralyse Nepal as landslides block key highways",
    slug: "monsoon-rains-paralyse-nepal-landslides-update",
    publishedAt: "14 hours ago",
    categories: ["Environment"],
  },
  {
    id: "latest-8",
    title: "Flood washes away road to Ghandruk village, stranding hundreds of tourists",
    slug: "flood-washes-away-road-ghandruk-update",
    publishedAt: "16 hours ago",
    categories: ["Travel"],
  },
];

export const expeditionStories: ArticleSummary[] = [
  {
    id: "exp-1",
    title: "The new high-altitude rope fixers taking control of 8,000m summits",
    slug: "rope-fixers-taking-control-of-8000m-summits",
    categories: ["Expeditions", "Mountaineering"],
    excerpt: "How indigenous mountain technicians are setting the safety standards and running the most technical ridge routes in the Himalaya.",
    publishedAt: "July 8, 2026",
    author: "Lakpa Nuru",
    image: "/images/articles/knife-edge-ridge.jpg",
  },
  {
    id: "exp-2",
    title: "Record summit push on K2 tests winter climbing boundaries",
    slug: "record-summit-push-on-k2-winter",
    categories: ["Expeditions"],
    excerpt: "Climbers endure minus forty temperatures on the Abruzzi Spur in a bid for seasonal alpine style climbing history.",
    publishedAt: "July 6, 2026",
    author: "Dawa Geljen",
    image: "/images/homepage/sherpa-featured.jpg",
  },
  {
    id: "exp-3",
    title: "Safety overhaul urged as helicopter rescues multiply in high Karakoram",
    slug: "safety-overhaul-urged-helicopter-rescues-karakoram",
    categories: ["Expeditions", "Safety"],
    excerpt: "Insurance underwriters demand new pilot protocols and GPS black-box loggers for Himalayan charter operators.",
    publishedAt: "July 4, 2026",
    author: "Bikash Sangroula",
    image: "/images/homepage/nepal-rescue.jpg",
  },
];

export const environmentStories: ArticleSummary[] = [
  {
    id: "env-1",
    title: "Imja glacial lake volume expands, accelerating flood mitigation work",
    slug: "imja-glacial-lake-expansion-accelerates-flood-work",
    categories: ["Environment", "Climate"],
    excerpt: "Engineers and military units install automated siphons and warning sirens along the Dudh Koshi river basin.",
    publishedAt: "July 7, 2026",
    author: "Dr. Shailendra Shrestha",
    image: "/images/articles/glacier-lake.jpg",
  },
  {
    id: "env-2",
    title: "Microplastics detected in freshly fallen snow above 7,000 meters",
    slug: "microplastics-detected-snow-above-7000-meters",
    categories: ["Environment", "Research"],
    excerpt: "Atmospheric scientists confirm synthetic fiber contamination carried on jet stream currents from global urban centers.",
    publishedAt: "July 5, 2026",
    author: "Maya Dewan",
    image: "/images/homepage/nepal-rescue.jpg",
  },
  {
    id: "env-3",
    title: "Unprecedented pre-monsoon heatwave triggers rockfall in Solukhumbu",
    slug: "heatwave-triggers-rockfall-in-solukhumbu",
    categories: ["Environment"],
    excerpt: "Thawing permafrost destabilizes traditional climbing trails, forcing route guides to reroute ancient transit passages.",
    publishedAt: "July 3, 2026",
    author: "Tenzi Sherpa",
    image: "/images/articles/knife-edge-ridge.jpg",
  },
];

export const conservationStories: ArticleSummary[] = [
  {
    id: "con-1",
    title: "Mustang snow leopard survey reveals rebounding predator population",
    slug: "mustang-snow-leopard-survey-rebounding-population",
    categories: ["Conservation", "Wildlife"],
    excerpt: "Camera trap grids deployed across the Upper Mustang valleys capture breeding pairs and healthy cub survival rates.",
    publishedAt: "July 8, 2026",
    author: "Prashant KC",
    image: "/images/articles/snow-leopard.jpg",
  },
  {
    id: "con-2",
    title: "Community forest groups in Annapurna buffer zone gain carbon credits",
    slug: "community-forest-groups-annapurna-carbon-credits",
    categories: ["Conservation", "Community"],
    excerpt: "Direct international payouts empower local indigenous councils to fund solar microgrids and anti-poaching patrols.",
    publishedAt: "July 6, 2026",
    author: "Ramesh Poudel",
    image: "/images/articles/glacier-lake.jpg",
  },
  {
    id: "con-3",
    title: "Red panda habitat corridors established in Eastern Nepal cloud forests",
    slug: "red-panda-habitat-corridors-eastern-nepal",
    categories: ["Conservation"],
    excerpt: "Private landholders partner with conservation biologists to plant native bamboo corridors connecting fragmented reserves.",
    publishedAt: "July 2, 2026",
    author: "Sunita Tamang",
    image: "/images/articles/snow-leopard.jpg",
  },
];

export const categoryStories: ArticleSummary[] = [
  ...expeditionStories,
  ...environmentStories,
  ...conservationStories,
];

export const shorts: ShortItem[] = [
  {
    id: "short-1",
    title: "High winds whip prayer flags on Renjo La pass at 5,360m",
    slug: "high-winds-whip-prayer-flags-renjo-la",
    image: "/images/homepage/short-prayer-flags.jpg",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    location: "Renjo La",
  },
  {
    id: "short-2",
    title: "Heavy yak caravan navigates sheer Khumbu cliff trail",
    slug: "heavy-yak-caravan-navigates-sheer-cliff-trail",
    image: "/images/homepage/short-yak-caravan.jpg",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    location: "Khumbu",
  },
  {
    id: "short-3",
    title: "Rope technicians traverse the knife-edge ridge on Ama Dablam",
    slug: "rope-technicians-traverse-knife-edge-ridge",
    image: "/images/articles/knife-edge-ridge.jpg",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    location: "Ama Dablam",
  },
  {
    id: "short-4",
    title: "Rapid thaw exposes deep crevasses beneath Khumbu icefall",
    slug: "rapid-thaw-exposes-deep-crevasses",
    image: "/images/articles/glacier-lake.jpg",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    location: "Khumbu Icefall",
  },
  {
    id: "short-5",
    title: "Sherpa guides celebrate successful acclimatization rotation",
    slug: "sherpa-guides-celebrate-successful-rotation",
    image: "/images/homepage/sherpa-featured.jpg",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    location: "Everest Base Camp",
  },
  {
    id: "short-6",
    title: "Morning light catches fresh snow above Gokyo's upper lakes",
    slug: "morning-light-catches-fresh-snow-above-gokyo-lakes",
    image: "/images/articles/glacier-lake.jpg",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    location: "Gokyo",
  },
  {
    id: "short-7",
    title: "Rescue helicopter lifts through broken monsoon cloud",
    slug: "rescue-helicopter-lifts-through-broken-monsoon-cloud",
    image: "/images/homepage/nepal-rescue.jpg",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    location: "Rasuwa",
  },
  {
    id: "short-8",
    title: "Snow leopard camera trap captures a midnight ridge crossing",
    slug: "snow-leopard-camera-trap-midnight-ridge-crossing",
    image: "/images/articles/snow-leopard.jpg",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    location: "Upper Mustang",
  },
];
