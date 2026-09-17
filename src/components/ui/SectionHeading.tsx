import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
  tag?: "h2" | "h3";
  underline?: boolean;
}

export default function SectionHeading({
  children,
  className = "",
  tag: Tag = "h2",
  underline = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <Tag
        className={`text-2xl font-bold tracking-tight text-text-primary inline-block ${
          underline ? "border-b-[3px] border-brand pb-1" : ""
        }`}
      >
        {children}
      </Tag>
    </div>
  );
}
