import {
  HeroSection,
  FeaturesSection,
  TechStackAndComparison,
  ForIndiaSection,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <main className="">
        <HeroSection />
        <FeaturesSection />
        <ForIndiaSection />
        <TechStackAndComparison />
      </main>
    </div>
  );
}
