import Link from "next/link";
import MediaDropdown from "./MediaDropdown";
import MobileNav from "./MobileNav";
import SearchBox from "@/components/ui/SearchBox";
import type { NavigationItem } from "@/lib/ec-api";

export default function Navigation({ items = [] }: { items?: NavigationItem[] }) {
  const mainLinks = items.filter((item) => !item.children);
  const mediaItem = items.find((item) => item.children);

  return (
    <nav aria-label="Main Navigation" className="w-full">
      {/* Desktop Navigation Row Matching Sections 18-22, 29 */}
      <div className="hidden md:flex items-center justify-between py-2">
        <ul className="flex items-center gap-7 lg:gap-8" role="menubar">
          {mainLinks.map((link) => (
            <li key={link.href} role="none">
              <Link
                href={link.href}
                role="menuitem"
                className="ec-nav-link"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {mediaItem && mediaItem.children && (
            <li role="none">
              <MediaDropdown items={mediaItem.children} />
            </li>
          )}
        </ul>

        {/* Search area aligned on right */}
        <div className="flex items-center pl-4">
          <SearchBox />
        </div>
      </div>

      {/* Responsive Mobile / Tablet Navigation */}
      <MobileNav items={items} />
    </nav>
  );
}
