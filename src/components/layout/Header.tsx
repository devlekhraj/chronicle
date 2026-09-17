import Container from "@/components/layout/Container";
import BrandLogo from "./BrandLogo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="w-full bg-[var(--ec-surface-base)]">
      <Container>
        {/* Upper Header Row: Centered Brand Logo with comfortable vertical whitespace */}
        <div className="flex items-center justify-center pt-6 pb-4 sm:pt-7 sm:pb-5">
          <BrandLogo />
        </div>

        {/* Lower Header Row: Navigation & Search */}
        <Navigation />
      </Container>
    </header>
  );
}
