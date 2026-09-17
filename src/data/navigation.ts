export interface NavigationChild {
  label: string;
  href: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationChild[];
}

export const navigationConfig: NavigationItem[] = [
  {
    label: "Expeditions",
    href: "/category/expeditions",
  },
  {
    label: "Environment",
    href: "/category/environment",
  },
  {
    label: "Conservation",
    href: "/category/conservation",
  },
  {
    label: "Travel",
    href: "/category/travel",
  },
  {
    label: "Media",
    href: "/category/media",
    children: [
      {
        label: "Dataviz",
        href: "/media/dataviz",
      },
      {
        label: "3D",
        href: "/media/3d",
      },
      {
        label: "Video",
        href: "/media/video",
      },
      {
        label: "Photography",
        href: "/media/photography",
      },
    ],
  },
];
