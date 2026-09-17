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
  }
  | {
    type: "fullWideImage";
    image?: { src?: string; alt: string };
    caption?: string;
  }
  | {
    type: "authorBios";
    authors: {
      name: string;
      bio: string;
      image?: string;
    }[];
  };

export interface ArticleDetail {
  title: string;
  slug: string;
  dek: string;
  categories: { title: string; slug: string }[];
  publishedAt: string;
  author: string;
  image?: string;
  caption: string;
  body: ArticleBodyBlock[];
}

export const articleRegistry: Record<string, ArticleDetail> = {
  "nepals-next-rescue-should-not-be-a-body-recovery": {
    title: "Nepal's next rescue should not be a body recovery",
    slug: "nepals-next-rescue-should-not-be-a-body-recovery",
    dek: "As climate change makes disasters more frequent and deadly, Nepal must move beyond recovering victims after tragedy and build a modern fire and rescue service capable of saving lives during the critical golden hour.",
    categories: [
      { title: "Climate", slug: "environment" },
      { title: "Mountaineering", slug: "expeditions" },
    ],
    publishedAt: "July 10, 2026",
    author: "Author name here",
    image: "/images/homepage/nepal-rescue.jpg",
    caption:
      "Every monsoon brings familiar scenes: villages cut off by landslides, families stranded on rooftops by swollen rivers, vehicles buried beneath debris and helicopters scrambling to reach isolated communities.",
    body: [
      { type: "heading", text: "Breaker title here" },
      {
        type: "paragraph",
        text: "Nepal has become accustomed to counting its dead after disasters. Every monsoon brings familiar scenes: villages cut off by landslides, families stranded on rooftops by swollen rivers, vehicles buried beneath debris and helicopters scrambling to reach isolated communities. The country has shown remarkable resilience in coping with tragedy. Yet resilience should never be mistaken for preparedness.",
      },
      {
        type: "paragraph",
        text: "As climate change intensifies extreme weather and Nepal's towns and cities expand into increasingly vulnerable terrain, the country's greatest challenge is no longer responding to disasters after they occur. It is ensuring that more people survive them.",
      },
      {
        type: "paragraph",
        text: "Having spent the past 25 years working in Nepal's tourism and mountaineering sector, I have participated in high-altitude rescues, technical mountain operations and emergency response missions across some of the Himalayas' most demanding landscapes. I have worked with thousands of trekkers and climbers from around the world and taken part in numerous search-and-rescue operations.",
      },
      {
        type: "paragraph",
        text: "One painful reality has remained constant throughout those years.",
      },
      {
        type: "imageGrid",
        images: [
          {
            src: "/images/homepage/nepal-rescue.jpg",
            alt: "Rescue teams moving through a monsoon disaster zone",
          },
          {
            src: "/images/articles/glacier-lake.jpg",
            alt: "A swollen Himalayan river valley after heavy rain",
          },
          {
            src: "/images/articles/glacier-lake.jpg",
            alt: "A swollen Himalayan river valley after heavy rain",
          },
          {
            src: "/images/homepage/nepal-rescue.jpg",
            alt: "Rescue teams moving through a monsoon disaster zone",
          },
        ],
        caption:
          "Every monsoon brings familiar scenes: villages cut off by landslides, families stranded on rooftops by swollen rivers, vehicles buried beneath debris and helicopters scrambling to reach isolated communities.",
      },
      {
        type: "paragraph",
        text: "Too often in Nepal, what begins as a rescue mission ends as a body recovery.",
      },
      {
        type: "paragraph",
        text: "Many of those victims might have survived had trained rescuers reached them sooner with the right equipment, command structure and communications support. The first hour after a flood, landslide, fire or road accident is decisive. Around the world, emergency services call it the golden hour. In Nepal, that hour is often lost to confusion, distance and improvisation.",
      },
      {
        type: "wideImage",
        image: {
          src: "/images/homepage/nepal-rescue.jpg",
          alt: "A broad view of a monsoon-hit Himalayan valley",
        },
        caption:
          "Every monsoon brings familiar scenes: villages cut off by landslides, families stranded on rooftops by swollen rivers, vehicles buried beneath debris and helicopters scrambling to reach isolated communities.",
      },
      {
        type: "fullWideImage",
        image: {
          src: "/images/articles/glacier-lake.jpg",
          alt: "A full-width view of floodwater cutting through a Himalayan valley",
        },
        caption:
          "A full-page-width image block can be used for major visual breaks where the image should briefly take over the page.",
      },
      {
        type: "paragraph",
        text: "Rescue professionals cannot depend on courage alone. They need modern dispatch systems, trained urban search-and-rescue teams, river rescue units, reliable fire engines, medical evacuation protocols and local volunteers who know exactly where they fit in the chain of command.",
      },
      {
        type: "paragraph",
        text: "Nepal already has the human capacity to build such a system. The country has skilled soldiers, police officers, pilots, health workers, mountain guides, rafting professionals and community responders. What is missing is integration. These groups are often brave and effective in isolation, but a national rescue system must connect them before disaster strikes.",
      },
      {
        type: "paragraph",
        text: "The goal should be simple: when the next landslide blocks a road, when the next settlement floods at night, when the next building collapses after an earthquake, Nepal should not have to wait for an improvised response. It should have a professional service ready to move within minutes.",
      },
      {
        type: "paragraph",
        text: "Preparedness is not dramatic. It is training, maintenance, mapping, radio discipline and boringly clear responsibility. But it is exactly this quiet work that saves lives before headlines are written.",
      },
      {
        type: "authorBios",
        authors: [
          {
            name: "Author name here",
            bio: "A short bio of the author goes here, fits in one line, background and work, what they do, specialize in, etc.",
            image: "/images/homepage/nepal-rescue.jpg",
          },
          {
            name: "Author name here",
            bio: "A short bio of the author goes here, fits in one line, background and work, what they do, specialize in, etc.",
          },
        ],
      },
    ],
  },
  "the-vanishing-glaciers-climbing-routes": {
    title: "The vanishing glaciers: How warming is reshaping high-altitude climbing routes",
    slug: "the-vanishing-glaciers-climbing-routes",
    dek: "Decades of receding ice have uncovered unstable scree and opened deadly new chasms on classic Everest routes, forcing veteran Sherpas to rewrite the rules of Himalayan ascent.",
    categories: [
      { title: "Environment", slug: "environment" },
      { title: "Climate", slug: "environment" },
    ],
    publishedAt: "July 1, 2026",
    author: "Sunita Tamang",
    image: "/images/articles/glacier-lake.jpg",
    caption:
      "Retreating ice has exposed loose rock and rerouted traditional passages across the Khumbu.",
    body: [
      {
        type: "paragraph",
        text: "On routes that once offered predictable snow bridges and stable ladders, guides now find exposed moraine, thin ice and newly opened crevasses. The transformation is no longer subtle to the people who work in the mountains every season.",
      },
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
  "rope-fixers-taking-control-of-8000m-summits": {
    title: "The new high-altitude rope fixers taking control of 8,000m summits",
    slug: "rope-fixers-taking-control-of-8000m-summits",
    dek: "Indigenous mountain technicians are setting safety standards and running the most technical ridge routes in the Himalaya.",
    categories: [{ title: "Expeditions", slug: "expeditions" }],
    publishedAt: "July 8, 2026",
    author: "Lakpa Nuru",
    image: "/images/articles/knife-edge-ridge.jpg",
    caption:
      "Rope teams move before dawn to prepare exposed ridges for commercial summit pushes.",
    body: [
      {
        type: "paragraph",
        text: "A new generation of high-altitude technicians is redefining expedition work above 8,000 meters. Their labor is technical, dangerous and increasingly central to the safety of every climber who follows.",
      },
      {
        type: "paragraph",
        text: "Instead of working anonymously behind foreign expedition brands, Nepali rope teams are forming their own companies, training younger climbers and negotiating directly with operators.",
      },
      {
        type: "paragraph",
        text: "Their rise marks a shift in who controls knowledge on the mountain, from imported leadership toward the professionals who live with the risks season after season.",
      },
    ],
  },
};

export const fallbackArticle: ArticleDetail = {
  title: "Dispatch from the high Himalaya",
  slug: "dispatch-from-the-high-himalaya",
  dek: "A field report from Everest Chronicle's demo archive, covering the people, weather and decisions shaping life in Nepal's mountains.",
  categories: [
    { title: "Expeditions", slug: "expeditions" },
    { title: "Report", slug: "media" },
  ],
  publishedAt: "July 12, 2026",
  author: "Everest Chronicle Desk",
  caption:
    "Morning light moves across a high Himalayan valley as teams prepare for another day in thin air.",
  body: [
    {
      type: "paragraph",
      text: "This demo article stands in for stories that do not yet have a custom entry in the archive. It preserves the article layout while keeping the route useful during development.",
    },
    {
      type: "paragraph",
      text: "Everest Chronicle follows the intersections of mountaineering, climate, conservation and travel across Nepal and the wider Himalaya.",
    },
    {
      type: "paragraph",
      text: "Future articles can be added to the registry with a title, excerpt, metadata, image, caption and body blocks.",
    },
  ],
};
