import {
  HeroSection,
  FeaturesSection,
  TechStackAndComparison,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <main className="">
        <HeroSection />
        <FeaturesSection />
        <TechStackAndComparison />
      </main>
    </div>
  );
}
