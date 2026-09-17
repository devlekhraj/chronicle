import type { ArticleSummary } from "@/types/content";

export interface CategoryData {
  title: string;
  slug: string;
  count: string;
  description: string;
  stories: ArticleSummary[];
}

export const categoryRegistry: Record<string, CategoryData> = {
  expeditions: {
    title: "Expeditions",
    slug: "expeditions",
    count: "Showing 35 of 78 results",
    description:
      "Deep investigative coverage of high-altitude Himalayan ascents, sherpa labor rights, climbing ethics, and mountain rescue operations.",
    stories: [
      {
        id: "exp-hero",
        title: "Nepal's next rescue should not be a body recovery",
        slug: "nepals-next-rescue-should-not-be-a-body-recovery",
        categories: ["Climate", "Mountaineering"],
        excerpt:
          "As climate change makes disasters more frequent and deadly, Nepal must move beyond recovering victims after tragedy and build a modern fire and rescue service capable of saving lives during the critical golden hour.",
        publishedAt: "July 10, 2026",
        author: "Author name here",
        image: "/images/homepage/nepal-rescue.jpg",
      },
      {
        id: "exp-1",
        title: "The new high-altitude rope fixers taking control of 8,000m summits",
        slug: "rope-fixers-taking-control-of-8000m-summits",
        categories: ["Expeditions", "Mountaineering"],
        excerpt:
          "How indigenous mountain technicians are setting the safety standards and running the most technical ridge routes in the Himalaya.",
        publishedAt: "July 8, 2026",
        author: "Lakpa Nuru",
        image: "/images/articles/knife-edge-ridge.jpg",
      },
      {
        id: "exp-2",
        title: "Record summit push on K2 tests winter climbing boundaries",
        slug: "record-summit-push-on-k2-winter",
        categories: ["Expeditions"],
        excerpt:
          "Climbers endure minus forty temperatures on the Abruzzi Spur in a bid for seasonal alpine style climbing history.",
        publishedAt: "July 6, 2026",
        author: "Dawa Geljen",
        image: "/images/homepage/sherpa-featured.jpg",
      },
      {
        id: "exp-3",
        title: "Safety overhaul urged as helicopter rescues multiply in high Karakoram",
        slug: "safety-overhaul-urged-helicopter-rescues-karakoram",
        categories: ["Expeditions", "Safety"],
        excerpt:
          "Insurance underwriters demand new pilot protocols and GPS black-box loggers for Himalayan charter operators.",
        publishedAt: "July 4, 2026",
        author: "Bikash Sangroula",
        image: "/images/homepage/nepal-rescue.jpg",
      },
      {
        id: "exp-4",
        title: "Sherpas demand stricter safety standards as Everest commercialization peaks",
        slug: "sherpas-demand-stricter-safety-standards-as-everest-commercialization-peaks",
        categories: ["Expeditions", "Conservation"],
        excerpt:
          "Veteran high-altitude guides call for systemic reform in summit permits and commercial expedition management following unprecedented congestion across the Khumbu Icefall.",
        publishedAt: "July 2, 2026",
        author: "Passang Sherpa",
        image: "/images/homepage/sherpa-featured.jpg",
      },
    ],
  },
  environment: {
    title: "Environment",
    slug: "environment",
    count: "Showing 28 of 64 results",
    description:
      "Tracking the climate crisis across the Third Pole: retreating glaciers, glacial lake outburst floods, changing monsoon systems, and alpine ecology.",
    stories: [
      {
        id: "env-1",
        title: "Imja glacial lake volume expands, accelerating flood mitigation work",
        slug: "imja-glacial-lake-expansion-accelerates-flood-work",
        categories: ["Environment", "Climate"],
        excerpt:
          "Engineers and military units install automated siphons and warning sirens along the Dudh Koshi river basin.",
        publishedAt: "July 7, 2026",
        author: "Dr. Shailendra Shrestha",
        image: "/images/articles/glacier-lake.jpg",
      },
      {
        id: "env-2",
        title: "Microplastics detected in freshly fallen snow above 7,000 meters",
        slug: "microplastics-detected-snow-above-7000-meters",
        categories: ["Environment", "Research"],
        excerpt:
          "Atmospheric scientists confirm synthetic fiber contamination carried on jet stream currents from global urban centers.",
        publishedAt: "July 5, 2026",
        author: "Maya Dewan",
        image: "/images/homepage/nepal-rescue.jpg",
      },
      {
        id: "env-3",
        title: "Unprecedented pre-monsoon heatwave triggers rockfall in Solukhumbu",
        slug: "heatwave-triggers-rockfall-in-solukhumbu",
        categories: ["Environment", "Glaciology"],
        excerpt:
          "Thawing permafrost destabilizes traditional climbing trails, forcing route guides to reroute ancient transit passages.",
        publishedAt: "July 3, 2026",
        author: "Tenzi Sherpa",
        image: "/images/articles/knife-edge-ridge.jpg",
      },
      {
        id: "env-4",
        title: "The vanishing glaciers: How warming is reshaping high-altitude climbing routes",
        slug: "the-vanishing-glaciers-climbing-routes",
        categories: ["Environment", "Climate"],
        excerpt:
          "Decades of receding ice have uncovered unstable scree and opened deadly new chasms on classic Everest routes, forcing veteran Sherpas to rewrite the rules of Himalayan ascent.",
        publishedAt: "July 1, 2026",
        author: "Sunita Tamang",
        image: "/images/articles/glacier-lake.jpg",
      },
    ],
  },
  conservation: {
    title: "Conservation",
    slug: "conservation",
    count: "Showing 24 of 52 results",
    description:
      "Field reports on wildlife biology, protected areas, indigenous conservation stewardship, and anti-poaching initiatives across the Hindu Kush Himalaya.",
    stories: [
      {
        id: "con-1",
        title: "Mustang snow leopard survey reveals rebounding predator population",
        slug: "mustang-snow-leopard-survey-rebounding-population",
        categories: ["Conservation", "Wildlife"],
        excerpt:
          "Camera trap grids deployed across the Upper Mustang valleys capture breeding pairs and healthy cub survival rates.",
        publishedAt: "July 8, 2026",
        author: "Prashant KC",
        image: "/images/articles/snow-leopard.jpg",
      },
      {
        id: "con-2",
        title: "Community forest groups in Annapurna buffer zone gain carbon credits",
        slug: "community-forest-groups-annapurna-carbon-credits",
        categories: ["Conservation", "Community"],
        excerpt:
          "Direct international payouts empower local indigenous councils to fund solar microgrids and anti-poaching patrols.",
        publishedAt: "July 6, 2026",
        author: "Ramesh Poudel",
        image: "/images/articles/glacier-lake.jpg",
      },
      {
        id: "con-3",
        title: "Red panda habitat corridors established in Eastern Nepal cloud forests",
        slug: "red-panda-habitat-corridors-eastern-nepal",
        categories: ["Conservation", "Ecology"],
        excerpt:
          "Private landholders partner with conservation biologists to plant native bamboo corridors connecting fragmented reserves.",
        publishedAt: "July 2, 2026",
        author: "Sunita Tamang",
        image: "/images/articles/snow-leopard.jpg",
      },
    ],
  },
  travel: {
    title: "Travel",
    slug: "travel",
    count: "Showing 18 of 42 results",
    description:
      "Responsible trekking guides, cultural histories, high-altitude trail conditions, and dispatches from the remotest valleys of the Himalayas.",
    stories: [
      {
        id: "trv-1",
        title: "Beyond the Annapurna Circuit: The resurgence of the Nar Phu high trail",
        slug: "beyond-annapurna-circuit-nar-phu-trail",
        categories: ["Travel", "Trekking"],
        excerpt:
          "Isolated Tibetan-speaking villages tucked between the Kang La and Thorong La passes welcome independent trekkers seeking ancient Buddhist heritage away from jeep roads.",
        publishedAt: "July 9, 2026",
        author: "Karma Gurung",
        image: "/images/articles/knife-edge-ridge.jpg",
      },
      {
        id: "trv-2",
        title: "High-altitude teahouses adopt solar storage to eliminate kerosene dependency",
        slug: "teahouses-adopt-solar-storage-eliminate-kerosene",
        categories: ["Travel", "Sustainability"],
        excerpt:
          "Lodge operators between Namche Bazaar and Gorak Shep install battery microgrids, improving air quality inside stone dining halls and cutting fuel transport costs.",
        publishedAt: "July 5, 2026",
        author: "Mingma Sherpa",
        image: "/images/homepage/nepal-rescue.jpg",
      },
      {
        id: "trv-3",
        title: "Flood washes away road to Ghandruk village, stranding tourists",
        slug: "flood-washes-away-road-ghandruk-village",
        categories: ["Travel", "Monsoon"],
        excerpt:
          "Local guides and community volunteers establish emergency pedestrian footpaths across landslides to safely evacuate travelers during heavy monsoon downpours.",
        publishedAt: "July 1, 2026",
        author: "Bikash Sangroula",
        image: "/images/articles/glacier-lake.jpg",
      },
    ],
  },
  media: {
    title: "Media",
    slug: "media",
    count: "Showing 40 of 95 results",
    description:
      "Interactive data visualizations, 3D topographical models, investigative video documentaries, and photo essays from the high mountains.",
    stories: [
      {
        id: "med-1",
        title: "3D Flythrough: Mapping 70 years of glacial recession across the Khumbu",
        slug: "3d-flythrough-mapping-70-years-glacial-recession",
        categories: ["Dataviz", "3D"],
        excerpt:
          "An interactive digital elevation reconstruction showing how the Khumbu Icefall has shifted, thinned, and fractured from 1953 to present day.",
        publishedAt: "July 10, 2026",
        author: "Everest Cartography Desk",
        image: "/images/articles/glacier-lake.jpg",
      },
      {
        id: "med-2",
        title: "Video Documentary: The winter guardians of Gokyo Ri",
        slug: "video-documentary-winter-guardians-gokyo-ri",
        categories: ["Video", "Culture"],
        excerpt:
          "A 25-minute short film exploring the resilient families who remain at 4,750 meters through sub-zero Himalayan winters after the tourist crowds depart.",
        publishedAt: "July 7, 2026",
        author: "Tashi Wangchuk",
        image: "/images/homepage/sherpa-featured.jpg",
      },
      {
        id: "med-3",
        title: "Photo Essay: The high passes of Dolpo in early spring",
        slug: "photo-essay-high-passes-dolpo-early-spring",
        categories: ["Photography", "Dolpo"],
        excerpt:
          "A stunning monochrome visual dispatch documenting mule caravans crossing snowbound 5,000-meter ridges before the seasonal thaw.",
        publishedAt: "July 3, 2026",
        author: "Tenzing Norbu",
        image: "/images/articles/knife-edge-ridge.jpg",
      },
    ],
  },
  dataviz: {
    title: "Dataviz",
    slug: "dataviz",
    count: "Showing 12 of 24 results",
    description:
      "Data-driven journalism, climate graphs, interactive satellite analysis, and mortality statistics from the world's highest peaks.",
    stories: [
      {
        id: "dv-1",
        title: "Interactive Map: Everest summit traffic patterns and mortality rates (1990–2026)",
        slug: "interactive-map-everest-traffic-patterns-mortality",
        categories: ["Dataviz", "Expeditions"],
        excerpt:
          "Analyzing thirty-six years of summit logs to understand how bottle-necks at the Hillary Step correlate with weather windows and frostbite emergencies.",
        publishedAt: "July 8, 2026",
        author: "Data Journalism Desk",
        image: "/images/homepage/nepal-rescue.jpg",
      },
      {
        id: "dv-2",
        title: "Visualizing precipitation shifts: Why the 2026 monsoon broke 30-year rain records",
        slug: "visualizing-precipitation-shifts-2026-monsoon",
        categories: ["Dataviz", "Environment"],
        excerpt:
          "Radar Doppler maps and river discharge charts break down the atmospheric river phenomenon that caused nationwide flash flooding.",
        publishedAt: "July 4, 2026",
        author: "Meteorology Team",
        image: "/images/articles/glacier-lake.jpg",
      },
    ],
  },
  "3d": {
    title: "3D Visualizations",
    slug: "3d",
    count: "Showing 8 of 16 results",
    description:
      "Immersive photogrammetry, high-resolution elevation models, and interactive topographic route maps of Himalayan peaks.",
    stories: [
      {
        id: "3d-1",
        title: "Interactive 3D model of Ama Dablam's South-West Ridge",
        slug: "interactive-3d-model-ama-dablam-south-west-ridge",
        categories: ["3D", "Mountaineering"],
        excerpt:
          "Explore every pitch, camp location, and fixed rope anchor point of Nepal's most iconic technical mountain in true 3D space.",
        publishedAt: "July 9, 2026",
        author: "3D Geospatial Lab",
        image: "/images/articles/knife-edge-ridge.jpg",
      },
    ],
  },
  video: {
    title: "Video",
    slug: "video",
    count: "Showing 22 of 48 results",
    description:
      "Original video documentaries, expedition dispatch videos, interviews, and ground reports from our Kathmandu and regional bureaus.",
    stories: [
      {
        id: "vid-1",
        title: "Field Report: Helicopter pilots racing monsoon storms to evacuate climbers",
        slug: "video-helicopter-pilots-racing-monsoon-storms",
        categories: ["Video", "Aviation"],
        excerpt:
          "Cockpit footage and crew interviews aboard an AS350 B3 rescue bird operating on the limit of mountain visibility.",
        publishedAt: "July 7, 2026",
        author: "Video Desk",
        image: "/images/homepage/nepal-rescue.jpg",
      },
    ],
  },
  photography: {
    title: "Photography",
    slug: "photography",
    count: "Showing 30 of 60 results",
    description:
      "High-impact photojournalism capturing mountain life, spiritual ceremonies, environmental devastation, and expedition triumphs.",
    stories: [
      {
        id: "photo-1",
        title: "Portraits of the Khumbu icefall route builders",
        slug: "portraits-khumbu-icefall-route-builders",
        categories: ["Photography", "Portraits"],
        excerpt:
          "Intimate black-and-white portraits of the dedicated Icefall Doctors who risk everything daily to maintain the ladders through the ice labyrinth.",
        publishedAt: "July 6, 2026",
        author: "Phurba Tashi",
        image: "/images/articles/snow-leopard.jpg",
      },
    ],
  },
};
