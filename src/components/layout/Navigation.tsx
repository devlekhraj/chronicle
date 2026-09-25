import Link from "next/link";
import NavDropdown from "./NavDropdown";
import MobileNav from "./MobileNav";
import SearchBox from "@/components/ui/SearchBox";
import type { NavigationItem } from "@/lib/ec-api";

export default function Navigation({ items = [] }: { items?: NavigationItem[] }) {
  return (
    <nav aria-label="Main Navigation" className="w-full">
      {/* Desktop Navigation Row Matching Sections 18-22, 29 */}
      <div className="hidden md:flex items-center justify-between py-2">
        <ul className="flex items-center gap-7 lg:gap-8" role="menubar">
          {items.map((item) => (
            item.children && item.children.length > 0 ? (
              <li key={item.href} role="none">
                <NavDropdown label={item.label} href={item.href} items={item.children} />
              </li>
            ) : (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  className="ec-nav-link"
                >
                  {item.label}
                </Link>
              </li>
            )
          ))}
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
