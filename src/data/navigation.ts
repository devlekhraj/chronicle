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
    href: "/expeditions",
  },
  {
    label: "Environment",
    href: "/environment",
  },
  {
    label: "Conservation",
    href: "/conservation",
  },
  {
    label: "Travel",
    href: "/travel",
  },
  {
    label: "Media",
    href: "/media",
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
