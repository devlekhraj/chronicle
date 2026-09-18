import type { AuthorMeta, SeoMeta } from "@/types/content";

export type ArticleBodyBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | {
      type: "imageGrid";
      images: { src?: string; alt: string }[];
      caption?: string;
    }
  | {
      type: "wideImage";
      image?: { src?: string; alt: string };
      caption?: string;
      credit?: string;
    }
  | {
      type: "fullWideImage";
      image?: { src?: string; alt: string };
      caption?: string;
      credit?: string;
    };

export interface ArticleDetail {
  id?: string;
  title: string;
  slug: string;
  dek: string;
  categories: { title: string; slug: string }[];
  tags?: { title: string; slug: string }[];
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  wordCount?: number;
  authors: AuthorMeta[];
  image?: string;
  caption: string;
  credit?: string;
  body: ArticleBodyBlock[];
  meta?: SeoMeta;
  relatedSlugs?: string[];
}

export const articleRegistry: Record<string, ArticleDetail> = {
  "nepals-next-rescue-should-not-be-a-body-recovery": {
    id: "art-01",
    title: "Nepal's next rescue should not be a body recovery",
    slug: "nepals-next-rescue-should-not-be-a-body-recovery",
    dek: "As climate change makes disasters more frequent and deadly, Nepal must move beyond recovering victims after tragedy and build a modern fire and rescue service capable of saving lives during the critical golden hour.",
    categories: [
      { title: "Climate", slug: "environment" },
      { title: "Mountaineering", slug: "expeditions" },
    ],
    tags: [
      { title: "Disaster Response", slug: "disaster-response" },
      { title: "Rasuwa", slug: "rasuwa" },
      { title: "Search & Rescue", slug: "search-rescue" },
    ],
    publishedAt: "July 10, 2026",
    updatedAt: "July 11, 2026",
    readTime: "6 min read",
    wordCount: 1420,
    authors: [
      {
        name: "Bikash Sangroula",
        role: "Senior Climate & Field Correspondent",
        avatar: "/images/homepage/sherpa-featured.jpg",
        bio: "Bikash Sangroula has spent over 15 years investigating Himalayan disaster policy, high-altitude search-and-rescue, and alpine environmental degradation.",
      },
      {
        name: "Pasang Lhamu Sherpa",
        role: "Emergency Response Specialist & Photojournalist",
        avatar: "/images/articles/knife-edge-ridge.jpg",
        bio: "Pasang Lhamu covers search-and-rescue logistics, glacial flood mitigation, and community-led emergency response across the central Himalaya.",
      },
    ],
    image: "/images/homepage/nepal-rescue.jpg",
    caption:
      "Rescue personnel and local volunteers navigate swollen floodwaters along the Trishuli River basin following unexpected overnight flash floods.",
    credit: "Photo: Pasang Lhamu / Everest Chronicle",
    meta: {
      metaTitle: "Nepal's Next Rescue Should Not Be A Body Recovery | Everest Chronicle",
      metaDescription: "Nepal must overhaul its emergency response infrastructure to save lives during the golden hour of climate disasters.",
      canonicalUrl: "https://everestchronicle.com/nepals-next-rescue-should-not-be-a-body-recovery",
      ogImage: "/images/homepage/nepal-rescue.jpg",
      keywords: ["Nepal Rescue", "Himalayan Disaster", "Climate Emergency", "Search and Rescue", "Golden Hour"],
    },
    relatedSlugs: [
      "the-vanishing-glaciers-climbing-routes",
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "rope-fixers-taking-control-of-8000m-summits",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "safety-overhaul-urged-helicopter-rescues-karakoram",
      "mustang-snow-leopard-survey-rebounding-population",
    ],
    body: [
      { type: "heading", text: "Losing the Crucial Golden Hour" },
      {
        type: "paragraph",
        text: "Nepal has become accustomed to counting its dead after disasters. Every monsoon brings familiar scenes: villages cut off by landslides, families stranded on rooftops by swollen rivers, vehicles buried beneath debris and helicopters scrambling to reach isolated communities. The country has shown remarkable resilience in coping with tragedy. Yet resilience should never be mistaken for preparedness.",
      },
      {
        type: "paragraph",
        text: "As climate change intensifies extreme weather and Nepal's towns and cities expand into increasingly vulnerable terrain, the country's greatest challenge is no longer responding to disasters after they occur. It is ensuring that more people survive them during the critical golden hour.",
      },
      {
        type: "wideImage",
        image: {
          src: "/images/homepage/nepal-rescue.jpg",
          alt: "Emergency personnel crossing river terrain with rescue lines",
        },
        caption: "First responders coordinating river crossings in high-water conditions in the central Nepal hill districts.",
        credit: "Photo: Mingma Norbu / Everest Chronicle",
      },
      { type: "heading", text: "Moving from Improvisation to Professional Coordination" },
      {
        type: "paragraph",
        text: "Having spent the past 25 years working in Nepal's tourism and mountaineering sector, I have participated in high-altitude rescues, technical mountain operations and emergency response missions across some of the Himalayas' most demanding landscapes. I have worked with thousands of trekkers and climbers from around the world and taken part in numerous search-and-rescue operations.",
      },
      {
        type: "paragraph",
        text: "Too often in Nepal, what begins as a rescue mission ends as a body recovery. The primary reason is not a lack of courage among field workers. Rather, it is the systemic delay in mobilizing coordinated logistics, equipment, and medical triage to remote incident sites.",
      },
      {
        type: "imageGrid",
        images: [
          {
            src: "/images/homepage/nepal-rescue.jpg",
            alt: "Helicopter deployment in mountainous monsoon weather",
          },
          {
            src: "/images/articles/glacier-lake.jpg",
            alt: "A swollen Himalayan river valley after heavy rain",
          },
          {
            src: "/images/articles/knife-edge-ridge.jpg",
            alt: "Technical rope rescuers traversing challenging terrain",
          },
          {
            src: "/images/homepage/sherpa-featured.jpg",
            alt: "Local community volunteers coordinating logistics",
          },
        ],
        caption:
          "Field operations require integrated ground teams, aerial reconnaissance, and rapid medical evacuation to make early interventions count.",
      },
      {
        type: "paragraph",
        text: "The goal must be definitive: when the next landslide blocks a vital transit corridor, when a sudden outburst flood sweeps a settlement at night, or when an earthquake strikes mountain villages, Nepal should not have to wait for improvised civilian heroics. It needs an integrated, fully funded search-and-rescue service ready to deploy in minutes.",
      },
    ],
  },

  "the-vanishing-glaciers-climbing-routes": {
    id: "art-02",
    title: "The vanishing glaciers: How warming is reshaping high-altitude climbing routes",
    slug: "the-vanishing-glaciers-climbing-routes",
    dek: "Decades of receding ice have uncovered unstable scree and opened deadly new chasms on classic Everest routes, forcing veteran Sherpas to rewrite the rules of Himalayan ascent.",
    categories: [
      { title: "Environment", slug: "environment" },
      { title: "Expeditions", slug: "expeditions" },
    ],
    tags: [
      { title: "Glaciology", slug: "glaciology" },
      { title: "Everest", slug: "everest" },
      { title: "Climate Change", slug: "climate-change" },
    ],
    publishedAt: "July 9, 2026",
    updatedAt: "July 10, 2026",
    readTime: "5 min read",
    wordCount: 1180,
    authors: [
      {
      name: "Passang Sherpa",
      role: "High-Altitude Mountain Guide & Correspondent",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Passang has summited Everest seven times and frequently documents structural changes in the Khumbu Icefall for international glaciology teams.",
      },
    ],
    image: "/images/articles/glacier-lake.jpg",
    caption: "The lower Khumbu glacier where moraines have thinned into unstable gravel ridges over the past three decades.",
    credit: "Photo: Passang Sherpa / Everest Chronicle",
    meta: {
      metaTitle: "The Vanishing Glaciers: Reshaping Himalayan Routes | Everest Chronicle",
      metaDescription: "Himalayan warming has destabilized classical climbing routes on Mount Everest and K2, forcing mountain guides to adapt.",
      canonicalUrl: "https://everestchronicle.com/the-vanishing-glaciers-climbing-routes",
      ogImage: "/images/articles/glacier-lake.jpg",
      keywords: ["Glaciers", "Khumbu Icefall", "Everest Warming", "Alpine Climbing", "Sherpa Guides"],
    },
    relatedSlugs: [
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "rope-fixers-taking-control-of-8000m-summits",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "record-summit-push-on-k2-winter",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "heatwave-triggers-rockfall-in-solukhumbu",
    ],
    body: [
      { type: "heading", text: "The Thawing Backbone of the High Peaks" },
      {
        type: "paragraph",
        text: "On routes that once offered predictable snow bridges and stable ladders, guides now find exposed moraine, thin ice and newly opened crevasses. The transformation is no longer subtle to the people who work in the mountains every season.",
      },
      {
        type: "wideImage",
        image: {
          src: "/images/articles/knife-edge-ridge.jpg",
          alt: "Climbers navigating sharp icy knife-edge ridge",
        },
        caption: "Climbing teams increasingly depend on dynamic anchor placements along degrading ridge crests.",
        credit: "Photo: Dawa Geljen / Everest Chronicle",
      },
      { type: "heading", text: "Changing Seasonality and New Hazards" },
      {
        type: "paragraph",
        text: "Veteran route builders say the rhythm of the climb has changed. Camps move earlier, ladders are reset more frequently and decisions that once depended on weather alone now require constant reading of the ice beneath their feet.",
      },
      {
        type: "paragraph",
        text: "Scientists tracking Himalayan glaciers warn that the danger extends beyond expeditions. Glacial lake growth, permafrost thaw and unstable slopes are reshaping valleys where tourism, farming and hydropower all depend on mountain stability.",
      },
    ],
  },

  "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks": {
    id: "art-03",
    title: "Sherpas demand stricter safety standards as Everest commercialization peaks",
    slug: "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
    dek: "Veteran high-altitude guides call for systemic reform in summit permits and commercial expedition management following unprecedented congestion across the Khumbu Icefall.",
    categories: [
      { title: "Expeditions", slug: "expeditions" },
      { title: "Conservation", slug: "conservation" },
    ],
    tags: [
      { title: "Sherpa Rights", slug: "sherpa-rights" },
      { title: "Everest Permitting", slug: "everest-permitting" },
    ],
    publishedAt: "July 9, 2026",
    readTime: "7 min read",
    wordCount: 1650,
    authors: [
      {
      name: "Dawa Geljen",
      role: "Expeditions Editor",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Dawa Geljen covers Himalayan mountaineering labor standards, summit economics, and community leadership.",
      },
    ],
    image: "/images/homepage/sherpa-featured.jpg",
    caption: "Senior Sherpa guides confer at Everest Base Camp regarding weather windows and route bottlenecks.",
    credit: "Photo: Lakpa Nuru / Everest Chronicle",
    meta: {
      metaTitle: "Sherpas Demand Stricter Safety Standards on Everest | Everest Chronicle",
      metaDescription: "Indigenous guides call for urgent reforms in Everest commercial permitting to reduce deadly summit bottlenecks.",
      canonicalUrl: "https://everestchronicle.com/sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      ogImage: "/images/homepage/sherpa-featured.jpg",
      keywords: ["Sherpa Safety", "Everest Reform", "Khumbu Bottleneck", "High Altitude Labor"],
    },
    relatedSlugs: [
      "rope-fixers-taking-control-of-8000m-summits",
      "the-vanishing-glaciers-climbing-routes",
      "record-summit-push-on-k2-winter",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "safety-overhaul-urged-helicopter-rescues-karakoram",
      "nepal-to-review-everest-summit-event-after-corruption-complaint",
    ],
    body: [
      { type: "heading", text: "Gridlock in the Death Zone" },
      {
        type: "paragraph",
        text: "With record numbers of summit permits issued each spring, seasoned expedition leaders are warning that the margins of safety have dwindled dangerously. Hours spent queued in freezing winds above 8,000 meters deplete supplemental oxygen supplies and increase frostbite and cerebral edema risks.",
      },
      {
        type: "paragraph",
        text: "The Nepal National Mountain Guide Association (NNMGA) has submitted a formal petition calling for mandatory qualification benchmarks for clients and an enforceable ceiling on annual permits.",
      },
    ],
  },

  "rope-fixers-taking-control-of-8000m-summits": {
    id: "art-04",
    title: "The new high-altitude rope fixers taking control of 8,000m summits",
    slug: "rope-fixers-taking-control-of-8000m-summits",
    dek: "Indigenous mountain technicians are setting safety standards and running the most technical ridge routes in the Himalaya.",
    categories: [
      { title: "Expeditions", slug: "expeditions" },
      { title: "Mountaineering", slug: "mountaineering" },
    ],
    tags: [
      { title: "Rope Fixing", slug: "rope-fixing" },
      { title: "Technical Climbing", slug: "technical-climbing" },
    ],
    publishedAt: "July 8, 2026",
    readTime: "5 min read",
    wordCount: 1100,
    authors: [
      {
      name: "Lakpa Nuru",
      role: "Climbing Reporter",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Lakpa Nuru is a technical climber and mountain photojournalist based in Namche Bazaar.",
      },
    ],
    image: "/images/articles/knife-edge-ridge.jpg",
    caption: "Rope technicians setting fixed lines across high-angle snow and rock on Ama Dablam.",
    credit: "Photo: Lakpa Nuru / Everest Chronicle",
    meta: {
      metaTitle: "High-Altitude Rope Fixers Leading 8,000m Summits | Everest Chronicle",
      metaDescription: "How indigenous mountain technicians took direct ownership of the most hazardous technical work on Himalayan giants.",
      canonicalUrl: "https://everestchronicle.com/rope-fixers-taking-control-of-8000m-summits",
      ogImage: "/images/articles/knife-edge-ridge.jpg",
      keywords: ["Rope Fixers", "8000m Peaks", "Sherpa Climbing", "Ama Dablam", "Alpine Safety"],
    },
    relatedSlugs: [
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "record-summit-push-on-k2-winter",
      "the-vanishing-glaciers-climbing-routes",
      "safety-overhaul-urged-helicopter-rescues-karakoram",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "imja-glacial-lake-expansion-accelerates-flood-work",
    ],
    body: [
      { type: "heading", text: "Leading from the Sharp End" },
      {
        type: "paragraph",
        text: "A new generation of high-altitude technicians is redefining expedition work above 8,000 meters. Their labor is technical, dangerous and increasingly central to the safety of every climber who follows.",
      },
      {
        type: "paragraph",
        text: "Instead of working anonymously behind foreign expedition brands, Nepali rope teams are forming their own companies, training younger climbers and negotiating directly with operators.",
      },
    ],
  },

  "record-summit-push-on-k2-winter": {
    id: "art-05",
    title: "Record summit push on K2 tests winter climbing boundaries",
    slug: "record-summit-push-on-k2-winter",
    dek: "Climbers endure minus forty temperatures on the Abruzzi Spur in a bid for seasonal alpine style climbing history.",
    categories: [{ title: "Expeditions", slug: "expeditions" }],
    publishedAt: "July 6, 2026",
    readTime: "6 min read",
    wordCount: 1320,
    authors: [
      {
      name: "Dawa Geljen",
      role: "Expeditions Editor",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Dawa Geljen covers Himalayan mountaineering labor standards and extreme ascents.",
      },
    ],
    image: "/images/homepage/sherpa-featured.jpg",
    caption: "A winter team prepares high-altitude gear before making a dash toward the Bottleneck.",
    credit: "Photo: Everest Chronicle Archive",
    meta: {
      metaTitle: "Record Summit Push on K2 Tests Winter Boundaries | Everest Chronicle",
      metaDescription: "Extreme sub-zero ascents on the Savage Mountain push human endurance and alpine technique to the limits.",
      canonicalUrl: "https://everestchronicle.com/record-summit-push-on-k2-winter",
      ogImage: "/images/homepage/sherpa-featured.jpg",
      keywords: ["K2 Winter", "Abruzzi Spur", "High Altitude", "Karakoram", "Extreme Climbing"],
    },
    relatedSlugs: [
      "rope-fixers-taking-control-of-8000m-summits",
      "safety-overhaul-urged-helicopter-rescues-karakoram",
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "the-vanishing-glaciers-climbing-routes",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "imja-glacial-lake-expansion-accelerates-flood-work",
    ],
    body: [
      { type: "heading", text: "The Coldest Challenge in the Karakoram" },
      {
        type: "paragraph",
        text: "Winds howl past 100 kilometers per hour across the upper pyramid of K2 as winter climbing teams wait out savage storm cycles at Camp 3.",
      },
    ],
  },

  "safety-overhaul-urged-helicopter-rescues-karakoram": {
    id: "art-06",
    title: "Safety overhaul urged as helicopter rescues multiply in high Karakoram",
    slug: "safety-overhaul-urged-helicopter-rescues-karakoram",
    dek: "Insurance underwriters demand new pilot protocols and GPS black-box loggers for Himalayan charter operators.",
    categories: [
      { title: "Expeditions", slug: "expeditions" },
      { title: "Safety", slug: "safety" },
    ],
    publishedAt: "July 4, 2026",
    readTime: "5 min read",
    wordCount: 1050,
    authors: [
      {
      name: "Bikash Sangroula",
      role: "Senior Climate & Field Correspondent",
      avatar: "/images/homepage/nepal-rescue.jpg",
      bio: "Bikash Sangroula covers aviation safety and high-altitude emergency operations.",
      },
    ],
    image: "/images/homepage/nepal-rescue.jpg",
    caption: "A high-altitude rotorcraft lands on an improvised mountain helipad in challenging air density.",
    credit: "Photo: Nepal Civil Aviation Archive",
    meta: {
      metaTitle: "Safety Overhaul Urged for Helicopter Rescues | Everest Chronicle",
      metaDescription: "A surge in high-altitude charter rescues prompts regulators to introduce stricter flight standards.",
      canonicalUrl: "https://everestchronicle.com/safety-overhaul-urged-helicopter-rescues-karakoram",
      ogImage: "/images/homepage/nepal-rescue.jpg",
      keywords: ["Helicopter Rescue", "Aviation Safety", "Karakoram", "Himalayan Rescues"],
    },
    relatedSlugs: [
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "rope-fixers-taking-control-of-8000m-summits",
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "record-summit-push-on-k2-winter",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "the-vanishing-glaciers-climbing-routes",
    ],
    body: [
      { type: "heading", text: "Operating in Extreme Density Altitude" },
      {
        type: "paragraph",
        text: "Flying above 6,000 meters demands extraordinary pilot skill, where thin air reduces rotor lift to razor-thin margins. A series of near-misses has prompted insurers to push for new flight-data recorders.",
      },
    ],
  },

  "imja-glacial-lake-expansion-accelerates-flood-work": {
    id: "art-07",
    title: "Imja glacial lake volume expands, accelerating flood mitigation work",
    slug: "imja-glacial-lake-expansion-accelerates-flood-work",
    dek: "Engineers and military units install automated siphons and warning sirens along the Dudh Koshi river basin.",
    categories: [
      { title: "Environment", slug: "environment" },
      { title: "Climate", slug: "environment" },
    ],
    publishedAt: "July 7, 2026",
    readTime: "6 min read",
    wordCount: 1290,
    authors: [
      {
      name: "Dr. Shailendra Shrestha",
      role: "Contributing Glaciologist",
      avatar: "/images/articles/glacier-lake.jpg",
      bio: "Dr. Shailendra Shrestha studies glacial lake outburst floods (GLOFs) and high mountain hydrological hazard management.",
      },
    ],
    image: "/images/articles/glacier-lake.jpg",
    caption: "The turquoise expanse of Imja Tsho in the Everest region, where water levels are monitored around the clock.",
    credit: "Photo: Dr. Shailendra Shrestha / Everest Chronicle",
    meta: {
      metaTitle: "Imja Glacial Lake Volume Expands | Everest Chronicle",
      metaDescription: "Rapid glacier melt swells Imja Tsho, prompting emergency siphoning and flood mitigation down the Dudh Koshi river.",
      canonicalUrl: "https://everestchronicle.com/imja-glacial-lake-expansion-accelerates-flood-work",
      ogImage: "/images/articles/glacier-lake.jpg",
      keywords: ["Imja Lake", "GLOF", "Dudh Koshi", "Glacial Flood", "Climate Mitigation"],
    },
    relatedSlugs: [
      "the-vanishing-glaciers-climbing-routes",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "microplastics-detected-snow-above-7000-meters",
      "heatwave-triggers-rockfall-in-solukhumbu",
      "community-forest-groups-annapurna-carbon-credits",
      "mustang-snow-leopard-survey-rebounding-population",
    ],
    body: [
      { type: "heading", text: "Containing the Water Behind the Moraine" },
      {
        type: "paragraph",
        text: "Imja Tsho did not exist sixty years ago; today it holds millions of cubic meters of water held back by loose moraine deposits. With temperatures climbing steadily, mitigating lake pressure has become an urgent civil priority.",
      },
    ],
  },

  "microplastics-detected-snow-above-7000-meters": {
    id: "art-08",
    title: "Microplastics detected in freshly fallen snow above 7,000 meters",
    slug: "microplastics-detected-snow-above-7000-meters",
    dek: "Atmospheric scientists confirm synthetic fiber contamination carried on jet stream currents from global urban centers.",
    categories: [
      { title: "Environment", slug: "environment" },
      { title: "Research", slug: "environment" },
    ],
    publishedAt: "July 5, 2026",
    readTime: "4 min read",
    wordCount: 950,
    authors: [
      {
      name: "Maya Dewan",
      role: "Science Reporter",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Maya Dewan reports on atmospheric chemistry, pollution dispersion, and alpine ecology.",
      },
    ],
    image: "/images/homepage/nepal-rescue.jpg",
    caption: "Sampling equipment placed on high snowy plateaus to trap particulate matter from prevailing air masses.",
    credit: "Photo: Maya Dewan / Everest Chronicle",
    meta: {
      metaTitle: "Microplastics Detected in High Himalayan Snow | Everest Chronicle",
      metaDescription: "Global atmospheric transport brings synthetic microfibers to the highest peaks on Earth.",
      canonicalUrl: "https://everestchronicle.com/microplastics-detected-snow-above-7000-meters",
      ogImage: "/images/homepage/nepal-rescue.jpg",
      keywords: ["Microplastics", "Everest Snow", "Atmospheric Pollution", "Third Pole"],
    },
    relatedSlugs: [
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "the-vanishing-glaciers-climbing-routes",
      "heatwave-triggers-rockfall-in-solukhumbu",
      "mustang-snow-leopard-survey-rebounding-population",
      "community-forest-groups-annapurna-carbon-credits",
      "nepals-next-rescue-should-not-be-a-body-recovery",
    ],
    body: [
      { type: "heading", text: "Purity of the High Peaks Challenged" },
      {
        type: "paragraph",
        text: "Even in snow that fell less than 24 hours prior at the South Col, microscopic nylon and polyester threads reveal the long-distance reach of industrial civilization.",
      },
    ],
  },

  "heatwave-triggers-rockfall-in-solukhumbu": {
    id: "art-09",
    title: "Unprecedented pre-monsoon heatwave triggers rockfall in Solukhumbu",
    slug: "heatwave-triggers-rockfall-in-solukhumbu",
    dek: "Thawing permafrost destabilizes traditional climbing trails, forcing route guides to reroute ancient transit passages.",
    categories: [{ title: "Environment", slug: "environment" }],
    publishedAt: "July 3, 2026",
    readTime: "5 min read",
    wordCount: 1120,
    authors: [
      {
      name: "Tenzi Sherpa",
      role: "Field Correspondent",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Tenzi Sherpa monitors seasonal trail conditions and geological shifts in Upper Khumbu.",
      },
    ],
    image: "/images/articles/knife-edge-ridge.jpg",
    caption: "Active scree flows and rockfall scars on granite flanks previously cemented by year-round permafrost.",
    credit: "Photo: Tenzi Sherpa / Everest Chronicle",
    meta: {
      metaTitle: "Heatwave Triggers Solukhumbu Rockfall | Everest Chronicle",
      metaDescription: "Thawing permafrost destabilizes granite faces across the Everest region.",
      canonicalUrl: "https://everestchronicle.com/heatwave-triggers-rockfall-in-solukhumbu",
      ogImage: "/images/articles/knife-edge-ridge.jpg",
      keywords: ["Rockfall", "Permafrost Thaw", "Solukhumbu", "Climate Hazard"],
    },
    relatedSlugs: [
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "the-vanishing-glaciers-climbing-routes",
      "rope-fixers-taking-control-of-8000m-summits",
      "microplastics-detected-snow-above-7000-meters",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
    ],
    body: [
      { type: "heading", text: "The Shifting Stones of the Khumbu" },
      {
        type: "paragraph",
        text: "Warm spells early in the climbing calendar have accelerated ice-melt deep within rock fissures, releasing bowling-ball sized boulders across busy trail sections.",
      },
    ],
  },

  "mustang-snow-leopard-survey-rebounding-population": {
    id: "art-10",
    title: "Mustang snow leopard survey reveals rebounding predator population",
    slug: "mustang-snow-leopard-survey-rebounding-population",
    dek: "Camera trap grids deployed across the Upper Mustang valleys capture breeding pairs and healthy cub survival rates.",
    categories: [
      { title: "Conservation", slug: "conservation" },
      { title: "Wildlife", slug: "conservation" },
    ],
    publishedAt: "July 8, 2026",
    readTime: "6 min read",
    wordCount: 1350,
    authors: [
      {
      name: "Prashant KC",
      role: "Wildlife & Conservation Correspondent",
      avatar: "/images/articles/snow-leopard.jpg",
      bio: "Prashant KC has documented snow leopard corridors and predator-livestock insurance programs in Nepal for 12 years.",
      },
    ],
    image: "/images/articles/snow-leopard.jpg",
    caption: "A healthy adult snow leopard captured on an automated nocturnal motion camera along a Mustang ridge at 4,400 meters.",
    credit: "Photo: Mustang Conservation Area Project / Everest Chronicle",
    meta: {
      metaTitle: "Mustang Snow Leopard Survey Shows Population Rebound | Everest Chronicle",
      metaDescription: "Camera trap grids across the trans-Himalayan valleys of Upper Mustang document rising snow leopard numbers and cub survival.",
      canonicalUrl: "https://everestchronicle.com/mustang-snow-leopard-survey-rebounding-population",
      ogImage: "/images/articles/snow-leopard.jpg",
      keywords: ["Snow Leopard", "Mustang", "Wildlife Conservation", "Predator Population", "Annapurna"],
    },
    relatedSlugs: [
      "community-forest-groups-annapurna-carbon-credits",
      "red-panda-habitat-corridors-eastern-nepal",
      "the-vanishing-glaciers-climbing-routes",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "rope-fixers-taking-control-of-8000m-summits",
    ],
    body: [
      { type: "heading", text: "The Ghost of the Mountains Returns" },
      {
        type: "paragraph",
        text: "Decades of community-led livestock insurance and anti-poaching awareness are bearing fruit across the windswept canyons of Upper Mustang. More than 45 distinct individuals were catalogued in the latest census.",
      },
    ],
  },

  "community-forest-groups-annapurna-carbon-credits": {
    id: "art-11",
    title: "Community forest groups in Annapurna buffer zone gain carbon credits",
    slug: "community-forest-groups-annapurna-carbon-credits",
    dek: "Direct international payouts empower local indigenous councils to fund solar microgrids and anti-poaching patrols.",
    categories: [
      { title: "Conservation", slug: "conservation" },
      { title: "Community", slug: "conservation" },
    ],
    publishedAt: "July 6, 2026",
    readTime: "5 min read",
    wordCount: 1140,
    authors: [
      {
      name: "Ramesh Poudel",
      role: "Sustainability & Economy Reporter",
      avatar: "/images/articles/glacier-lake.jpg",
      bio: "Ramesh Poudel covers community forestry, carbon finance, and renewable microgrids in rural Nepal.",
      },
    ],
    image: "/images/articles/glacier-lake.jpg",
    caption: "Lush native oak and rhododendron forest canopies protected by village user groups in the Annapurna foothills.",
    credit: "Photo: Ramesh Poudel / Everest Chronicle",
    meta: {
      metaTitle: "Annapurna Forest Groups Win Carbon Credits | Everest Chronicle",
      metaDescription: "Indigenous village councils earn international carbon credits for restoring native Himalayan forest ecosystems.",
      canonicalUrl: "https://everestchronicle.com/community-forest-groups-annapurna-carbon-credits",
      ogImage: "/images/articles/glacier-lake.jpg",
      keywords: ["Carbon Credits", "Community Forestry", "Annapurna", "Climate Finance"],
    },
    relatedSlugs: [
      "mustang-snow-leopard-survey-rebounding-population",
      "red-panda-habitat-corridors-eastern-nepal",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "the-vanishing-glaciers-climbing-routes",
      "rope-fixers-taking-control-of-8000m-summits",
    ],
    body: [
      { type: "heading", text: "Grassroots Forest Protection Pays Dividends" },
      {
        type: "paragraph",
        text: "Rather than waiting for central state funding, Annapurna's community forest user groups have tapped voluntary carbon markets to finance sustainable ranger patrols and local schooling.",
      },
    ],
  },

  "red-panda-habitat-corridors-eastern-nepal": {
    id: "art-12",
    title: "Red panda habitat corridors established in Eastern Nepal cloud forests",
    slug: "red-panda-habitat-corridors-eastern-nepal",
    dek: "Private landholders partner with conservation biologists to plant native bamboo corridors connecting fragmented reserves.",
    categories: [
      { title: "Conservation", slug: "conservation" },
      { title: "Ecology", slug: "conservation" },
    ],
    publishedAt: "July 2, 2026",
    readTime: "5 min read",
    wordCount: 1080,
    authors: [
      {
      name: "Sunita Tamang",
      role: "Ecology Reporter",
      avatar: "/images/articles/snow-leopard.jpg",
      bio: "Sunita Tamang writes on biodiversity loss, endangered species recovery, and indigenous territorial stewardship.",
      },
    ],
    image: "/images/articles/snow-leopard.jpg",
    caption: "Misty sub-alpine bamboo forest in Ilam and Panchthar, critical sanctuary for arboreal red pandas.",
    credit: "Photo: Red Panda Network / Everest Chronicle",
    meta: {
      metaTitle: "Red Panda Corridors Restored in Eastern Nepal | Everest Chronicle",
      metaDescription: "Reforestation projects reconnect isolated cloud forest patches to safeguard wild red panda populations.",
      canonicalUrl: "https://everestchronicle.com/red-panda-habitat-corridors-eastern-nepal",
      ogImage: "/images/articles/snow-leopard.jpg",
      keywords: ["Red Panda", "Eastern Nepal", "Bamboo Forest", "Habitat Corridor", "Conservation"],
    },
    relatedSlugs: [
      "mustang-snow-leopard-survey-rebounding-population",
      "community-forest-groups-annapurna-carbon-credits",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "the-vanishing-glaciers-climbing-routes",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "rope-fixers-taking-control-of-8000m-summits",
    ],
    body: [
      { type: "heading", text: "Rebuilding the Broken Green Chain" },
      {
        type: "paragraph",
        text: "Connecting isolated forest reserves allows breeding populations of red pandas to traverse mountain valleys without risking human-dominated pasture lands.",
      },
    ],
  },

  "nepal-signs-rescue-pact-with-airlines-drone-and-rafting-groups": {
    id: "art-13",
    title: "Nepal signs rescue pact with airlines, drone and rafting groups for disaster response",
    slug: "nepal-signs-rescue-pact-with-airlines-drone-and-rafting-groups",
    dek: "A landmark multi-sector agreement integrates civilian logistics into the national emergency disaster management network.",
    categories: [
      { title: "Governance", slug: "environment" },
      { title: "Rescue", slug: "expeditions" },
    ],
    publishedAt: "July 10, 2026",
    readTime: "4 min read",
    wordCount: 890,
    authors: [
      {
      name: "Bikash Sangroula",
      role: "Senior Climate & Field Correspondent",
      avatar: "/images/homepage/nepal-rescue.jpg",
      bio: "Bikash Sangroula reports on aviation protocols and disaster preparedness.",
      },
    ],
    image: "/images/homepage/nepal-rescue.jpg",
    caption: "Civilian river guides and drone pilots sign unified response protocols with the Ministry of Home Affairs.",
    credit: "Photo: Everest Chronicle Newsroom",
    meta: {
      metaTitle: "Nepal Signs Landmark Multi-Sector Rescue Pact | Everest Chronicle",
      metaDescription: "Airlines, drone operators, and rafting companies combine forces to speed up emergency response across Nepal.",
      canonicalUrl: "https://everestchronicle.com/nepal-signs-rescue-pact-with-airlines-drone-and-rafting-groups",
      ogImage: "/images/homepage/nepal-rescue.jpg",
      keywords: ["Nepal Disaster Pact", "Emergency Response", "Civilian Drones", "Rafting Rescue"],
    },
    relatedSlugs: [
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "safety-overhaul-urged-helicopter-rescues-karakoram",
      "the-vanishing-glaciers-climbing-routes",
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "rope-fixers-taking-control-of-8000m-summits",
    ],
    body: [
      { type: "heading", text: "Uniting Civilian Expertise in Disaster Zones" },
      {
        type: "paragraph",
        text: "By formalizing stand-by agreements with commercial drone teams and river guides, authorities aim to eliminate hours of bureaucratic inertia during flood emergencies.",
      },
    ],
  },

  "nepal-to-review-everest-summit-event-after-corruption-complaint": {
    id: "art-14",
    title: "Nepal to review Everest summit event after corruption complaint",
    slug: "nepal-to-review-everest-summit-event-after-corruption-complaint",
    dek: "Anti-graft authorities initiate an official probe into commercial sponsorship and royalty fee handling during spring Everest expeditions.",
    categories: [
      { title: "Governance", slug: "governance" },
      { title: "Expeditions", slug: "expeditions" },
    ],
    publishedAt: "July 9, 2026",
    readTime: "5 min read",
    wordCount: 980,
    authors: [
      {
      name: "Dawa Geljen",
      role: "Expeditions Editor",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Dawa Geljen covers Himalayan mountaineering governance and permit administration.",
      },
    ],
    image: "/images/homepage/sherpa-featured.jpg",
    caption: "The Department of Tourism headquarters in Kathmandu where permit auditing is underway.",
    credit: "Photo: Everest Chronicle Newsroom",
    meta: {
      metaTitle: "Nepal Reviews Everest Summit Event After Graft Complaint | Everest Chronicle",
      metaDescription: "Government agencies review financial transparency in Everest commercial permits following formal objections.",
      canonicalUrl: "https://everestchronicle.com/nepal-to-review-everest-summit-event-after-corruption-complaint",
      ogImage: "/images/homepage/sherpa-featured.jpg",
      keywords: ["Everest Investigation", "Expedition Permits", "Tourism Royalty", "Governance"],
    },
    relatedSlugs: [
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "rope-fixers-taking-control-of-8000m-summits",
      "the-vanishing-glaciers-climbing-routes",
      "record-summit-push-on-k2-winter",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "imja-glacial-lake-expansion-accelerates-flood-work",
    ],
    body: [
      { type: "heading", text: "Scrutiny on Summit Commercialization" },
      {
        type: "paragraph",
        text: "Investigators are examining how commercial promotional events were approved inside Sagarmatha National Park and whether environmental compliance fees were properly collected.",
      },
    ],
  },

  "monsoon-rains-paralyse-nepal-as-landslides-block-key-highways": {
    id: "art-15",
    title: "Monsoon rains paralyse Nepal as landslides block key highways",
    slug: "monsoon-rains-paralyse-nepal-as-landslides-block-key-highways",
    dek: "Continuous torrential downpours sever road links along the Prithvi and Tribhuvan Highways, halting supply chains into Kathmandu.",
    categories: [
      { title: "Environment", slug: "environment" },
      { title: "Climate", slug: "environment" },
    ],
    publishedAt: "July 8, 2026",
    readTime: "4 min read",
    wordCount: 870,
    authors: [
      {
      name: "Bikash Sangroula",
      role: "Senior Climate Correspondent",
      avatar: "/images/homepage/nepal-rescue.jpg",
      bio: "Bikash Sangroula has reported on extreme weather and roadway vulnerability across Nepal.",
      },
    ],
    image: "/images/homepage/nepal-rescue.jpg",
    caption: "Heavy excavators clearing mud and debris along the steep hillside roads of the Prithvi Highway.",
    credit: "Photo: Nepal Roads Division / Everest Chronicle",
    meta: {
      metaTitle: "Monsoon Rains Paralyse Nepal Highways | Everest Chronicle",
      metaDescription: "Multiple landslides shut down arterial routes connecting Kathmandu to the southern plains.",
      canonicalUrl: "https://everestchronicle.com/monsoon-rains-paralyse-nepal-as-landslides-block-key-highways",
      ogImage: "/images/homepage/nepal-rescue.jpg",
      keywords: ["Nepal Monsoon", "Landslides", "Prithvi Highway", "Kathmandu Transit"],
    },
    relatedSlugs: [
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "flood-washes-away-road-to-ghandruk-village-stranding-tourists",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "the-vanishing-glaciers-climbing-routes",
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "rope-fixers-taking-control-of-8000m-summits",
    ],
    body: [
      { type: "heading", text: "Lifelines Severed by Monsoon Deluge" },
      {
        type: "paragraph",
        text: "With tens of thousands of passengers stranded along river canyons, engineering teams are working in shifts to stabilize collapsing cut-slopes.",
      },
    ],
  },

  "flood-washes-away-road-to-ghandruk-village-stranding-tourists": {
    id: "art-16",
    title: "Flood washes away road to Ghandruk village, stranding hundreds of tourists",
    slug: "flood-washes-away-road-to-ghandruk-village-stranding-tourists",
    dek: "Flash floods destroy vital culverts on the Modi Khola road, leaving trekking groups and locals stranded in the Annapurna sanctuary gateway.",
    categories: [
      { title: "Travel", slug: "travel" },
      { title: "Environment", slug: "environment" },
    ],
    publishedAt: "July 7, 2026",
    readTime: "4 min read",
    wordCount: 820,
    authors: [
      {
      name: "Karma Gurung",
      role: "Annapurna Regional Reporter",
      avatar: "/images/articles/knife-edge-ridge.jpg",
      bio: "Karma Gurung reports on trekking safety, trail conditions, and cultural preservation in the Annapurna basin.",
      },
    ],
    image: "/images/articles/glacier-lake.jpg",
    caption: "The swollen Modi Khola rushing past damaged embankment sections near Ghandruk.",
    credit: "Photo: Karma Gurung / Everest Chronicle",
    meta: {
      metaTitle: "Flood Washes Away Ghandruk Village Road | Everest Chronicle",
      metaDescription: "Monsoon floods breach roads leading into popular Annapurna trekking destination Ghandruk.",
      canonicalUrl: "https://everestchronicle.com/flood-washes-away-road-to-ghandruk-village-stranding-tourists",
      ogImage: "/images/articles/glacier-lake.jpg",
      keywords: ["Ghandruk Flood", "Annapurna Trekking", "Modi Khola", "Travel Warning"],
    },
    relatedSlugs: [
      "monsoon-rains-paralyse-nepal-as-landslides-block-key-highways",
      "nepals-next-rescue-should-not-be-a-body-recovery",
      "community-forest-groups-annapurna-carbon-credits",
      "the-vanishing-glaciers-climbing-routes",
      "rope-fixers-taking-control-of-8000m-summits",
      "mustang-snow-leopard-survey-rebounding-population",
    ],
    body: [
      { type: "heading", text: "Emergency Footpaths Reopened by Villagers" },
      {
        type: "paragraph",
        text: "While vehicular traffic remains suspended, local lodge owners and youth clubs have carved safe pedestrian paths to guide stranded travelers across landslide debris.",
      },
    ],
  },

  "beyond-annapurna-circuit-nar-phu-trail": {
    id: "art-17",
    title: "Beyond the Annapurna Circuit: The resurgence of the Nar Phu high trail",
    slug: "beyond-annapurna-circuit-nar-phu-trail",
    dek: "Isolated Tibetan-speaking villages tucked between the Kang La and Thorong La passes welcome independent trekkers seeking ancient Buddhist heritage away from jeep roads.",
    categories: [
      { title: "Travel", slug: "travel" },
      { title: "Expeditions", slug: "expeditions" },
    ],
    publishedAt: "July 9, 2026",
    readTime: "5 min read",
    wordCount: 1040,
    authors: [
      {
      name: "Karma Gurung",
      role: "Annapurna Regional Reporter",
      avatar: "/images/articles/knife-edge-ridge.jpg",
      bio: "Karma Gurung covers high Himalayan trekking routes and cultural preservation.",
      },
    ],
    image: "/images/articles/knife-edge-ridge.jpg",
    caption: "Windswept high plateau monasteries in Nar village surrounded by towering snow ridges.",
    credit: "Photo: Karma Gurung / Everest Chronicle",
    meta: {
      metaTitle: "Beyond Annapurna: Resurgence of Nar Phu Trail | Everest Chronicle",
      metaDescription: "Remote high-altitude valleys offer undisturbed trekking and ancient culture in the rain shadow of Annapurna.",
      canonicalUrl: "https://everestchronicle.com/beyond-annapurna-circuit-nar-phu-trail",
      ogImage: "/images/articles/knife-edge-ridge.jpg",
      keywords: ["Nar Phu", "Annapurna", "Trekking", "Himalaya Travel"],
    },
    relatedSlugs: [
      "teahouses-adopt-solar-storage-eliminate-kerosene",
      "flood-washes-away-road-to-ghandruk-village-stranding-tourists",
      "mustang-snow-leopard-survey-rebounding-population",
      "community-forest-groups-annapurna-carbon-credits",
      "the-vanishing-glaciers-climbing-routes",
      "rope-fixers-taking-control-of-8000m-summits",
    ],
    body: [
      { type: "heading", text: "Escaping the Road Network" },
      {
        type: "paragraph",
        text: "As motorable dirt tracks reshape the classic Annapurna Circuit, adventurous hikers are turning toward restricted valleys like Nar Phu where foot and pack-animal travel remain the sole modes of transit.",
      },
    ],
  },

  "teahouses-adopt-solar-storage-eliminate-kerosene": {
    id: "art-18",
    title: "High-altitude teahouses adopt solar storage to eliminate kerosene dependency",
    slug: "teahouses-adopt-solar-storage-eliminate-kerosene",
    dek: "Lodge operators between Namche Bazaar and Gorak Shep install battery microgrids, improving air quality inside stone dining halls and cutting fuel transport costs.",
    categories: [
      { title: "Travel", slug: "travel" },
      { title: "Environment", slug: "environment" },
    ],
    publishedAt: "July 5, 2026",
    readTime: "4 min read",
    wordCount: 890,
    authors: [
      {
      name: "Mingma Sherpa",
      role: "Khumbu Field Reporter",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Mingma Sherpa reports on green energy adoption and sustainable tourism across Sagarmatha National Park.",
      },
    ],
    image: "/images/homepage/nepal-rescue.jpg",
    caption: "Rooftop solar photovoltaic arrays installed on stone teahouses in Dingboche at 4,410 meters.",
    credit: "Photo: Mingma Sherpa / Everest Chronicle",
    meta: {
      metaTitle: "High-Altitude Teahouses Adopt Solar Storage | Everest Chronicle",
      metaDescription: "Lodge owners in the Everest region install clean solar battery storage, phasing out polluting kerosene.",
      canonicalUrl: "https://everestchronicle.com/teahouses-adopt-solar-storage-eliminate-kerosene",
      ogImage: "/images/homepage/nepal-rescue.jpg",
      keywords: ["Solar Energy", "Teahouses", "Khumbu", "Everest Trekking", "Clean Energy"],
    },
    relatedSlugs: [
      "beyond-annapurna-circuit-nar-phu-trail",
      "the-vanishing-glaciers-climbing-routes",
      "community-forest-groups-annapurna-carbon-credits",
      "imja-glacial-lake-expansion-accelerates-flood-work",
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "nepals-next-rescue-should-not-be-a-body-recovery",
    ],
    body: [
      { type: "heading", text: "Clean Power in the Thin Air" },
      {
        type: "paragraph",
        text: "By investing in durable lithium-iron-phosphate battery packs, high-altitude lodges can now keep dining rooms warm and cook meals without burning hundreds of liters of kerosene hauled on porter backs.",
      },
    ],
  },

  "video-documentary-winter-guardians-gokyo-ri": {
    id: "art-19",
    title: "Video Documentary: The winter guardians of Gokyo Ri",
    slug: "video-documentary-winter-guardians-gokyo-ri",
    dek: "A 25-minute documentary exploring the resilient families who remain at 4,750 meters through sub-zero Himalayan winters after the tourist crowds depart.",
    categories: [
      { title: "Media", slug: "media" },
      { title: "Culture", slug: "expeditions" },
    ],
    publishedAt: "July 7, 2026",
    readTime: "4 min read",
    wordCount: 780,
    authors: [
      {
      name: "Tashi Wangchuk",
      role: "Documentary Filmmaker",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Tashi Wangchuk directs independent films on indigenous Himalayan high-altitude cultures.",
      },
    ],
    image: "/images/homepage/sherpa-featured.jpg",
    caption: "Frost-covered stone lodges beside the frozen waters of Gokyo Third Lake in midwinter.",
    credit: "Photo: Tashi Wangchuk / Everest Chronicle",
    meta: {
      metaTitle: "Winter Guardians of Gokyo Ri | Everest Chronicle",
      metaDescription: "Documenting the indigenous families who safeguard high-altitude settlements through harsh Himalayan winters.",
      canonicalUrl: "https://everestchronicle.com/video-documentary-winter-guardians-gokyo-ri",
      ogImage: "/images/homepage/sherpa-featured.jpg",
      keywords: ["Gokyo Ri", "Winter Himalaya", "Sherpa Culture", "Documentary Film"],
    },
    relatedSlugs: [
      "photo-essay-high-passes-dolpo-early-spring",
      "the-vanishing-glaciers-climbing-routes",
      "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
      "beyond-annapurna-circuit-nar-phu-trail",
      "mustang-snow-leopard-survey-rebounding-population",
      "rope-fixers-taking-control-of-8000m-summits",
    ],
    body: [
      { type: "heading", text: "Living with Silence and Cold" },
      {
        type: "paragraph",
        text: "When winter freezes the Ngozumpa Glacier and temperatures plummet below minus thirty, a small community of caretakers and yak herders keeps life beating in one of the highest permanent outposts in Nepal.",
      },
    ],
  },

  "photo-essay-high-passes-dolpo-early-spring": {
    id: "art-20",
    title: "Photo Essay: The high passes of Dolpo in early spring",
    slug: "photo-essay-high-passes-dolpo-early-spring",
    dek: "A stunning monochrome visual dispatch documenting mule caravans crossing snowbound 5,000-meter ridges before the seasonal thaw.",
    categories: [
      { title: "Media", slug: "media" },
      { title: "Expeditions", slug: "expeditions" },
    ],
    publishedAt: "July 3, 2026",
    readTime: "3 min read",
    wordCount: 650,
    authors: [
      {
      name: "Tenzing Norbu",
      role: "Visual Journalist",
      avatar: "/images/articles/knife-edge-ridge.jpg",
      bio: "Tenzing Norbu specializes in photo essays across western Nepal's remote trans-Himalayan valleys.",
      },
    ],
    image: "/images/articles/knife-edge-ridge.jpg",
    caption: "Mule train navigating wind-sculpted cornices across the Baga La pass in Upper Dolpo.",
    credit: "Photo: Tenzing Norbu / Everest Chronicle",
    meta: {
      metaTitle: "Photo Essay: High Passes of Dolpo in Early Spring | Everest Chronicle",
      metaDescription: "Visual storytelling following seasonal trading caravans across snow-choked ridges in Western Nepal.",
      canonicalUrl: "https://everestchronicle.com/photo-essay-high-passes-dolpo-early-spring",
      ogImage: "/images/articles/knife-edge-ridge.jpg",
      keywords: ["Dolpo", "Photo Essay", "Baga La", "High Passes", "Caravans"],
    },
    relatedSlugs: [
      "video-documentary-winter-guardians-gokyo-ri",
      "beyond-annapurna-circuit-nar-phu-trail",
      "mustang-snow-leopard-survey-rebounding-population",
      "rope-fixers-taking-control-of-8000m-summits",
      "record-summit-push-on-k2-winter",
      "the-vanishing-glaciers-climbing-routes",
    ],
    body: [
      { type: "heading", text: "Across the Frozen Windward Slopes" },
      {
        type: "paragraph",
        text: "Long before trekking groups arrive in autumn, local salt and barley caravans push through high Himalayan cols, carving narrow trenches through deep spring drifts.",
      },
    ],
  },
};

