import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  HeroSection,
  FeaturesSection,
  TextRevealSection,
  TestimonialsSection,
  CTASection,
} from "@/components/sections";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TextRevealSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
