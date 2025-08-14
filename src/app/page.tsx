import {
  HeroSection,
  FeaturesSection,
  TechStackSection,
  FlutterComparison,
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
          <TechStackSection />
        </div>
        <div className="section-spacing">
          <FlutterComparison />
        </div>
        {/* <div className="section-spacing">
          <CTASection />
        </div> */}
      </main>
    </div>
  );
}
