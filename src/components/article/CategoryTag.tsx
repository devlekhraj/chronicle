import type { ArticleCategory } from "@/types/content";

interface CategoryTagProps {
  label: string | ArticleCategory;
  className?: string;
}

export default function CategoryTag({
  label,
  className = "",
}: CategoryTagProps) {
  const text = typeof label === "string" ? label : label.title;
  return (
    <span className={`ec-badge ${className}`}>
      {text}
    </span>
  );
}
