interface CategoryTagProps {
  label: string;
  className?: string;
}

export default function CategoryTag({
  label,
  className = "",
}: CategoryTagProps) {
  return (
    <span className={`ec-badge ${className}`}>
      {label}
    </span>
  );
}
