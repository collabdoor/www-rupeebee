import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  HeroSection,
  FeaturesSection,
  TechStackSection,
  CTASection,
} from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <Header />
      <div className="space-y-0">
        <HeroSection />
        <FeaturesSection />
        {/* <TextRevealSection /> */}
        <TechStackSection />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
}
