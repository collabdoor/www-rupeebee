import {
  HeroSection,
  FeaturesSection,
  TechStackAndComparison,
} from "@/components";
import RupeeBeeFeaturedSection from "@/components/rupeebee-featured-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <main className="">
        <HeroSection />
        <FeaturesSection />
        {/* <ForIndiaSection /> */}
        <TechStackAndComparison />
        <RupeeBeeFeaturedSection />
      </main>
    </div>
  );
}
