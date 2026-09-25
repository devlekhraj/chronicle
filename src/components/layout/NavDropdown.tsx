"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavigationChild } from "@/lib/ec-api";

export interface NavDropdownProps {
  label: string;
  href?: string;
  items: NavigationChild[];
  className?: string;
  isActive?: boolean;
}

export default function NavDropdown({
  label,
  href,
  items,
  className = "",
  isActive = false,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      if (!href || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => itemRefs.current[0]?.focus(), 50);
      }
    }
  };

  const handleItemKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      itemRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      itemRefs.current[prevIndex]?.focus();
    } else if (e.key === "Tab" && index === items.length - 1 && !e.shiftKey) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`nav-dropdown-wrap ${className}`}
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {href ? (
        <Link
          ref={triggerRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          onKeyDown={handleTriggerKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`${label} menu`}
          className={`nav-dropdown-trigger ${isActive ? "is-active" : ""}`}
        >
          <span>{label}</span>
          <ChevronDown
            size={14}
            strokeWidth={2.2}
            className={`nav-dropdown-chevron ${isOpen ? "is-open" : ""}`}
            aria-hidden="true"
          />
        </Link>
      ) : (
        <button
          ref={triggerRef as React.RefObject<HTMLButtonElement>}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleTriggerKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={`${label} menu`}
          className={`nav-dropdown-trigger ${isActive ? "is-active" : ""}`}
        >
          <span>{label}</span>
          <ChevronDown
            size={14}
            strokeWidth={2.2}
            className={`nav-dropdown-chevron ${isOpen ? "is-open" : ""}`}
            aria-hidden="true"
          />
        </button>
      )}

      {isOpen && (
        <ul
          role="menu"
          aria-orientation="vertical"
          className="nav-dropdown-menu"
        >
          {items.map((item, index) => (
            <li key={item.href} role="none">
              <Link
                href={item.href}
                role="menuitem"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onKeyDown={(e) => handleItemKeyDown(e, index)}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
