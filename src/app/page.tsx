import {
  HeroSection,
  FeaturesSection,
  TechStackAndComparison,
  CTASection,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <main className="space-y-0">
        <HeroSection />
        <div className="section-spacing">
          <FeaturesSection />
        </div>
        <div className="section-spacing">
          <TechStackAndComparison />
        </div>
        {/* <div className="section-spacing">
          <CTASection />
        </div> */}
      </main>
    </div>
  );
}
