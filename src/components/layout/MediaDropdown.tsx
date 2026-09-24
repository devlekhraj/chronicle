"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import type { NavigationChild } from "@/lib/ec-api";

interface MediaDropdownProps {
  items: NavigationChild[];
  className?: string;
}

export default function MediaDropdown({ items, className = "" }: MediaDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
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
      e.preventDefault();
      setIsOpen(true);
      setTimeout(() => itemRefs.current[0]?.focus(), 50);
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
      className={`relative inline-block ${className}`}
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Media menu"
        className="ec-nav-link inline-flex items-center cursor-pointer bg-transparent border-none"
      >
        <span>Media</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="ec-nav-dropdown absolute left-0 top-full z-50 mt-1 py-1"
        >
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onKeyDown={(e) => handleItemKeyDown(e, index)}
              onClick={() => setIsOpen(false)}
              className="ec-nav-dropdown-link"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