export const fallbackArticle: ArticleDetail = {
  id: "art-fallback",
  title: "Dispatch from the high Himalaya",
  slug: "dispatch-from-the-high-himalaya",
  dek: "A field report from Everest Chronicle's investigative archive, covering the communities, ecology and decisions shaping life across the high Himalayas.",
  categories: [
    { title: "Expeditions", slug: "expeditions" },
    { title: "Climate", slug: "environment" },
  ],
  tags: [
    { title: "Himalayas", slug: "himalayas" },
    { title: "Field Report", slug: "field-report" },
  ],
  publishedAt: "July 12, 2026",
  updatedAt: "July 12, 2026",
  readTime: "5 min read",
  wordCount: 920,
  authors: [
    {
      name: "Everest Chronicle Editorial Desk",
      role: "Editorial Team",
      avatar: "/images/homepage/sherpa-featured.jpg",
      bio: "Everest Chronicle delivers independent field reporting, scientific investigations, and visual storytelling from Nepal and the high mountains.",
    },
  ],
  image: "/images/homepage/nepal-rescue.jpg",
  caption:
    "Dawn over the high Himalayan ranges where alpine environments and mountain communities meet.",
  credit: "Photo: Everest Chronicle Archive",
  meta: {
    metaTitle: "Dispatch from the High Himalaya | Everest Chronicle",
    metaDescription: "In-depth reporting from Everest Chronicle on the ecology, culture, and extreme ascents across Nepal.",
    canonicalUrl: "https://everestchronicle.com/dispatch-from-the-high-himalaya",
    ogImage: "/images/homepage/nepal-rescue.jpg",
    keywords: ["Everest Chronicle", "Nepal", "Himalayas", "Alpine Journalism"],
  },
  relatedSlugs: [
    "nepals-next-rescue-should-not-be-a-body-recovery",
    "the-vanishing-glaciers-climbing-routes",
    "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
    "rope-fixers-taking-control-of-8000m-summits",
    "imja-glacial-lake-expansion-accelerates-flood-work",
    "mustang-snow-leopard-survey-rebounding-population",
  ],
  body: [
    {
      type: "paragraph",
      text: "Everest Chronicle follows the intersections of mountaineering, climate crisis, biodiversity conservation, and local stewardship across Nepal and the wider Himalayas.",
    },
    {
      type: "paragraph",
      text: "Our field correspondents report from high-altitude base camps, remote river valleys, and community forests to deliver authentic stories from the ground.",
    },
  ],
};
